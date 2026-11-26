These are instructions to set up an AI development environment for prototyping OpenHarmony apps.

# Prerequisites

Before installing anything, verify that:

- The machine is running Windows.
- DevEco Studio is installed and you can find its installation directory (see below). Refer to this directory as `<DevEcoStudioRoot>` below.
- Git is installed.
- Node.js 22 or later and npm are installed. Verify npm with `npm.cmd --version`, because the default Windows PowerShell execution policy may block npm's generated `npm.ps1` launcher even when npm is installed correctly. The DevEco CLI that this setup installs requires Node.js 22 or later.
- Python 3 is installed and the `python` command runs it.
- npm's global executable directory is on the user's `PATH`. Get it with `npm.cmd config get prefix` (usually `%AppData%\npm`); this is not the same directory as `npm` itself. Its commands, such as `devecocli`, only run by name when this directory is on `PATH`.

Find `<DevEcoStudioRoot>` through the registry, not by scanning the disk: DevEco Studio is not on `PATH`, so look for its uninstall entry under `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall` (or the matching `HKCU` location) and read its `InstallLocation` value. Confirm the candidate by checking that `product-info.json` is directly inside it and that its `name` field is `DevEco Studio`; do not accept a directory that only looks right by name. If no registry entry resolves to such a directory, treat DevEco Studio as missing and report it like any other missing prerequisite below.

Do not install or upgrade Windows, DevEco Studio, Git, Node.js, npm, or Python as part of this setup. If a prerequisite is missing, do not install anything; tell the user what is missing and let them decide how to prepare their system.

Check Git, Node.js, npm and Python only through the `PATH` environment variable. Run `git --version`, `node --version`, `npm.cmd --version` and `python --version`, or look each command up with `where.exe`. If a host-level check cannot find the command on `PATH`, treat that tool as missing. A failure observed only inside a sandbox means the tool is unverified, not missing; repeat the check against the actual host before reporting it. Do not search the file system for it (no scanning of drives, `Program Files`, the user profile or any other directory), do not add anything to `PATH` for these four tools, and do not use a copy found outside `PATH`.

If Git, Node.js, npm or Python is missing, if Node.js is older than 22, or if npm's global directory is not on `PATH`, stop before changing anything and give the user a clear, short list. For each problem, name the tool, say what you found (not found on `PATH`, or the version that was found), state the requirement, and say where to get it:

- Git: any current release, from https://git-scm.com/download/win.
- Node.js 22 or later, which includes npm: from https://nodejs.org/.
- Python 3, so that `python --version` works: from https://www.python.org/downloads/windows/.
- npm's global directory, if it is missing from `PATH`: the user adds that one directory (`npm.cmd config get prefix`, usually `%AppData%\npm`) to their own user `PATH`. This needs no administrator rights, and it is a change the user makes, not you. Do not modify `PATH` yourself.

If `python --version` fails, also run `py --version` (or `py -3 --version`) purely as a diagnostic. Do not treat a working `py` as satisfying the Python prerequisite: skills used later in the hackathon invoke the `python` command by name, not `py`, so `python` itself must work. If `py` succeeds while `python` fails, tell the user specifically that Python is present but the `python` command is not working, which is usually the Microsoft Store's `python` app execution alias intercepting it, or Python having been installed without adding `python.exe` to `PATH`. Point them at Settings > Apps > Advanced app settings > App execution aliases to turn off the two `python` aliases, or at reinstalling Python from https://www.python.org/downloads/windows/ with "Add python.exe to PATH" enabled. If `py` also fails, report Python as missing as usual.

Tell the user to install the missing tools themselves and to keep each installer's option to add the tool to `PATH` enabled. Then they should close and reopen the agent and its terminal so that the updated `PATH` is picked up, and paste this prompt again. If a tool is already installed but is not on `PATH`, tell the user to add its directory to `PATH`, or to reinstall it with that option enabled.

Verify the npm global directory against the user's persistent `PATH` (the user and machine `PATH` values), not only your own process environment. An agent session can have this directory on its `PATH` while the user's persistent `PATH` lacks it, so a `devecocli` that runs inside your session does not prove that it runs for the user. In particular, do not rely on `devecocli` resolving for you as evidence that this prerequisite is satisfied.

