# Oniro FAQ

Questions and answers about Eclipse Oniro and OpenHarmony, in three parts:

1. [Standard FAQ](#part-1-standard-faq) - architecture, governance, hardware, tooling and adoption.
2. [Beginner FAQ](#part-2-beginner-faq) - the same ideas in plain English.
3. [Deep-Dive Technical FAQ](#part-3-deep-dive-technical-faq) - kernel, runtime, graphics and security internals.

---

## Part 1: Standard FAQ

### General & Architectural Fundamentals

#### What is OpenHarmony, and what is Eclipse Oniro?

OpenHarmony is an open source distributed operating system designed to run across multiple device form factors - from lightweight microcontrollers and wearable sensors to smart TVs, industrial gateways, and mobile phones. Originating under the OpenAtom Foundation, it provides an open architecture where devices can discover each other, link together, and share processing or hardware capabilities.

Eclipse Oniro is an open source project and working group hosted by the Eclipse Foundation in Europe. It acts as the bridge to European and international markets for OpenHarmony, packaging the core technology with vendor neutral governance, transparent intellectual property management, compliance frameworks for European regulations, and developer tooling adapted to international engineering workflows.

#### How do Oniro and OpenHarmony relate to Huawei's HarmonyOS?

OpenHarmony is the open source core platform. HarmonyOS is Huawei's commercial product line built upon that open source code.

This structure mirrors standard open source models: Chromium serves as the open source base structure for browsers like Google Chrome or Microsoft Edge, and the Linux kernel forms the base of commercial distributions like Red Hat Enterprise Linux or Ubuntu. Neither OpenHarmony nor Oniro belongs to a single company. Because Oniro is governed by the European-based Eclipse Foundation, decisions on project roadmaps, legal reviews, and infrastructure follow an open, multi-stakeholder governance model.

#### Is Oniro/OpenHarmony a fork of Android?

No. OpenHarmony is not a fork of Android (AOSP). It does not rely on the Android runtime (ART), Android system daemons, or Google Mobile Services (GMS). The operating system has its own micro-kernel and multi-kernel architectures, a distinct system service layer, an independent display and graphics pipeline, a dedicated security subsystem, and its own package format (`.hap`).

#### Does Oniro use the Linux kernel?

It depends on the target device profile. OpenHarmony uses a multi-kernel design to run efficiently across different hardware tiers:

- **Mini System (Resource-constrained IoT):** Runs on the LiteOS-M kernel on microcontrollers such as Arm Cortex-M and 32-bit RISC-V, with memory starting at 128 KiB (such as smart relays and sensors).
- **Small System (Embedded edge devices):** Runs on LiteOS-A or Linux on application processors with an MMU, such as Arm Cortex-A, with memory starting at 1 MiB (such as IP surveillance cameras or small display panels).
- **Standard System (Rich smart devices):** Uses the Linux kernel on devices with 128 MiB of memory or more, including smartphones, tablets, smart displays, and automotive platforms.

#### What makes this architecture different from traditional operating systems?

Its fundamental architectural differentiator is the **Distributed Soft Bus**. In conventional setups, multi-device networking requires external application layers, manual pairing, and separate communication protocols. OpenHarmony and Oniro integrate device discovery, mutual authentication, and virtual bus communication at the system level.

As a result, nearby devices can share hardware resources directly: a tablet can transparently use a smartphone's mobile data modem, a smartwatch can access sensor data from a nearby medical device, or an industrial dashboard can pull video directly from a camera sensor as if the peripheral were physically connected.

### Governance, Legal Trust & Commercial Products (Business & Strategy)

#### Why is vendor neutral governance essential for this operating system?

Committing to an operating system requires long-term capital and engineering investments. Enterprises, public sector bodies, and universities are often wary of adopting platforms governed by a single foreign corporation due to risks of vendor lock-in, sudden licensing alterations, or geopolitical exposure.

By hosting Oniro under the Eclipse Foundation in Europe, the project ensures a level playing field. Every participant - from global enterprises and device OEMs to SMEs and research labs - operates under clear intellectual property bylaws and an antitrust-compliant governance framework.

#### What is the licensing model?

OpenHarmony and Oniro are primarily distributed under permissive open source terms, predominantly the **Apache License 2.0**. This allows commercial hardware vendors and software integrators to adapt the platform, integrate proprietary drivers or algorithms, and ship closed-source commercial products without being forced to open source their own proprietary code. Some components keep their own licences: the Linux kernel used on Small and Standard systems is licensed under GPLv2, so changes to the kernel itself must be published under the same terms, and some third-party components use other open source licences.

#### Can our company build and sell a proprietary commercial distribution based on Oniro?

Yes, but with an important distinction between legal ability and formal platform readiness:

From a pure licensing standpoint (Apache 2.0), organisations are free to take the source code, adapt it, and build commercial products at any point. Ecosystem partners like YanLink, an industrial IoT provider that joined the Oniro Working Group in 2026, are building Oniro-based solutions for industrial IoT and edge AI.

However, to build a fully certified, production-grade commercial distribution officially anchored on Eclipse Oniro, the project must complete its **first official Eclipse Foundation Release Review**. Completing this release is the project's top priority. The formal release establishes the verified legal provenance, clean intellectual property pedigree, and long-term API stability that commercial vendors require before selling a production distribution with downstream warranty and support.

#### How does Oniro address European regulations like the Cyber Resilience Act (CRA)?

The European Union's Cyber Resilience Act establishes mandatory cybersecurity baselines, vulnerability handling requirements, and supply-chain traceability for all digital products sold in the EU.

Under the CRA, the Eclipse Foundation serves as an open source software steward, maintaining established security policies and coordinated vulnerability disclosure processes. Meanwhile, the Oniro Working Group aims to provide downstream commercial adopters with voluntary compliance artefacts, such as automated Software Bills of Materials (SBOMs) and licence compliance tooling, to help device manufacturers prepare for CE marking under the CRA.

### Hardware Support & Device Enablement (Engineering & OEMs)

#### What hardware platforms can run Oniro today?

Oniro currently runs across several physical hardware targets and virtual profiles:

- **Developer Smartphones:** Natively enabled on European commercial hardware, specifically the Volla Phone Plinius (running OpenHarmony 6.1 LTS with functional 4G LTE data, native voice calls, Wi-Fi, front and rear cameras, and audio).
- **Smartwatches & Wearables:** Apps from the Oniro ecosystem, such as a Telegram client, already run on commercial HarmonyOS smartwatches, which share the OpenHarmony application model.
- **IoT & Embedded Boards:** Deployable on reference platforms including Raspberry Pi 4 and YanLink industrial IoT modules.
- **Emulators:** The Oniro Emulator, a QEMU-based virtual environment for x86_64 and ARM64 workstations, allows software development without dedicated hardware.

#### How difficult is it to port Oniro to existing chipsets and custom boards?

For Standard System devices like smartphones and touch gateways, Oniro implements a thin hardware abstraction layer (using technologies such as `libhybris`). This design allows device makers to reuse existing vendor Linux Board Support Packages (BSPs) and proprietary binary drivers without modifying the core OpenHarmony graphics or framework APIs.

For custom microcontrollers and industrial boards, vendors can channel their BSP integration requirements directly through the Project Management Committee (PMC), plugging straight into continuous integration and automated build pipelines.

### Developer Tooling, Languages & Frameworks (Software Engineers)

#### Which programming languages and application frameworks are supported?

Developers can build software using both modern web-aligned stacks and native systems languages:

- **ArkTS / ArkUI:** The primary native programming language for OpenHarmony. ArkTS builds on TypeScript, adding declarative UI development (ArkUI) and an optimised compilation runtime.
- **C / C++:** Fully supported for low-level systems programming, native drivers, high-performance computing, audio/video pipelines, and gaming engines.
- **Rust & Tauri:** Rust is supported for building lightweight, secure native components and applications. Tauri, which pairs a memory-safe Rust backend with the system webview, has been ported to OpenHarmony, so existing Tauri apps can target Oniro with minimal changes.
- **React Native:** React Native for OpenHarmony (RNOH) lets developers build cross-platform apps in JavaScript/TypeScript with React, using a native container and bridge to produce an OpenHarmony package.
- **Flutter:** Native Flutter embedder support is under active, upstream-first development, enabling multi-platform UI development with Dart.
- **Web Runtimes:** The system WebView (ArkWeb), built on Chromium, runs web applications, hybrid frameworks, and HTML5/JavaScript interfaces. Community projects are also bringing alternative engines to the platform, such as a WebKit-based WebView built with the public OpenHarmony SDK.

#### What development tools and IDEs are available?

Developers have several options:

- **Open VSX & VS Code Extension:** For developers seeking a lightweight, open environment, the Oniro App IDE extension is available on the vendor neutral **Open VSX Registry** and the Visual Studio Code Marketplace, for VS Code, VSCodium and other compatible editors. It supports project creation, building, application signing, deployment to devices and the Oniro Emulator, log viewing, testing, and crash analysis without tying workflows to a proprietary editor.
- **DevEco Studio:** The full-featured IDE built for OpenHarmony, offering visual layout design, device emulators, performance profilers, and code generation assistants.
- **Command-Line & CI/CD Tooling:** Command-line tools such as hvigor (build) and hdc (device connection) support automated testing, containerised builds, and integration into existing GitHub or GitLab pipelines. Native C/C++ modules are built with CMake.

#### Can Oniro run existing Android applications?

OpenHarmony does not execute Android applications natively because it deliberately avoids the memory overhead and architectural dependencies of the Android runtime.

For adopters who need legacy Android applications during a market migration, Oniro developers have demonstrated Waydroid running on Oniro. Waydroid is an open source container that runs a full Android system on the host Linux kernel, so unmodified Android packages run in an isolated environment with much lower overhead than a full virtual machine. This support is currently experimental and is not part of the default Oniro images.

#### How are applications packaged and distributed?

Applications are compiled into **HAP** (Harmony Ability Package) files. To support open application distribution, the Oniro community runs the **Oniro App Store**, an open source proof of concept. Publishers sign in with GitHub, new versions go through review, and a reusable GitHub Actions workflow can build an app from source and publish it to the store, where it is marked as built from source.

### Ecosystem Participation & Adoption

#### What are the main business advantages of choosing Oniro?

1. **Supply Chain Autonomy:** Adopting an operating system governed within a vendor neutral European foundation provides long-term insulation from single-vendor lock-in and geopolitical restrictions.
2. **True Multi-Device Interoperability:** The Distributed Soft Bus eliminates the custom networking plumbing normally required to connect IoT nodes, edge gateways, and mobile controls.
3. **Lean Resource Footprint:** By using modular mini, small, and standard system profiles, the OS runs on cost-efficient silicon without sacrificing UI responsiveness or modern security.
4. **Direct Roadmap Governance:** Working group members directly contribute to project management, release scoping, and committee decisions, ensuring their commercial priorities are reflected in core engineering releases.

#### How can an organisation or developer get involved?

- **Software Developers:** Explore public repositories on GitHub and GitLab, download developer tutorials, install the Oniro extension from the Visual Studio Marketplace or the Open VSX Registry, and experiment with the QEMU emulator or developer phone builds.
- **Academic Institutions & Research Groups:** Partner with the Oniro community on research programmes covering distributed systems, open hardware attestation, and open source regulatory security.
- **Enterprises & Hardware OEMs:** Join the Eclipse Oniro Working Group to participate directly in the Steering Committee and Project Management Committee, helping shape the first official release, guide hardware enablement, and deploy compliant commercial products.

---

## Part 2: Beginner FAQ

### The Basics: What is Oniro?

#### What is Eclipse Oniro in plain English?

Think of Oniro as a shared technology engine for smart electronics. Instead of every company building its own software from scratch for smartwatches, TVs, or home appliances, Oniro provides a free, open source foundation that works across all kinds of devices.

#### Is Oniro the same as Android or Apple iOS?

No. While Android and iOS are controlled mainly by single tech giants (Google and Apple), Oniro is managed by an independent European non-profit organization called the Eclipse Foundation. It is designed so that no single company owns or controls it.

#### Why should normal users or companies care about Oniro?

Two big reasons: smooth connectivity and choice. Oniro lets devices talk to each other automatically without annoying setup steps. For businesses, it means they aren't trapped relying on a single large tech platform vendor.

### How It Works

#### What makes Oniro special compared to traditional software?

Oniro uses a system called the "Distributed Soft Bus." Think of it like invisible digital plumbing connecting all your devices. A tablet running Oniro can seamlessly use the camera or internet connection of a nearby smartphone as if it were part of the tablet itself.

#### Can Oniro run on cheap or small electronics?

Yes! Oniro is lightweight and flexible. It can run on tiny sensors with very little memory, mid-sized smart home gear, or full-scale smart devices like phones and displays.

#### Do I need to learn a new programming language to write apps for Oniro?

Not necessarily. While ArkTS (a language derived from TypeScript) is the primary language used for native application development, the ecosystem also includes Cangjie, Huawei's open source general-purpose language that interoperates with ArkTS. Oniro also supports C/C++, Rust, Web technologies (HTML/JavaScript), and popular multi-platform frameworks like React Native and Flutter. For lightweight apps that combine a Rust backend with a web-based UI, you can also use Tauri.

#### Where can I buy or try a device running Oniro?

Oniro runs on developer target smartphones like the Volla Phone Plinius and reference boards such as the Raspberry Pi 4. You can also test and develop applications using desktop software emulators without needing hardware.

#### Is Oniro free to use for personal or commercial projects?

Yes. Oniro is published under permissive open source licenses, mainly the Apache License 2.0. Anyone can download, modify, and integrate Oniro into products without paying license fees or royalty costs.

---

## Part 3: Deep-Dive Technical FAQ

### Kernel & System Architecture

#### How does Oniro achieve multi-kernel abstraction across hardware tiers?

Oniro abstracts low-level hardware using OpenHarmony's multi-kernel arch. For Mini and Small systems, LiteOS provides real-time deterministic scheduling with extremely minimal memory footprints (<100KB static footprint). Standard system profiles use a Linux LTS kernel with OpenHarmony-specific patches, paired with the Hardware Driver Foundation (HDF), which standardizes unified driver interfaces, dynamic driver loading, and IPC transport abstraction across both kernel and user spaces.

#### What is the IPC mechanism behind the Distributed Soft Bus?

The Distributed Soft Bus provides a unified communication layer over Wi-Fi (including Wi-Fi Direct), Bluetooth (BR and BLE), and Ethernet, and exposes it to system services through RPC-style interfaces. It handles heterogeneous node discovery, connection and session management, and encrypted channel establishment using session keys negotiated via a distributed device authentication trust model, so applications do not have to manage the underlying transports themselves.

### Runtime, Graphics & Tooling

#### How does the Ark Compiler and ArkTS runtime optimize application performance?

ArkTS extends TypeScript with static typing rules. The toolchain compiles ArkTS sources into Ark bytecode, and the Ark Compiler can then compile frequently used code ahead of time (AOT) into native machine code, guided by runtime profiles, instead of relying purely on interpretation and JIT compilation. The Ark runtime provides concurrency through Actor-model workers and the TaskPool, concurrent garbage collection, and Sendable objects that threads within the same process can share without full serialization.

#### What rendering pipeline powers the UI framework?

ArkUI utilizes a declarative layout syntax coupled with the Render Service subsystem. Graphics rendering is backed by 2D/3D engines (such as Skia or custom GPU abstractions) with hardware acceleration. On Standard systems, the Render Service composites frames itself instead of relying on a traditional display server, and submits them to the display through the display HDI, typically backed by DRM/KMS.

### Security & Compliance Engineering

#### How does Oniro implement sandboxing and capability management for HAP packages?

Applications packaged as Harmony Ability Packages (HAPs) execute in isolated process sandboxes enforced by Linux namespaces, cgroups, and SECCOMP profiles. Access to system capabilities, cross-device resources, and IPC endpoints requires explicit privilege tokens granted by the Access Token Management (ATM) subsystem during installation or runtime user prompts.

#### How does the Hardware Driver Foundation (HDF) manage driver deployment and power states across multi-kernel environments?

The Hardware Driver Foundation (HDF) provides unified driver programming interfaces across LiteOS and Linux kernel targets. Drivers built on HDF are decoupled from specific kernel implementations through an OS abstraction layer (OSAL) and a platform adaptation layer. The framework handles driver loading, driver service management, messaging between drivers and their clients, and configuration through HCS files, and it provides standardized power management (PM) hooks. Across standard system profiles, HDF abstracts user-space driver services through IPC dispatchers, allowing high-level frameworks to interact with peripheral drivers via uniform C/C++ API handles regardless of whether the driver executes in kernel space or user space.

#### How does zero-copy GPU buffer sharing work via IPCKit and NativeBuffer in OpenHarmony 6.1?

In OpenHarmony 6.1 (API 23), cross-process frame rendering is handled via `OH_NativeBuffer` instances transferred across process boundaries using binder transactions. The rendering process writes the buffer reference using `OH_NativeBuffer_WriteToParcel` into an IPC payload (via IPCKit). The UI host process reconstructs the handle via `OH_NativeBuffer_ReadFromParcel`, mapping shared graphic memory handles without copying raw pixel bytes. Frame synchronization is maintained via EGL native fence sync objects routed bidirectionally between the rendering process and composite UI thread to prevent tearing and eliminate stalls.

#### What security model governs cross-device communication across the Distributed Soft Bus?

Mutual device trust across the Distributed Soft Bus relies on asymmetric cryptographic handshakes using public key infrastructure (PKI) or PIN/QR-code-based peer pairing. Once authenticated, session keys are derived via ECDH key exchanges to establish end-to-end encrypted tunnels (AES-GCM-128/256). Token-based permission enforcement is validated per IPC request by the Access Token Management (ATM) service, ensuring target device system abilities reject unprivileged RPC commands even if network pairing is established.

#### How are native child processes initialized and isolated when executing embedded web or render engines?

Multi-process architectures - such as embedded web runtimes - spawn child processes using `OH_Ability_CreateNativeChildProcess`. This instantiates child processes with direct, isolated IPCKit binder channels linked back to the parent application process. Child process execution is restricted by specific privilege profiles, system cgroups, and system memory manager rules (`memmgr_config.xml`) to prevent untrusted render threads from elevating privileges or accessing host application state.
