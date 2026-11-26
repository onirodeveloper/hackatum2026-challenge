# Glossary

Short definitions of the names you will meet in this repository, in DevEco Studio and in the platform documentation. For how the pieces fit together, read [Start here](README.md#start-here) in the README first.

- [Platforms](#platforms)
- [Tools](#tools)
- [Building blocks of an app](#building-blocks-of-an-app)
- [Versions and SDKs](#versions-and-sdks)
- [Signing and privileges](#signing-and-privileges)
- [Hackathon setup](#hackathon-setup)

## Platforms

**OpenHarmony** - The open-source operating system that HarmonyOS and Oniro are built on, governed by the OpenAtom Foundation. It runs on devices from small sensors to phones, tablets and TVs.

**HarmonyOS** - Huawei's commercial operating system, built on OpenHarmony. It adds Huawei-only services such as Huawei account sign-in, push notifications, maps and the AppGallery store. Current versions do not run Android apps.

**HMOS** - Short for HarmonyOS. It appears in skill names such as `hmos-arkui-develop-skill`.

**Oniro** (Eclipse Oniro) - The Eclipse Foundation's European distribution of OpenHarmony. For app development, an Oniro device behaves like an OpenHarmony device. The word "Oniro" also appears in the names of its tools: Oniro App Builder, Oniro IDE, Oniro Emulator and Oniro Agent Skills.

**Distributed Soft Bus** - The OpenHarmony layer that lets nearby devices discover each other and share data and capabilities. It underpins the cross-device features behind the Unification theme. Neither emulator can test distributed features, so they need physical devices.

## Tools

**DevEco Studio** - Huawei's IDE for HarmonyOS and OpenHarmony apps, based on IntelliJ. It is the toolchain used in the [default workflow](README.md#the-default-workflow). It runs on Windows and macOS and needs a Huawei developer account to download.

**DevEco Studio Emulator** - The emulator built into DevEco Studio. It runs HarmonyOS system images. Outside China it offers only wearable profiles; phone, tablet, 2-in-1 and TV profiles appear once the [region is set to China](FAQ.md#why-do-i-need-to-switch-the-deveco-studio-region-to-china). You create and start virtual devices in DevEco Studio's **Device Manager**.

**Previewer** - A DevEco Studio panel that renders your ArkUI pages without an emulator. It is fast for checking layout, but it does not run real device APIs, and it does not count as running the app for the challenge.

**CodeGenie** - The AI assistant built into DevEco Studio. You do not need it for this hackathon; you can use any external coding agent instead.

**DevEco CLI** (`devecocli`) - A command-line tool, installed from npm as `@deveco/deveco-cli`, that exposes DevEco Studio's build, run, log, lint and emulator features to scripts and coding agents. The [agent installer](installation-prompt.md) sets it up. See the [capability matrix](default_template/hackathon-resources/devecocli.md).

**Oniro App Builder** (`oniro-app`) - An open-source command-line tool that creates, signs, builds, installs and launches OpenHarmony apps, and installs the SDK and the Oniro Emulator. It runs on Windows, Linux and macOS. Install it from npm as `@oniroproject/oniro-app`.

**Oniro IDE** - A VS Code extension built on Oniro App Builder that offers mostly the same features through a graphical interface. Install it from the Visual Studio Marketplace or, for VSCodium and other VS Code-compatible editors, from the Open VSX Registry.

**Oniro Emulator** - A QEMU-based emulator that runs Oniro (OpenHarmony 7.0). Oniro App Builder installs and starts it. Compared with the DevEco Studio Emulator it has fewer device profiles but a simulated cellular network; see the [emulator capability comparison](README.md#emulator-capability-comparison).

**Command-line tools** - A bundle from Huawei containing `hvigorw`, `ohpm`, `hdc` and `codelinter`. DevEco Studio ships it; Oniro App Builder installs it with `oniro-app cmdtools install`.

**hvigor** (`hvigorw`) - The build system for HarmonyOS and OpenHarmony projects, comparable to Gradle. `hvigorw` is the command that runs it, and its name appears in most build output and error messages.

**ohpm** - The package manager, comparable to npm. Dependencies are declared in `oh-package.json5` and installed into `oh_modules/`.

**hdc** - The device connector, comparable to Android's `adb`. It lists devices, installs packages, opens a shell and reads logs. For example, `hdc list targets` shows the connected devices and emulators.

**HiLog** - The system logging facility. Apps write to it with the `hilog` API; you read it with the `hilog` command on the device, through DevEco Studio's Log panel, or through `devecocli` and `oniro-app`.

**codelinter** - The static checker for ArkTS code. It catches problems the compiler does not, such as rule violations and performance issues.

**React Native for OpenHarmony** (RNOH) - A port of React Native that produces OpenHarmony and HarmonyOS apps. It is an accepted alternative to native ArkTS, as long as you ship a working OpenHarmony or HarmonyOS build.

## Building blocks of an app

**ArkTS** - The main language for apps. It is based on TypeScript but stricter: types are checked statically, and some dynamic TypeScript features, such as `any`, are not allowed. Code copied from a TypeScript or JavaScript project often needs changes before it compiles.

**ArkUI** - The declarative UI framework used with ArkTS, comparable to SwiftUI or Jetpack Compose. You describe the UI in a `build()` method of a `@Component` struct, and it updates automatically when `@State` data changes.

**Ability** (UIAbility) - The component an app is built from. A UIAbility owns a window and shows pages, roughly like an Android Activity. **Empty Ability** is DevEco Studio's blank project template: one UIAbility with one page.

**Stage model** - The current application model, used by all the templates in this repository. Tutorials that mention the **FA model** or a `config.json` file describe the older model; prefer documentation written for the Stage model.

**Kit** - A group of related APIs that you import as a unit, for example `import { sensor } from '@kit.SensorServiceKit'`. Most Kits exist on all three platforms; a few, such as Huawei's account, push and map Kits, exist only on HarmonyOS.

**HAP** (`.hap`) - Harmony Ability Package, the installable file produced by a build, comparable to an Android APK. A working `.hap` is one of the [required deliverables](huawei-challenge.md#required-deliverables).

**Atomic service** - A lightweight HarmonyOS app that runs without installation. DevEco Studio's Create Project wizard offers it next to **Application**; choose **Application** for this hackathon unless you specifically want an atomic service.

**`module.json5`** - A module's manifest, comparable to Android's `AndroidManifest.xml`. It declares the module's abilities, pages and requested permissions.

**`build-profile.json5`** - The build configuration. The file at the project root selects the target platform (`runtimeOS`), the SDK versions and the signing configuration. A module-level file such as `entry/build-profile.json5` holds that module's own build options. See [the build troubleshooting answer](FAQ.md#my-project-will-not-build-or-it-builds-for-the-wrong-platform-what-should-i-check).

**`runtimeOS`** - The field in the root `build-profile.json5` that says whether the project is built for `"HarmonyOS"` or `"OpenHarmony"`.

## Versions and SDKs

**API level** - A number that identifies the set of APIs a platform release provides. Higher numbers include newer APIs. The challenge requires API 20 or later.

**Release label** - HarmonyOS names SDKs by release and API level together, such as `6.0.0(20)`. OpenHarmony usually uses the API number alone, such as `20`. Both refer to the same API level, which is why DevEco Studio and `build-profile.json5` show both formats.

The versions mentioned in this guide:

| API level | OpenHarmony / Oniro | HarmonyOS |
| :---: | :---: | :---: |
| 20 | OpenHarmony 6.0 | HarmonyOS 6.0.0(20) |
| 23 | OpenHarmony 6.1 | HarmonyOS 6.1.0(23) |
| 24 | N/A | HarmonyOS 6.1.1(24) |
| 26 | OpenHarmony 7.0 (Oniro Emulator) | HarmonyOS 7.0.0 (26.0.0) |

**Compatible, compile and target SDK** - Three settings in `build-profile.json5`. **Compatible** (`compatibleSdkVersion`) is the oldest API level your app installs on. **Compile** (`compileSdkVersion`) is the SDK the compiler uses, which decides which APIs you can call. **Target** (`targetSdkVersion`) is the API level whose behaviour you test against. See the [table in step 3](README.md#3-create-a-project-from-the-hackathon-template).

**SDK** - The libraries, API declarations and tools for one API level. There are separate HarmonyOS and OpenHarmony SDKs. DevEco Studio manages them in its **SDK Manager**; Oniro App Builder installs OpenHarmony SDKs with `oniro-app sdk install`.

**Public SDK and Full SDK** - The public SDK contains the APIs ordinary apps may use. The Full SDK also contains system APIs, which only [system apps](#signing-and-privileges) may call.

## Signing and privileges

**Signing** - Every `.hap` must be signed before a device or emulator will install it. Signing material consists of a keystore (`.p12`), a certificate (`.cer`) and a provisioning profile (`.p7b`). It is a credential: never commit it or its passwords. See the [signing FAQ](FAQ.md#signing).

**Signing config** - An entry in `build-profile.json5` that points the build at signing material. DevEco Studio creates one under **File → Project Structure → Signing Configs**, where you must select **Automatically generate signature**; Oniro App Builder creates one with `oniro-app sign`.

**AppGallery Connect** (AGC) - Huawei's developer console. Apps that run on HarmonyOS get their signing material from it, which is why HarmonyOS signing needs a Huawei account.

**Permission** - A capability an app must declare in `module.json5`, and sometimes ask the user for at run time, before it can use protected APIs such as location or the camera.

**System app** - An app signed with a system-level identity, which lets it call system APIs and request privileged permissions. It needs the Full SDK and special signing, and it cannot be installed on standard retail devices. See [Can I build and test a system app?](FAQ.md#can-i-build-and-test-a-system-app).

**APL** (ability privilege level) - The privilege level in an app's signing profile: `normal` for ordinary apps, `system_basic` and `system_core` for system apps. Some permissions are granted only at a higher APL.

## Hackathon setup

**Agent skill** - A folder of instructions (a `SKILL.md` plus helper files) that teaches a coding agent how to do one kind of task, such as building and deploying an app. The [agent installer](installation-prompt.md) installs nine of them.

**Coding agent** - An AI assistant that can run commands and edit files on your computer, such as Claude Code, Codex or [OpenCode](opencode-guide.md). A chat-only chatbot cannot run the agent installer.

**Hackathon Template** - The DevEco Studio project template installed by the agent installer. It adds agent guidance (`AGENTS.md`), a brief (`HACKATHON_BRIEF.md`), the AI disclosure file (`AI_WORKFLOW.md`) and reference material to a blank project.

**Conductor** - A planning workflow for coding agents that keeps the project's goals, plan and progress in a `conductor/` folder and drives the agent through them. The **Conductor Hackathon Template** uses it; the plain Hackathon Template does not.

**`AI_WORKFLOW.md`** - The file in which you disclose the AI tools you used and how you checked their output. It is mandatory if you used AI at all. See [Use of AI](huawei-challenge.md#use-of-ai).

**Region setting** (`country.region.xml`) - A DevEco Studio configuration file. Setting it to China unlocks the phone, tablet, 2-in-1 and TV emulator profiles. See [How do I switch the DevEco Studio region to China manually?](FAQ.md#how-do-i-switch-the-deveco-studio-region-to-china-manually).