Run prerequisite checks read-only against the actual host environment. A command failing inside an agent sandbox, or a sandbox being unable to see an installed program or directory, does not prove that the prerequisite is missing. In that case, request the minimum permission needed to repeat the affected check outside the sandbox (for the four tools above, still as a `PATH`-only check) or with access to the relevant host directory (for the DevEco Studio installation directory). Do not report a prerequisite as missing until that host-level check also fails. Do not modify the system until every prerequisite has been verified.

# Installation policy

Complete the installation steps yourself by running commands directly. Make the setup idempotent: inspect each existing installation or configuration before changing it, reuse or safely update it when unmodified, and leave it unchanged and report a conflict when it already differs, rather than overwriting local changes, unrelated user data, existing configuration or other installed skills.

Never make yourself elevated, and never elevate the environment you run in. Do not request administrator privileges, do not change filesystem permissions, do not restart the agent or terminal with administrator privileges, and do not run your own commands in an elevated shell or elevated process - including one the user opened for a manual step. These rules are about becoming elevated, not about the session you started in: if your agent already runs with elevated privileges, continue normally, and do not restart it as a non-elevated process to satisfy this policy.

Complete every step you can perform yourself, and do not ask the user to run a command you could run yourself. Some steps need administrator rights on some machines but not others, and some steps are the user's to perform by policy even when you could run them. Treat both as normal outcomes rather than failures. Ask the user to perform such a step only when you cannot or must not complete it yourself, and make it as easy as possible for them.

When you hand a step to the user:

- Inspect whether the step is already done, and skip it if it is.
- Do everything else first, and prepare the step completely before you ask.
- Give the exact full paths or the exact command, why approval may be needed, and what the user should see when it worked.
- Ask for one step at a time.
- Pause and wait. While you are waiting, print only the instructions for that step. Do not print the completion table or the final restart reminder before then; report once, at the end, after every component is verified.
- Verify the result yourself afterwards, using the same check you would have run had you performed the step. The user's confirmation is not proof.
- If verification fails, do not abort the installation and do not repeat the same request: say what is still missing, what to do next, and wait for the user.

Do not change the machine's or user's PowerShell execution policy. During setup on Windows, invoke npm-generated commands as `npm.cmd` and `npx.cmd`, not `npm` or `npx`, so that a blocked npm-generated `.ps1` launcher cannot be mistaken for a missing or broken installation.

# Switch the DevEco Studio region to China

Without this, DevEco Studio only emulates smart watches; setting the region to China unlocks phone, tablet, 2-in-1 and TV emulation as well, and avoids region-restricted emulator downloads. It is not covered by the official DevEco Studio documentation.

Edit `%AppData%\Huawei\DevEcoStudio<version>\options\country.region.xml`, where `DevEcoStudio<version>` is the value of `dataDirectoryName` in `<DevEcoStudioRoot>\product-info.json`, for example `DevEcoStudio6.1`. Do not use the IDE build number that the registry shows as `DisplayVersion` (for example `243.24978…`). If `dataDirectoryName` is missing, use `DevEcoStudio` followed by the major and minor parts of `version` from the same file (`6.1.1.280` gives `DevEcoStudio6.1`). If that directory does not exist under `%AppData%\Huawei`, treat it like a missing file (see below) instead of editing another `DevEcoStudio*` directory. In the `<countryregion>` element, set the `name` attribute to `CN`, leaving the rest of the file unchanged:

```xml
<countryregion name="CN"/>
```

Use exactly this path. Do not use `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Huawei`, and do not edit a file with the same name in any other location. This file is in the user profile, so no elevation is needed.

- If the file already says `CN`, treat it as unchanged.
- If the file does not exist, do not create it. Tell the user to launch DevEco Studio once and complete its first-launch setup, then repeat this step.
- If DevEco Studio is running, ask the user to close it before you edit the file, and do not terminate the process yourself.

# Install skills

Install these skills at user level, never into the current project. With `npx.cmd`, run `npx.cmd skills add -g <skill URL>` once for every URL below. The `-g` flag installs to the user-level skills directory instead of the directory you are currently in, which is why it is required. If your agent installs skills through its own command rather than `npx.cmd`, that is acceptable, but confirm it writes to a user-level skills directory and does not create skill files in the current project.

