# Webizen v0.25

Webizen is a humanitarian ICT proof-of-concept and a decentralized social-web browser, refactored and modernized from the original Beaker Browser. It is delivered as a cross-platform solution: a WebExtension, an Electron desktop app, and a React Native mobile app.

This project aims to provide privacy-preserving, accessible, and decentralized social-web tools for social good, integrating cutting-edge technologies to empower users with data sovereignty and enhanced communication capabilities.

## Table of Contents

- [Core Features](#core-features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Electron (Desktop)](#electron-desktop)
  - [WebExtension (Chrome/Firefox)](#webextension-chromefirefox)
  - [React Native (Mobile)](#react-native-mobile)
- [Running Tests](#running-tests)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Core Features

- **Decentralized Identity**: Utilizes ADP (Authenticated Data Protocol) and WebID for decentralized identity and call verification.
- **Native Crypto Wallet**: Integrates a native Cashtab wallet for eCash (XEC) and SLP token management, enabling micro-transactions and obligation cost tracking.
- **Advanced Security**: A comprehensive security module implementing SPHINCS+, ECDSA, RSA, AES, and Ed25519 for robust data protection.
- **P2P Communication**: Leverages WebTorrent, GUN.eco, and WebRTC for decentralized data transfer and real-time communication.
- **Semantic Data**: Built on a foundation of RDF, Quadstore, and versioned ontologies for structured, interoperable data.
- **AI-Powered Accessibility**: Features Chatterbox TTS for advanced, multilingual text-to-speech capabilities.
- **Extensible API**: A secure, WebSocket-based Webizen API allows for modular extensions and integrations.
- **Cross-Platform**: Delivered as an Electron desktop app, a WebExtension, and a React Native mobile app.

## Project Structure

This repository uses a monorepo-like structure with two `package.json` files, which is inherited from the original Beaker Browser architecture:

-   **`scripts/package.json`**: Contains development dependencies (`devDependencies`) and scripts for building, running, and testing the application. All development commands should be run from the `scripts/` directory.
-   **`app/package.json`**: Contains application dependencies (`dependencies`) that will be packaged with the final builds (Electron, React Native).
-   **`modules/`**: Core application logic, separated by feature (e.g., `access`, `security`, `cashtab`).
-   **`services/`**: Shared services used across modules (e.g., `quadstore`, `crypto`, `webizen-api`).
-   **`ontologies/`**: Versioned RDF schemas that define the application's data structures.
-   **`platforms/`**: Platform-specific entry points and configurations for Electron and React Native.

This separation is necessary because native Node.js modules need to be compiled against different runtimes: `devDependencies` against your local Node.js version, and `dependencies` against the Electron runtime.

## Getting Started

### Prerequisites

-   **Node.js**: v20.0.0 or higher.
-   **npm**: v10.0.0 or higher.
-   **Build Tools**: You will need a C++ compiler toolchain to build native dependencies.
    -   **Windows**: Install "Desktop development with C++" from the Visual Studio Installer. See node-gyp installation instructions.
    -   **macOS**: Install Xcode Command Line Tools (`xcode-select --install`).
    -   **Linux**: Install `build-essential` and `python3` (`sudo apt-get install build-essential python3`).
-   **React Native**: Follow the official "Environment Setup" guide for React Native CLI to configure Android Studio and/or Xcode.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/mediaprophet/socialweb.git
    cd socialweb
    ```

2.  Install dependencies from the `scripts` directory. This will also install the `app` dependencies.
    ```bash
    cd scripts
    npm install
    ```

3.  Rebuild native modules for Electron. This step is crucial after any installation or update of dependencies.
    ```bash
    npm run rebuild
    ```

## Running the Application

All commands should be run from the `scripts/` directory.

### Electron (Desktop)

To run the desktop application in development mode:

```bash
npm start
```

### WebExtension (Chrome/Firefox)

To build the WebExtension for loading into a browser:

```bash
npm run build
```
*(Note: This script will be fully implemented in a later task. It will create a `dist/webext` directory.)*

Once built, load the extension into your browser:
1.  Navigate to `chrome://extensions` or `about:debugging`.
2.  Enable "Developer mode".
3.  Click "Load unpacked" and select the `dist/webext` directory.

### React Native (Mobile)

Ensure you have an emulator running or a device connected.

```bash
# For Android
npx react-native run-android

# For iOS
npx react-native run-ios
```

## Running Tests

The project uses Jest for unit and integration testing.

```bash
npm test
```

To see code coverage, run:
```bash
npm test -- --coverage
```

## Troubleshooting

-   **Native Module Errors on `npm install`**: Errors related to `node-gyp` usually mean your build toolchain is not set up correctly. Please refer to the Prerequisites section.

-   **Electron Fails to Start with Module Errors**: If you see an error like `Module version mismatch`, it means the native dependencies were not compiled correctly for Electron's Node.js runtime. Run `npm run rebuild` from the `scripts/` directory to fix this.

-   **"Burnthemall" for a Clean Slate**: If you encounter persistent or strange module errors after pulling updates, you can use the `burnthemall` script. This will completely remove all `node_modules` directories and perform a clean installation and rebuild.
    ```bash
    npm run burnthemall
    ```

## License

The beaker browser project and various related componetns were / are licensed under the MIT License.   A license is yet to be created for this presently incomplete project.
