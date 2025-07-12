### Cashtab Wallet
- **Setup**: Install and configure Cashtab wallet for eCash transactions and SLP token management.
- **Command**: `npm run setup:cashtab`
- **Notes**:
  - Download Cashtab from [https://cashtab.com](https://cashtab.com) or use the integrated CashtabManager in Webizen.
  - Create a new wallet and securely back up your seed phrase.
  - Use Cashtab for eCash payments, SLP token validation, and multi-sig wallet operations.
  - Ensure network connectivity for wallet operations and test with both mainnet and testnet.
  - For multi-lingual wallet UI, select your preferred language in Cashtab settings or via Webizen's i18n module.

### Obligation Cost Tracking
- **Setup**: Enable obligation cost tracking for all Webizen services.
- **Command**: `npm run setup:obligation`
- **Notes**:
  - Obligation costs are tracked automatically when accessing paid features or services.
  - Audit trails are signed with SPHINCS+ and stored in Quadstore and SolidOS pods.
  - To view your obligation cost history, use the Access module UI or run `npm run fetch:obligation-history`.
  - Multi-lingual support is available for all obligation cost notifications and history exports.


### ADP/WebID & WebRTC Call Verification
- **Setup**: Enable ADP/WebID validation and WebRTC call verification for secure communications.
- **Command**: `npm run setup:adp` and `npm run setup:mobile`
- **Notes**:
  - ADP/WebID validation uses DNS TXT records and SolidOS pod integration for identity verification.
  - WebRTC call verification is enabled via the Mobile module, supporting multi-lingual error messages and notifications.
  - Multi-factor authentication (MFA) and biometric support are available for enhanced security.
  - For integration with SolidOS pods, ensure your pod is connected and accessible.
  - All call verification notifications and errors are localized using i18next and can be customized per language.

### Multi-Lingual Setup Guides
- **Notes**:
  - All setup instructions are available in supported languages (see i18n Module section).
  - To switch documentation language, use the language selector in the Webizen UI or refer to `locales/*.jsonld` for translated guides.
  - For accessibility, RTL support is enabled for Arabic and other RTL languages.

### Video Tutorials (Coming Soon)
- **Notes**:
  - Step-by-step video tutorials for Cashtab wallet setup, obligation cost tracking, and other features will be available in all supported languages.
  - Check the official Webizen documentation site for updates and links to video content.
# Post-Installation Guide

## Overview
This document provides a comprehensive setup guide for all features of the Webizen project, including calendar, gitmark, settings, editor, i18n modules, SolidOS integration, OAuth, VC/SLP token issuance, and multi-lingual support.

## Prerequisites
- Node.js 22 LTS
- SolidOS Pod account
- GitHub/GitLab account for OAuth
- IPFS setup for decentralized storage

## Feature Setup

### Calendar
- **Setup**: Configure event storage in SolidOS pods.
- **Command**: `npm run setup:calendar`
- **Notes**: Ensure SolidOS pod connectivity and test event creation, scheduling, and reminders.

### Gitmark
- **Setup**: Authenticate with GitHub/GitLab using OAuth.
- **Command**: `npm run setup:gitmark`
- **Notes**:
  - Ensure API rate limits are not exceeded.
  - Configure eCash transactions using Cashtab.
  - Store commit marks in SolidOS pods.
  - Verify multi-lingual support for commit descriptions.

### Settings
- **Setup**: Configure eCash claims, donation token/VC issuance, and theme preferences.
- **Command**: `npm run setup:settings`
- **Notes**:
  - Ensure SolidOS pod storage is configured.
  - Verify eCash claims using @cashtab/wallet-lib.
  - Issue tokens and VCs using @digitalbazaar/vc.
  - Manage theme preferences with multi-lingual support via i18next.
  - Test theme switching and VC issuance for edge cases (e.g., invalid signatures, pod unavailability).

### Editor
- **Setup**: Configure Monaco Editor for advanced code editing and diagnostics.
- **Command**: `npm run setup:editor`
- **Notes**:
  - Ensure Monaco Editor is properly integrated with the Electron webContents API.
  - Verify diagnostics functionality for code editing.
  - Configure SolidOS pod storage for saving editor content.
  - Enable multi-lingual support using i18next for editor UI.
  - Test edge cases such as invalid git commands and SolidOS pod unavailability.

### i18n Module
- **Setup**: Configure multi-lingual support using i18next and i18next-http-backend.
- **Command**: `npm run setup:i18n`
- **Notes**:
  - Store RDF/JSON language files in `locales/*.jsonld`.
  - Integrate language files with SolidOS pods using @inrupt/solid-client.
  - Supported languages include Italian, Dutch, German, Spanish, French, Mandarin, Hindi, Japanese, Korean, Bengali, Tamil, Telugu, Portuguese, and Quechua.
  - Ensure fallback language handling for missing translations.
  - Test language switching and translation accuracy using integration tests.

### SolidOS Integration
- **Setup**: Connect to SolidOS pods for data storage.
- **Command**: `npm run setup:solidos`
- **Notes**: Verify pod connectivity.

### OAuth
- **Setup**: Authenticate with GitHub/GitLab.
- **Command**: `npm run setup:oauth`
- **Notes**: Ensure client ID and secret are configured.

### VC/SLP Token Issuance
- **Setup**: Issue tokens for agreements and donations.
- **Command**: `npm run setup:tokens`
- **Notes**: Verify token metadata.

### Multi-Lingual Support
- **Setup**: Configure translations for supported languages.
- **Command**: `npm run setup:translations`
- **Notes**: Ensure language files are accessible.

## Conclusion
Follow the above steps to complete the setup of all features. For further assistance, contact the Webizen support team.