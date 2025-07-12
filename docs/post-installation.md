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