# Hackathon Agent Guide

## Mission

This repository is a starter for a time-boxed OpenHarmony/HarmonyOS/Oniro hackathon submission. Maximize the chance of a convincing, reproducible, working demonstration. Prefer one polished end-to-end experience over several incomplete features, and keep the project buildable throughout the event.

The submission must target HarmonyOS, OpenHarmony, or Oniro at API 20 or later. It must run on an emulator or compatible device, produce a working `.hap`, and visibly use or improve at least one platform, device, or system capability. The idea should clearly lead with one challenge theme: Intelligence, Spatialization, or Unification.

Read [`hackathon-resources/README.md`](hackathon-resources/README.md) first. The challenge statement is not bundled in this checkout; treat the version published at https://github.com/onirodeveloper/hackatum2026-challenge/blob/main/huawei-challenge.md as the authoritative statement of requirements and fetch it from there. If a rule appears ambiguous or may have changed, ask the user to confirm it. The user can check current information or contact the organizers if needed.

## Non-Negotiable Submission Constraints

- Target API 20 or later and declare API 20 as the minimum where applicable. Do not silently lower the target to make a build pass.
- Build a native ArkTS/ArkUI or C/C++ app, an OpenHarmony-compatible cross-platform app, or an installable system improvement. A web, Android, iOS, or desktop build alone does not qualify.
- Demonstrate at least one real platform capability. Clearly label mocked services and simulated sensor or device data.
- Keep setup, build, signing, installation, and launch steps reproducible from a clean checkout.
- Maintain a public-safe repository: never commit credentials, signing secrets, personal data, tokens, or private endpoints.
- Because an agent is being used, maintain the generated, public-safe `AI_WORKFLOW.md` as described below.
- Plan for every required artifact: source repository, instructions, `.hap`, short demo recording, architecture/implementation summary, `AI_WORKFLOW.md`, extra AI integration documentation if AI is part of the product, and a README section reporting issues with the development platform.

## When Conductor Is Required

Use the `conductor-dev` Agent Skill as the sole orchestration workflow for substantive product and development work. This includes changes to product scope, architecture, application or system source, dependencies, build configuration, user-facing behavior, validation state, release artifacts, or submission claims.

Before doing such work:

1. Load and follow the installed `conductor-dev` skill.
2. Initialize Conductor if the project does not yet contain its Conductor state.
3. Continue through the workflow required by the skill; initialization alone is not completion unless the user explicitly requested initialization only.

Conductor is not required for read-only inspection, explanations, reviews, casual discussion, unrelated repository administration, or purely editorial changes that do not alter meaning. Documentation changes affecting requirements, architecture, setup or build instructions, validation evidence, limitations, or submission status are substantive. If exempt work develops into a substantive change, enter Conductor before making that change.

Do not substitute another orchestration workflow or create parallel planning documents. Conductor's product, track, task, session-state, learning, and artifact files are authoritative for project work; this file's hackathon constraints remain mandatory inputs. If `conductor-dev` is unavailable, stop before substantive changes and tell the user rather than silently using an ad hoc workflow.

## Tool Routing

Conductor owns orchestration and selects the appropriate implementation workflow:

- `ohos-app-scaffold` creates and initially verifies a new native application.
- `ohos-app-dev` develops, builds, deploys, debugs, and validates a normal application.
- `ohos-system-app-dev` develops a standalone app that needs `hos_system_app` identity, Full SDK system APIs, or system permissions.
- `ohos-system-dev` handles system or persistent bundles built inside an OpenHarmony source tree.
- `deveco-cli` provides DevEco documentation, build, device, emulator, logging, linting, and UI capabilities used by those workflows.

Follow the selected skill for command syntax, validation gates, retry behavior, and troubleshooting. Do not duplicate those mechanics here or invent platform APIs from memory. Before choosing device-dependent behavior, consult the bundled emulator capability guidance; hardware-dependent behavior requires a suitable device or a clearly disclosed simulation.

If an implementation tool is unavailable, report it and use only a fallback allowed by the selected skill. Do not install speculative replacements.

## AI Transparency

At the start of each AI-assisted session, read `AI_WORKFLOW.md` and register any newly used model, agent, MCP server, or Agent Skill before substantive work. Include its source or version when known and its role in the project.

Update the work log after a coherent piece of material work and before handover. Summarize important prompts or instructions, generated or changed work, human review and validation, consequential failures, limitations, and lessons learned. Do not log every routine command or copy raw Conductor logs. Remove credentials, personal data, private endpoints, and confidential prompts before publication. Conductor artifacts do not replace this public submission document.