- https://github.com/onirodeveloper/hackatum2026-challenge/tree/main/skills/ohos-app-scaffold
- https://github.com/onirodeveloper/hackatum2026-challenge/tree/main/skills/ohos-app-dev
- https://github.com/onirodeveloper/hackatum2026-challenge/tree/main/skills/ohos-system-app-dev
- https://github.com/onirodeveloper/hackatum2026-challenge/tree/main/skills/ohos-system-dev
- https://github.com/onirodeveloper/hackatum2026-challenge/tree/main/skills/conductor-dev
- https://github.com/onirodeveloper/hackatum2026-challenge/tree/main/skills/hmos-arkts-knowledge-retriever
- https://github.com/onirodeveloper/hackatum2026-challenge/tree/main/skills/hmos-arkui-scenario-development
- https://github.com/onirodeveloper/hackatum2026-challenge/tree/main/skills/hmos-arkui-develop-skill
- https://github.com/onirodeveloper/hackatum2026-challenge/tree/main/skills/hmos-arkui-mvvm-pattern

# Install DevEco CLI

1. Install `@deveco/deveco-cli` version 1.3.12 globally with `npm.cmd install -g @deveco/deveco-cli@1.3.12`. Install exactly 1.3.12 even if a newer release exists, because the patch step below is verified only against that version.
2. Obtain the npm global prefix with `npm.cmd config get prefix`, trim surrounding whitespace, resolve it to an absolute path, and refer to it as `<NpmPrefix>`. The global executable directory on Windows is `<NpmPrefix>` itself, not the `node_modules` directory returned by `npm.cmd root --global`. Confirm that `<NpmPrefix>\devecocli.cmd` and `<NpmPrefix>\node_modules\@deveco\deveco-cli\package.json` exist, that the package version is exactly 1.3.12, and that `& '<NpmPrefix>\devecocli.cmd' -V` reports 1.3.12. Use this absolute `.cmd` path for these installation checks so that PATH and PowerShell script policy cannot hide the real package state.
3. Use a checkout of the current default branch of `https://github.com/onirodeveloper/hackatum2026-challenge`. If you need to clone it, clone with `core.longpaths=true` into a short directory writable by the current user, for example `git -c core.longpaths=true clone <url> "%TEMP%\oni"`. The repository contains deeply nested documentation paths that can exceed the Windows path-length limit and make the checkout fail with "Filename too long". Pass the option with `-c` for that clone only, and do not change the global Git configuration or Windows settings for it. Prefer a git clone. If the repository was obtained as a downloaded ZIP instead, extract it to a short path such as `C:\oni`, because Explorer's extraction can silently skip paths longer than 260 characters, and compare the number of extracted files with the number of files in the archive. Also run `Get-ChildItem -LiteralPath <extracted folder> -Recurse -File | Unblock-File` on the extracted folder. This removes the Windows "downloaded from the internet" mark from every file, so that scripts from the folder are not blocked and the template files prepared from it do not carry the mark into the DevEco Studio installation directory. It removes only that mark and does not change file contents or any execution policy. Then run `node scripts/apply-devecocli-patches.mjs` from it. Reuse this checkout when preparing the templates below. The script resolves the implementation package through the CLI launcher and patches only a verified `@deveco/deveco-cli-common` 1.3.12 installation; it does not install or update the package. If the version, file hash, patch application or verification is unsupported or fails, stop the setup, leave the CLI unchanged, and report the failure.
4. Confirm the patched installation by running the patch applicator again. It must exit successfully and report that the DevEco CLI 1.3.12 patches are already applied. Then run `& '<NpmPrefix>\devecocli.cmd' -V` again and require version 1.3.12. Do not continue if either check fails.
5. Install the bundled `deveco-cli` skill from the pinned npm package. Resolve its `SKILL.md` by running `node -p "require.resolve('@deveco/deveco-cli-common/skills/deveco-cli/SKILL.md', { paths: [process.argv[1]] })" "<NpmPrefix>/node_modules/@deveco/deveco-cli"`, substituting the verified npm prefix. Pass the parent directory of that file to `npx.cmd skills add -g "<skill-directory>" --agent <agent-id> --yes` for the same agent as in **Install skills**. Confirm that the command succeeds and the installed `SKILL.md` matches the bundled file.

