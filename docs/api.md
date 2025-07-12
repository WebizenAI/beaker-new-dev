# Webizen API Documentation

## Overview
This document provides detailed information about the Webizen API endpoints, module extension guidelines, and integration points for various features including Gitmark, Settings, Editor, i18n, OAuth, and VC/SLP token APIs.

## API Endpoints

### Gitmark
- **Endpoint**: `/api/gitmark`
- **Description**: Manage git marks for GitHub, GitLab, and eCash transactions.
- **Methods**:
  - `POST /api/gitmark`: Create a new git mark.
  - `GET /api/gitmark/:id`: Retrieve details of a git mark.
- **Notes**:
  - Requires OAuth authentication.
  - Supports multi-lingual commit descriptions.

### Settings
- **Endpoint**: `/api/settings`
- **Description**: Manage eCash claims, donation tokens, and theme preferences.
- **Methods**:
  - `POST /api/settings`: Update settings.
  - `GET /api/settings`: Retrieve current settings.
- **Notes**:
  - Supports multi-lingual themes.
  - Requires SolidOS pod integration.

### Editor
- **Endpoint**: `/api/editor`
- **Description**: Interact with the Monaco Editor for code editing and diagnostics.
- **Methods**:
  - `POST /api/editor/save`: Save editor content.
  - `GET /api/editor/diagnostics`: Retrieve diagnostics.
- **Notes**:
  - Requires SolidOS pod storage.
  - Supports multi-lingual UI.

### i18n
- **Endpoint**: `/api/i18n`
- **Description**: Manage translations and language settings.
- **Methods**:
  - `POST /api/i18n/switch`: Switch language.
  - `GET /api/i18n/translations`: Retrieve translations.
- **Notes**:
  - Stores RDF/JSON language files in SolidOS pods.
  - Supports fallback language handling.

### OAuth
- **Endpoint**: `/api/oauth`
- **Description**: Authenticate with GitHub and GitLab.
- **Methods**:
  - `POST /api/oauth/login`: Initiate OAuth login.
  - `GET /api/oauth/status`: Check authentication status.
- **Notes**:
  - Requires client ID and secret configuration.

### VC/SLP Tokens
- **Endpoint**: `/api/tokens`
- **Description**: Issue and manage VC/SLP tokens.
- **Methods**:
  - `POST /api/tokens/issue`: Issue a new token.
  - `GET /api/tokens/:id`: Retrieve token details.
- **Notes**:
  - Supports metadata in RDF/JSON format.

## Module Extension Guidelines

### Gitmark
- Use `@octokit/rest` for GitHub integration.
- Use `gitlab` for GitLab integration.
- Store metadata in Quadstore and SolidOS pods.

### Settings
- Use `@cashtab/wallet-lib` for eCash transactions.
- Store preferences in SolidOS pods.

### Editor
- Use Monaco Editor for code editing.
- Integrate diagnostics via Electron webContents API.

### i18n
- Use `i18next` for multi-lingual support.
- Store translations in RDF/JSON format in SolidOS pods.

### OAuth
- Use `@inrupt/solid-client-authn-browser` for WebID authentication.

### VC/SLP Tokens
- Use `@digitalbazaar/vc` for Verifiable Credentials.
- Use `@cashtab/wallet-lib` for SLP token management.

## Conclusion
This document serves as a comprehensive guide for developers integrating with the Webizen API and extending its modules.

## Endpoints

### Gitmark
- **Endpoint**: `/api/gitmark`
- **Description**: Manage git marks for GitHub, GitLab, and eCash transactions.
- **Methods**:
  - `POST /api/gitmark`: Create a new git mark.
  - `GET /api/gitmark/:id`: Retrieve details of a git mark.
- **Notes**:
  - Requires OAuth authentication.
  - Supports multi-lingual commit descriptions.

### Settings
- **Endpoint**: `/api/settings`
- **Description**: Manage eCash claims, donation tokens, and theme preferences.
- **Methods**:
  - `POST /api/settings`: Update settings.
  - `GET /api/settings`: Retrieve current settings.
- **Notes**:
  - Supports multi-lingual themes.
  - Requires SolidOS pod integration.

### Editor
- **Endpoint**: `/api/editor`
- **Description**: Interact with the Monaco Editor for code editing and diagnostics.
- **Methods**:
  - `POST /api/editor/save`: Save editor content.
  - `GET /api/editor/diagnostics`: Retrieve diagnostics.
- **Notes**:
  - Requires SolidOS pod storage.
  - Supports multi-lingual UI.

### i18n
- **Endpoint**: `/api/i18n`
- **Description**: Manage translations and language settings.
- **Methods**:
  - `POST /api/i18n/switch`: Switch language.
  - `GET /api/i18n/translations`: Retrieve translations.
- **Notes**:
  - Stores RDF/JSON language files in SolidOS pods.
  - Supports fallback language handling.

### OAuth
- **Endpoint**: `/api/oauth`
- **Description**: Authenticate with GitHub and GitLab.
- **Methods**:
  - `POST /api/oauth/login`: Initiate OAuth login.
  - `GET /api/oauth/status`: Check authentication status.
- **Notes**:
  - Requires client ID and secret configuration.

### VC/SLP Tokens
- **Endpoint**: `/api/tokens`
- **Description**: Issue and manage VC/SLP tokens.
- **Methods**:
  - `POST /api/tokens/issue`: Issue a new token.
  - `GET /api/tokens/:id`: Retrieve token details.
- **Notes**:
  - Supports metadata in RDF/JSON format.

## Extension Guidelines
- **Adding New Endpoints**:
  - Define the endpoint in `services/webizen-api.js`.
  - Ensure proper authentication and validation.
  - Document the endpoint in this file.
- **Multi-Lingual Support**:
  - Use i18next for translations.
  - Store language files in SolidOS pods.
- **SolidOS Integration**:
  - Use @inrupt/solid-client for pod interactions.
- **Testing**:
  - Write unit and integration tests for new endpoints.
  - Test edge cases, including pod unavailability and invalid inputs.
