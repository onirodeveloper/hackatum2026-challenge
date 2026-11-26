# Huawei Challenge: Imagine What's NEXT

Most mobile development today happens inside two dominant ecosystems. HarmonyOS is the first credible challenger in years. It already runs on millions of phones, PCs, watches and other devices, and it is heading beyond Asia. This hackathon is your chance to work with that ecosystem before it arrives here in force.

HarmonyOS is Huawei's own product, and it is proprietary. What makes it reachable for the rest of us is the layer underneath: OpenHarmony, an open-source codebase under vendor-neutral governance of OpenAtom Foundation, and Oniro, its European distribution governed by the Eclipse Foundation. Anyone can read and use the source, ship it on their own hardware, and take it somewhere its original authors never planned.

For Europe, this matters in a practical way. Digital sovereignty means being able to audit, patch and ship the software your products run on, without permission from a vendor on another continent. Oniro gives European companies that control, and the code you write here also runs on HarmonyOS devices, so nothing you build is locked to one roadmap.

So build something bold. Show what a genuinely open mobile platform makes possible when nobody has to ask permission first. Today's agentic AI tools make prototyping a breeze.

## Challenge

Your task is to design and build **an innovative system feature or mobile application for an OpenHarmony-based mobile device**.

You are free in how you approach it, but your idea should live in one of the three areas below. Many of the best ideas sit across more than one.

**Intelligence** - AI understands user intent to deliver proactive, personalized services: agents, contextual awareness, on-device AI, intent-driven and natural interaction, personalization.

**Spatialization** - digital content blends with physical spaces for natural, immersive 3D interaction: spatial UI, 3D content, immersive media, sensing, positioning and interaction with the surrounding environment.

**Unification** - devices share data and capabilities to deliver seamless experiences across scenarios: cross-device continuity and handoff, distributed data, shared sensors, cameras and screens, multi-device collaboration.

Within these themes we are looking for original ideas, unconventional approaches and ambitious prototypes that explore what an open operating system can enable.

The final solution should demonstrate clear value, a functional implementation and innovation that current platforms are missing.

## Technical Requirements

The solution may be implemented using:

- native development using **ArkTS with ArkUI** or **C/C++ platform APIs**;
- a supported cross-platform framework, such as **React Native for OpenHarmony (RNOH)** or another compatible cross-platform framework;
- the relevant OpenHarmony or Oniro system development frameworks and source-level build tools.

The final solution must:

- target **HarmonyOS, OpenHarmony or Oniro**;
- target **API 20 or later** and, where applicable, declare API 20 as the minimum supported API level;
- use an SDK and development environment compatible with the selected platform version;
- run successfully on an OpenHarmony, HarmonyOS or Oniro emulator or a compatible physical device;
- include reproducible setup, build and launch instructions;
- demonstrate the use or improvement of at least one platform, device or system capability.

The recommended application development setup includes **DevEco Studio, SDK Manager, hvigor, HDC and application signing**, together with an emulator or physical device. This setup is optional: teams may use compatible alternative tools, including the open-source options listed below, provided that the submitted solution can be reproduced and demonstrated.

**Cross-platform development is an alternative to native APIs, not a requirement.** A cross-platform submission should include a target for OpenHarmony or HarmonyOS, along with the native container, bridge and build configuration required to produce a working platform package; **an Android, iOS, web or desktop build alone is not sufficient.**

An improvement should be delivered as a ready-to-install application or component that adds a new capability to the system or improves an existing one without modifying the system itself.

The submission must clearly explain what the component does, how it integrates with the platform, how it can be installed and how the improvement can be verified.

## Use of AI

Coding agents, AI assistants, Model Context Protocol servers, Agent Skills and other AI-enabled development tools and workflows are permitted and strongly encouraged.

AI may run locally, remotely through a service or in a hybrid architecture. Any team whose submission includes an AI feature, or who used AI tools during development, must publish an **`AI_WORKFLOW.md`** file. For an AI feature, document the model or service, inference flow, data handling, limitations, validation approach and privacy considerations. For development tools, document:

