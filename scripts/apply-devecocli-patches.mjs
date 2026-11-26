#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { constants as fsConstants } from 'node:fs';
import { copyFile, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const PACKAGE_NAME = '@deveco/deveco-cli-common';
const SUPPORTED_VERSION = '1.3.12';
const CLI_RELATIVE_PATH = join('dist', 'cli.js');

const HASHES = Object.freeze({
  stock: '2a1196d51cba17cf0fb68c1ffb0c77d10c7a7a41512d641213c158d10fe38291',
  lintOnly: 'b7a76a95240c6fc6c0e87837c66e3e11f8ddab9bb6de5f8dd1fef17f5a5e420a',
  telemetryOnly: 'beabdc97f05316f3db4667367ad99d032368ed73e30d637c06fada1d1b0ab915',
  patched: '4dde8cf809c0f82ca956eb9a32423712ec4ee637c1c1181b80eec56e5c377975',
});

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, '..');
const patchDirectory = join(repositoryRoot, 'patches', 'devecocli', SUPPORTED_VERSION);
const PATCHES = Object.freeze({
  lint: join(patchDirectory, '001-lint-files-with-issues.json'),
  telemetry: join(patchDirectory, '002-disable-windows-memory-sampler.json'),
});

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    encoding: 'utf8',
    windowsHide: true,
  });

  if (result.error) {
    throw new Error(`Could not run ${command}: ${result.error.message}`, { cause: result.error });
  }
  if (result.status !== 0) {
    const details = [result.stderr, result.stdout]
      .map((value) => value?.trim())
      .filter(Boolean)
      .join('\n');
    throw new Error(
      `${command} ${args.join(' ')} exited with code ${result.status}${details ? `:\n${details}` : ''}`,
    );
  }

  return result.stdout.trim();
}

export function sha256(contents) {
  return createHash('sha256').update(contents).digest('hex');
}

export function patchesForHash(hash) {
  switch (hash) {
    case HASHES.stock:
      return [PATCHES.lint, PATCHES.telemetry];
    case HASHES.lintOnly:
      return [PATCHES.telemetry];
    case HASHES.telemetryOnly:
      return [PATCHES.lint];
    case HASHES.patched:
      return [];
    default:
      return null;
  }
}

export function validatePatchSpecification(specification, patchPath) {
  if (typeof specification !== 'object' || specification === null || Array.isArray(specification)) {
    throw new Error(`Invalid patch specification at ${patchPath}: expected a JSON object.`);
  }
  if (typeof specification.description !== 'string' || specification.description.trim() === '') {
    throw new Error(`Invalid patch specification at ${patchPath}: description must be non-empty.`);
  }
  if (!Array.isArray(specification.replacements) || specification.replacements.length === 0) {
    throw new Error(
      `Invalid patch specification at ${patchPath}: replacements must be a non-empty array.`,
    );
  }

  for (const [index, replacement] of specification.replacements.entries()) {
    const location = `${patchPath} replacement ${index + 1}`;
    if (typeof replacement !== 'object' || replacement === null || Array.isArray(replacement)) {
      throw new Error(`Invalid ${location}: expected a JSON object.`);
    }
    if (typeof replacement.before !== 'string' || replacement.before.length === 0) {
      throw new Error(`Invalid ${location}: before must be a non-empty string.`);
    }
    if (typeof replacement.after !== 'string') {
      throw new Error(`Invalid ${location}: after must be a string.`);
    }
    if (
      !Number.isInteger(replacement.expectedOccurrences) ||
      replacement.expectedOccurrences <= 0
    ) {
      throw new Error(`Invalid ${location}: expectedOccurrences must be a positive integer.`);
    }
  }

  return specification;
}

export function applyPatchSpecification(contents, specification, patchPath) {
  validatePatchSpecification(specification, patchPath);

  let result = contents;
  for (const [index, replacement] of specification.replacements.entries()) {
    const actualOccurrences = result.split(replacement.before).length - 1;
    if (actualOccurrences !== replacement.expectedOccurrences) {
      throw new Error(
        `${patchPath} replacement ${index + 1} expected ` +
          `${replacement.expectedOccurrences} occurrence(s), found ${actualOccurrences}. ` +
          'No files were changed.',
      );
    }
    result = result.split(replacement.before).join(replacement.after);
  }

  return result;
}

async function readPatchSpecification(patchPath) {
  let specification;
  try {
    specification = JSON.parse(await readFile(patchPath, 'utf8'));
  } catch (error) {
    throw new Error(`Could not read patch specification at ${patchPath}.`, { cause: error });
  }
  return validatePatchSpecification(specification, patchPath);
}

export async function applyPatchSpecifications(startingContents, patchPaths) {
  let patchedText = startingContents.toString('utf8');
  for (const patchPath of patchPaths) {
    const specification = await readPatchSpecification(patchPath);
    patchedText = applyPatchSpecification(patchedText, specification, patchPath);
  }
  return Buffer.from(patchedText, 'utf8');
}

async function restoreBackup(backupPath, cliPath, expectedHash) {
  await copyFile(backupPath, cliPath);
  const restoredHash = sha256(await readFile(cliPath));
  if (restoredHash !== expectedHash) {
    throw new Error(
      `Rollback verification failed for ${cliPath}. Expected ${expectedHash}, found ${restoredHash}.`,
    );
  }
}

async function verifyCliVersion(cliPath, packageRoot, runCommand) {
  const version = runCommand(process.execPath, [cliPath, '--version'], { cwd: packageRoot });
  if (version !== SUPPORTED_VERSION) {
    throw new Error(
      `Patched bundle reported version ${JSON.stringify(version)}, expected ${SUPPORTED_VERSION}.`,
    );
  }
}

