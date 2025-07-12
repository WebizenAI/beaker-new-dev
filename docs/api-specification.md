# Webizen API Specification v0.25

This document provides a detailed specification for the Webizen API and its core modules. The API is designed to be modular, secure, and extensible, providing a foundation for a decentralized social-web experience.

## Table of Contents

- [Webizen API (`services/webizen-api.js`)](#webizen-api-serviceswebizen-apijs)
  - Architecture
  - Message Format
  - Endpoints
- Security Module (`modules/security/index.js`)
  - SPHINCS+
  - ECDSA
  - RSA
  - AES
  - Ed25519
- Cashtab Module (`modules/cashtab/index.js`)
- Access Control Module (`modules/access/index.js`)
- ADP & Mobile Modules
  - ADP Manager (`modules/adp/index.js`)
  - Mobile Manager (`modules/mobile/index.js`)
- P2P Modules
- Shared Services

---

## Webizen API (`services/webizen-api.js`)

The Webizen API is the central nervous system of the application, providing REST-like endpoints over a secure WebSocket connection.

### Architecture

- **Transport**: Secure WebSockets (WSS).
- **Security**: All messages are intended to be signed. The API includes rate-limiting to prevent abuse.

### Message Format

All communication with the API is done via JSON objects with the following structure:

```json
{
  "endpoint": "/path/to/resource",
  "payload": { ... },
  "signature": "..."
}
```

### Endpoints

| Endpoint | Payload | Description |
| :--- | :--- | :--- |
| `/modules/register` | `{ "name": "moduleName", ... }` | Registers a new module with the API. |
| `/modules/unregister` | `{ "name": "moduleName" }` | Unregisters an existing module. |
| `/resources/load` | `{ "url": "resource/url" }` | Requests the loading of a specified resource. |
| `/ai/query` | `{ "model": "modelName", "prompt": "..." }` | Sends a query to the specified AI model. |
| `/sync/data` | `{ "source": "...", "data": { ... } }` | Requests data synchronization from a source. |
| `/work/create` | `{ "type": "task", "details": { ... } }` | Creates a new work item (e.g., a task or project). |
| `/email/respond` | `{ "messageId": "...", "response": "..." }` | Sends a response to an email. |
| `/health` | `{}` | Checks the health of the API and its critical services. |

---

## Security Module (`modules/security/index.js`)

The `SecurityManager` provides a unified interface for all cryptographic operations.

### SPHINCS+

- `signWithSphincs(data)`: Signs data using SPHINCS+.
  - **data**: `string` - The data to sign.
  - **Returns**: `Promise<string>` - The signature.
- `verifyWithSphincs(data, signature)`: Verifies a SPHINCS+ signature.
  - **Returns**: `Promise<boolean>`

### ECDSA

- `signWithEcdsa(data, privateKey)`: Signs data using ECDSA, typically for Bitcoin-related operations.
  - **Returns**: `Promise<string>`
- `verifyWithEcdsa(data, signature, publicKey)`: Verifies an ECDSA signature.
  - **Returns**: `Promise<boolean>`

### RSA

- `encryptWithRsa(data, publicKey)`: Encrypts data using RSA.
  - **Returns**: `Promise<string>`
- `decryptWithRsa(encryptedData, privateKey)`: Decrypts data using RSA.
  - **Returns**: `Promise<string>`

### AES

- `encryptWithAes(data, key)`: Encrypts data using AES.
  - **Returns**: `Promise<string>`
- `decryptWithAes(encryptedData, key)`: Decrypts data using AES.
  - **Returns**: `Promise<string>`

### Ed25519

- `signWithEd25519(data, privateKey)`: Signs data using Ed25519.
  - **Returns**: `Promise<string>`
- `verifyWithEd25519(data, signature, publicKey)`: Verifies an Ed25519 signature.
  - **Returns**: `Promise<boolean>`

---

## Cashtab Module (`modules/cashtab/index.js`)

The `CashtabManager` handles all eCash (XEC) and SLP token functionalities.

- `createWallet(options)`: Creates or imports a wallet.
  - **options**: `object` - Wallet options (e.g., name, seed phrase).
  - **Returns**: `string` - The unique wallet ID.
- `createMultiSigAddress(walletId, requiredSigners, publicKeys)`: Generates a multi-signature wallet address.
  - **Returns**: `string` - The multi-sig address.
- `validateSLPToken(tokenId)`: Validates an SLP token.
  - **Returns**: `Promise<boolean>`
- `createAndSignTransaction(transactionDetails, privateKey)`: Creates and signs a transaction using ECDSA via the `SecurityManager`.
  - **Returns**: `Promise<string>` - The signed transaction hex.

---

## Access Control Module (`modules/access/index.js`)

The `AccessManager` controls access to Webizen features.

- `grantAccess(walletId, slpTokenId)`: The main access control function. It checks eCash balance or validates an SLP token. If the balance is high, it triggers a payment.
  - **walletId**: `string`
  - **slpTokenId**: `string` (optional)
  - **Returns**: `Promise<boolean>` - `true` if access is granted.
- `checkBalance(walletId)`: Checks the balance of a given wallet.
  - **Returns**: `Promise<number>`
- `processPayment(walletId, amount)`: Processes a payment with retry logic.
  - **Returns**: `Promise<boolean>`
- `trackObligationCost(walletId, serviceName, cost)`: Tracks the cost of a service and creates a signed audit trail entry in Quadstore.
  - **Returns**: `Promise<void>`

---

## ADP & Mobile Modules

These modules handle decentralized identity and mobile-specific features.

### ADP Manager (`modules/adp/index.js`)

- `verifyDomain(domain)`: Fetches and verifies an eCash address from a domain's DNS TXT records. Includes a retry mechanism for transient DNS errors.
  - **domain**: `string` - The domain to verify.
  - **Returns**: `Promise<object|null>` - An object with `{ domain, ecashAddress }` or `null`.

### Mobile Manager (`modules/mobile/index.js`)

- `verifyCall(callerId)`: Verifies an incoming call using ADP/WebID.
  - **callerId**: `string` - The caller's identifier (domain or phone number).
  - **Returns**: `Promise<{verified: boolean, details: string}>` - The verification status.

---

## P2P Modules

These modules provide the foundation for decentralized communication and data transfer.

- **WebTorrentManager (`modules/webtorrent/index.js`)**: Handles WebTorrent-based P2P file sharing.
- **GunManager (`modules/gun/index.js`)**: Manages real-time, decentralized data synchronization using GUN.
- **WebRTCManager (`modules/webrtc/index.js`)**: Manages WebRTC connections for real-time communication.
- **WebSocketsManager (`modules/websockets/index.js`)**: Manages WebSocket connections for the Webizen API.

---

## Shared Services

These services provide common functionalities used across the application.

- **LoggingService (`services/logging.js`)**: Handles structured logging with support for exporting to Quadstore and IPFS.
- **QuadstoreService (`services/quadstore.js`)**: Manages the RDF Quadstore for semantic data storage.
- **PermissionsService (`services/permissions.js`)**: Manages user permissions for various features.
- **ModuleManager (`services/moduleManager.js`)**: Handles the lifecycle of application modules.
- **ConfigService (`services/config.js`)**: Provides access to the application's configuration.
- **EventBus (`services/eventBus.js`)**: A simple event bus for inter-module communication.