- all AI models, coding agents, MCP servers, Agent Skills and other AI-assisted tools used;
- the main prompts, reusable instructions and relevant configuration;
- the workflow from ideation and architecture through implementation, testing and debugging;
- an explanation of how generated output was reviewed, tested and validated;
- known limitations, unsuccessful approaches and lessons learned.

Prompts and tool usage should be documented as fully as reasonably possible. API keys, credentials, personal data and other confidential information must be removed before publication.

## Required Deliverables

Each team must submit:

1. a public source code repository;
2. reproducible setup, build, installation and launch instructions;
3. a working `.hap` package;
4. a brief recorded demonstration;
5. a concise architecture and implementation description;
6. an `AI_WORKFLOW.md` file when AI-assisted development tools were used;
7. additional AI integration documentation when the submission includes AI features;
8. a short section in the README listing the issues you hit with the development platform, and what worked well.

## Evaluation Criteria

Submissions are scored on four equally weighted criteria. The questions under each one show what the jury looks at in practice.

- **Innovation, ambition and usefulness - 25%**
  *A new idea that solves a real problem for real users.*
  - Is this a new idea, or a fresh take on a known problem? A port of an existing app can count too, if it solves something non-obvious along the way.
  - Who would use it, what problem does it solve for them, and how good is the user experience?
  - Which challenge area does it lead with: Intelligence, Spatialization or Unification? The connection should be visible in what the solution does, not only in how it is described. Combining areas is a plus when the combination serves a purpose.
  - Does it improve accessibility, inclusion or digital wellbeing? This adds to usefulness in any challenge area.
  - We value a working, narrow solution to a real problem over a broad concept that only exists on slides.

- **Quality of the demonstration - 25%**
  *The solution is shown working, clearly and honestly.*
  - Can we see the solution actually running, not just mockups? The emulator is the expected default.
  - Is it clear what we are looking at, and which parts were built during the hackathon?
  - Is the core interaction shown as realistically as possible? If part of it cannot run on the emulator (sensors, positioning, physical context), explain clearly how it would work.
  - Are mocked services and simulated sensor or device data clearly labelled?
  - Does the demo fit in a short recording and focus on the core interaction?

- **Technical execution and use of the platform - 25%**
  *Solid engineering that makes real use of HarmonyOS, OpenHarmony or Oniro.*
  - Does it work as described? Claims should be backed by the code, the demo, logs or test results.
  - Is the architecture sensible, with components, data flows and integrations that are justified rather than added for show? Is the code readable and modular?
  - How does it behave when things go wrong: API errors, timeouts, missing data, unexpected input or, for AI features, incorrect model output? Are there tests for the key scenarios? Full coverage is not expected.
  - Basic hygiene: no secrets in the repository, input validation, no unnecessary permissions or risky dependencies.
  - Does it make real use of the platform, such as system services, APIs or distributed features? Depending on the area, this may mean on-device AI and agent frameworks, sensors, positioning and 3D rendering, or distributed data and multi-device collaboration. An app that would run unchanged on any other OS scores lower; cross-platform frameworks are fine, as long as the solution also uses what the platform provides.

- **Reproducibility and transparency - 25%**
  *Anyone can build and run the project, and see how it was made.*
  - Can someone else build and run it from the README and the public repository alone?
  - Does the code build and run on the emulator, and does it launch and work on a physical device? We cannot hand out devices to every team, but we will have many devices available during the event: contact us to test whether your solution launches and how it works on real hardware.
  - Are dependencies and environment setup documented (versions, SDKs, configuration)?
  - Does the commit history show how the work progressed, and does `AI_WORKFLOW.md` describe how AI tools were used?
  - Does the README report the issues you hit with the development platform? We want developer feedback on what works well and what should be improved.

Repositories may undergo an automated technical pre-review; the final assessment is made by the jury.