export async function writeVerifiedCli({
  cliPath,
  packageRoot,
  startingContents,
  patchedContents,
  runCommand = run,
}) {
  const startingHash = sha256(startingContents);
  const backupPath = join(
    dirname(cliPath),
    `.cli.js.hackathon-backup-${process.pid}-${randomUUID()}`,
  );
  await copyFile(cliPath, backupPath, fsConstants.COPYFILE_EXCL);

  let preserveBackup = false;
  try {
    await writeFile(cliPath, patchedContents);

    const finalHash = sha256(await readFile(cliPath));
    if (finalHash !== HASHES.patched) {
      throw new Error(
        `Patched ${CLI_RELATIVE_PATH} has unexpected SHA-256 ${finalHash}; expected ${HASHES.patched}.`,
      );
    }

    await verifyCliVersion(cliPath, packageRoot, runCommand);
  } catch (error) {
    try {
      await restoreBackup(backupPath, cliPath, startingHash);
    } catch (rollbackError) {
      preserveBackup = true;
      throw new AggregateError(
        [error, rollbackError],
        `Patching failed and ${CLI_RELATIVE_PATH} could not be restored automatically. ` +
          `The backup remains at ${backupPath}.`,
      );
    }
    throw error;
  } finally {
    if (!preserveBackup) {
      await rm(backupPath, { force: true });
    }
  }
}

export async function patchPackage(packageRoot, { runCommand = run } = {}) {
  const packageJsonPath = join(packageRoot, 'package.json');
  const cliPath = join(packageRoot, CLI_RELATIVE_PATH);

  let packageJson;
  try {
    packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
  } catch (error) {
    throw new Error(`Could not read the ${PACKAGE_NAME} installation at ${packageRoot}.`, {
      cause: error,
    });
  }

  if (packageJson.name !== PACKAGE_NAME) {
    throw new Error(
      `Unexpected package at ${packageRoot}: expected ${PACKAGE_NAME}, found ${packageJson.name ?? 'no name'}.`,
    );
  }
  if (packageJson.version !== SUPPORTED_VERSION) {
    throw new Error(
      `Unsupported ${PACKAGE_NAME} version ${packageJson.version ?? 'unknown'}; ` +
        `this patch set supports only ${SUPPORTED_VERSION}. No files were changed.`,
    );
  }

  let startingContents;
  try {
    startingContents = await readFile(cliPath);
  } catch (error) {
    throw new Error(`Could not read ${cliPath}.`, { cause: error });
  }

  const startingHash = sha256(startingContents);
  const selectedPatches = patchesForHash(startingHash);
  if (selectedPatches === null) {
    throw new Error(
      `Unsupported ${CLI_RELATIVE_PATH} SHA-256 ${startingHash}. ` +
        'The installation may be modified or corrupt. No files were changed.',
    );
  }

  if (selectedPatches.length === 0) {
    await verifyCliVersion(cliPath, packageRoot, runCommand);
    return 'already-patched';
  }

  const patchedContents = await applyPatchSpecifications(startingContents, selectedPatches);
  const candidateHash = sha256(patchedContents);
  if (candidateHash !== HASHES.patched) {
    throw new Error(
      `Patch specifications produced unexpected ${CLI_RELATIVE_PATH} SHA-256 ${candidateHash}; ` +
        `expected ${HASHES.patched}. No files were changed.`,
    );
  }

  await writeVerifiedCli({
    cliPath,
    packageRoot,
    startingContents,
    patchedContents,
    runCommand,
  });
  return 'patched';
}

async function main() {
  if (process.argv.length > 3) {
    throw new Error('Usage: node apply-devecocli-patches.mjs [path-to-deveco-cli-common]');
  }
  let packageRoot;
  if (process.argv[2]) {
    packageRoot = resolve(process.argv[2]);
  } else {
    const npmRoot =
      process.platform === 'win32'
        ? run(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', 'npm.cmd root --global'])
        : run('npm', ['root', '--global']);
    const wrapperRoot = join(npmRoot, '@deveco', 'deveco-cli');
    let wrapperPackage;
    try {
      wrapperPackage = JSON.parse(await readFile(join(wrapperRoot, 'package.json'), 'utf8'));
    } catch (error) {
      throw new Error(`Could not read the global @deveco/deveco-cli installation at ${wrapperRoot}.`, {
        cause: error,
      });
    }
    if (wrapperPackage.name !== '@deveco/deveco-cli' || wrapperPackage.version !== SUPPORTED_VERSION) {
      throw new Error(
        `Expected @deveco/deveco-cli ${SUPPORTED_VERSION} at ${wrapperRoot}; ` +
          `found ${wrapperPackage.name ?? 'no name'} ${wrapperPackage.version ?? 'unknown'}. No files were changed.`,
      );
    }
    let cliPath;
    try {
      cliPath = createRequire(join(wrapperRoot, 'cli.js')).resolve(`${PACKAGE_NAME}/dist/cli.js`);
    } catch (error) {
      throw new Error(`Could not resolve ${PACKAGE_NAME} from ${wrapperRoot}.`, { cause: error });
    }
    packageRoot = resolve(cliPath, '..', '..');
  }
  const result = await patchPackage(packageRoot);
  if (result === 'already-patched') {
    console.log(`DevEco CLI ${SUPPORTED_VERSION} patches are already applied.`);
  } else {
    console.log(`Applied DevEco CLI ${SUPPORTED_VERSION} patches at ${packageRoot}.`);
  }
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  try {
    await main();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`DevEco CLI patching failed: ${message}`);
    process.exitCode = 1;
  }
}
