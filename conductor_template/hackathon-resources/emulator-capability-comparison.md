# Emulator Capability Comparison

This table shows the differences in emulated capabilities between the DevEco Studio Emulator and the Oniro Emulator.

| Feature | DevEco Studio Emulator | Oniro Emulator (QEMU-based) |
|---|---|---|
| Push notifications support | ✅ | ✅ |
| Granting extended app privileges (e.g. notification listener access) | ✅ | ✅ |
| Install system apps | ✅ | ✅ |
| Screen resolution customization | ✅ | ✅ |
| Internet access | ✅ | ✅ |
| Widgets support | ✅ | ✅ |
| Basic sensor simulation (accelerometer, gyroscope, GPS) | ✅ | ✅ |
| Advanced internet configuration | ✅ | ❌ |
| Multi-device profiles (phone, tablet, 2in1, wearable, TV) | ✅ | ❌ |
| Screen density / orientation testing | ✅ | ❌ |
| Wearable-specific simulation (heart rate, step count, crown button) | ✅ | ❌ |
| TV / remote control simulation | ✅ | ❌ |
| Cellular/SIM features (simulated network: signal, calls, SMS) | ❌ | ✅ |
| Distributed feature testing | ❌ | ❌ |
| Real camera hardware | ❌ | ❌ |
| NFC (Near Field Communication) | ❌ | ❌ |
| Bluetooth pairing with real devices | ❌ | ❌ |
| Biometric hardware | ❌ | ❌ |
| Accurate battery and thermal behavior | ❌ | ❌ |

The Oniro Emulator's sensors, GPS position and cellular network are set from the host with `hdc shell param set`, and its camera shows a test pattern. See the [Oniro Emulator guide](https://docs.oniroproject.org/device-development/developer-boards/emulator/).