# Prepare the DevEco Studio templates for manual installation

From that same repository checkout, prepare these two complete directories in a temporary directory writable by the current user, with exactly these names:

- `Hackathon Template`, copied from the repository's `default_template` directory.
- `Conductor Hackathon Template`, copied from the repository's `conductor_template` directory.

Do not copy Git metadata or files from the repository root into either prepared directory. Keep every file that belongs to each source directory - including its own `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and nested files such as `hackathon-resources\README.md`. In each prepared directory, `template.json` must be directly inside the directory.

The common destination directory is `<DevEcoStudioRoot>\plugins\openharmony\lib\templates\project`.

For each prepared directory, compute its longest resulting destination path (the common destination directory, the directory name, and its deepest nested file). If any computed path is within 20 characters of 260, read the `LongPathsEnabled` registry value at `HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem` (a read, not a change) and, if it is not `1`, warn the user before asking for the copy: the destination path is close to or over the Windows 260-character limit, and File Explorer may fail or truncate the copy unless long paths are enabled. Tell them how to check and enable it themselves (Settings > System > About > Advanced system settings, or the registry value above), which needs administrator rights and is their decision, not something you do or request for them. Do not treat this warning as a reason to skip or delay preparing and requesting the copy.

Inspect the two expected destination directories before asking the user to do anything:

- If a destination directory is already recursively identical to its prepared source, treat it as unchanged and do not ask the user to copy it again.
- If a destination directory exists but differs from its prepared source, do not overwrite or merge it. Report the conflict and leave both directories unchanged.
- For each missing destination, ask the user to close DevEco Studio and use File Explorer to copy the whole prepared directory into the common destination directory. Show the full source and destination paths for each copy. Make clear that the resulting directories must be named `Hackathon Template` and `Conductor Hackathon Template`, with `template.json` directly inside each one. This copy will most likely be the only step that needs administrator rights, because the destination is normally inside the protected DevEco Studio installation directory, so Windows will most likely ask the user to approve it. If DevEco Studio is installed somewhere the user can already write to, no approval is needed.

This copy is the user's to perform by policy, not because you are missing privileges: never perform it yourself, run a command instead of File Explorer, or elevate your own process to do it.

# Verify the installation

Verify that `country.region.xml` has `<countryregion name="CN"/>`, that all nine skill directories are installed, the DevEco CLI patcher reports that both patches are applied, and `& '<NpmPrefix>\devecocli.cmd' -V` reports 1.3.12. Where supported without restarting, also verify skill discovery, including the bundled `deveco-cli` skill.

For each project template, verify that the installed destination is recursively identical to the prepared source: compare the set of relative file paths and the contents of every file, and confirm that `template.json` is directly inside the destination directory. Do not report a template as installed merely because its directory or `template.json` exists.

# Restarts and final report

After all installation and verification steps succeed, tell the user to start or restart DevEco Studio so that **Hackathon Template** and **Conductor Hackathon Template** appear in the Create Project wizard, and to restart their agent so that it loads the new skills.

Report the result as a rendered Markdown table, not as an aligned plain-text table or a code block. Use one row per component, state `Installed`, `Updated`, `Unchanged`, or `Failed`, and include its path when applicable. Only title the setup complete if every component succeeded. For example:

| Component | Status | Location |
|---|---|---|
| DevEco Studio region (CN) | ✓ Updated | `<path>` |
| Skills | ✓ Installed | `<path>` |
| Hackathon Template | ✓ Installed | `<path>` |
| Conductor Hackathon Template | ✓ Installed | `<path>` |
| DevEco CLI | ✓ Installed | `<path>` |
| DevEco CLI patches | ✓ Installed | `<path>` |
| DevEco CLI bundled skill | ✓ Installed | `<path>` |

Report unresolved items, their cause, and the next required user action. A missing, conflicting or unverified project template means the setup is not complete, even when every user-level component succeeded.
