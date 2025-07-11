# Webizen v0.25: Software Development Specification (Version 20)

## 1. Project Overview

**Date**: July 12, 2025  
**Purpose**: Webizen v0.25 is a humanitarian ICT proof-of-concept, a decentralized social-web browser refactored from Beaker Browser (Electron-based, Chromium renderer), delivered as a WebExtension (Chrome, Firefox) and Electron desktop app, with planned mobile app support. It enables social interactions via an address book with faceted search, chat with Context Markup Language (CML) annotations, RDF-based agreements stored in IPFS with SHACL validation, media sharing, comprehensive project management, hypermedia creation with transcriptions, a semantic library with vector-based search, web usage tracking, local Solid pod, local apps, an app store with crypto support reporting, AI assistants with vector database and spatio-temporal support, parental controls, accessibility with Resemble AI's Chatterbox TTS as default, email interface with AI-driven responses, ADP/WebID call verification, and job scheduling. It integrates with Bitcoin ABC/Cashtab, Chronik, SLP tokens, ADP, SPARQL-MM for media, GUN.eco, WebTorrent, WebRTC, WebSockets, Solid pods, RDF/OWL/HDF5 import/export, Ollama/OpenAI/Grok AI, Tailscale, Webizen API, HDF5 resource management, and SPHINCS+/ECDSA/RSA/AES/Ed25519 security. Access is controlled via `config/webizen-config-v0.25.json` or SLP token, requiring a 100 XEC payment for users with balances >200,000 XEC until obligation costs (e.g., licenses, services) are met, after which derivatives are obligation-free. A test suite UI reports functionality status.

### 1.1 Goals
- **Humanitarian ICT**: Privacy-preserving, accessible, decentralized social-web tools for social good.
- **Access Control**: 100 XEC payment or SLP token until obligation costs met; verified via Cashtab/Chronik with ECDSA.
- **Service Activation**: Verify eCash address ownership via Cashtab with ECDSA signatures.
- **Identity Discovery (ADP)**: Fetch eCash address (`adp:hasEcashAccount`) from DNS TXT; validate with WebID and Cashtab address.
- **Address Book**: Manage contacts with faceted search, integrating ADP/WebID and agreements.
- **Chat and Annotations**: Support 1:1, group chats, SMS/MMS, call recording with private sharing (ADP/WebID), and CML annotations discoverable by ADP domain owners.
- **Semantic Bookmarks**: Store browser history or bookmarks with media metadata, WebTorrent magnet links, and spatio-temporal data.
- **Connection Requests**: RDF-based agreements in IPFS with SHACL validation; signed with SPHINCS+.
- **Media Sharing**: Share videos/PDFs via WebTorrent; paid access via ECDSA.
- **Hypermedia Creation**: Process media files with transcriptions (multilingual via Chatterbox TTS), voice/music characteristics, object descriptions, and timeline metadata using SPARQL-MM.
- **Work Management**: Projects, sub-projects, tasks, contributors, roles, assets, timesheets, reports, issues, Kanban boards, Gantt charts, peer reviews, and fair-terms contributions.
- **Obligation Cost**: Track resource costs (e.g., licenses, services, compute); obligation-free after costs met.
- **Semantic Library**: Share resources with faceted/vector-based search and spatio-temporal contexts.
- **Web Usage Tracking**: WebExtension tracks usage; syncs with Electron/mobile app.
- **Solid Pod**: Local Solid pod in Electron for storage/sync.
- **Local Apps**: Host Solid, Webizen, and third-party apps with JSON-to-RDF translation; report crypto support.
- **App Store**: Discover and install apps with RDF/JSON metadata and crypto support reporting.
- **AI Assistants**: Local (Ollama, Chatterbox) and online (Grok, OpenAI, Gemini) LLMs with RAG, vector embeddings, and spatio-temporal context; remote access via Tailscale.
- **Email Interface**: IMAP-based email with AI-driven responses (e.g., `[ollama] research (topic)`) based on conditions.
- **Mobile App**: Support Webizen app on mobile with sufficient resources (e.g., Ollama), chat/SMS/MMS, call recording, ADP/WebID call verification, and address book.
- **Resource Management**: Dynamically load/download HDF5 resources described in RDF; fetch via WebTorrent/IPFS.
- **Job Scheduling**: Schedule tasks with `xaitask` configurations.
- **Parental Controls**: Guardian-managed ward accounts with rules.
- **Accessibility**: Screen readers (NVDA, VoiceOver, JAWS) and Chatterbox TTS (default) with RDF/JSON configs.
- **Entity eCash Addresses**: Transferable eCash addresses for projects/websites with ECDSA signatures.
- **Vector Database**: Chroma for ML/LLM embeddings, mapped to Quadstore.
- **Spatio-Temporal Support**: GeoSPARQL, OWL-Time, SPARQL-MM, and timeline visualization with MapLibre GL JS.
- **Import/Export**: RDF/OWL/HDF5 formats with SPHINCS+/ECDSA/AES encryption.
- **Secure Backups**: Encrypt with SPHINCS+/ECDSA/AES; store in IPFS/Google Drive/local/Solid pods.
- **Device Synchronization**: Sync via Webizen API, Solid pods, or Tailscale.
- **Dynamic Library Loading**: Context-aware loading/unloading of libraries and HDF5 resources.
- **Webizen API**: REST-like API for module extensions, resource sync, and AI queries.
- **Test Suite**: UI-based test suite reporting functionality status (green tick/red cross with errors).

### 1.2 Key Features
- **Humanitarian ICT**: Privacy-preserving, accessible, decentralized tools.
- **Refactored Beaker Browser**: Electron/Chromium core with WebTorrent/GUN.eco/WebRTC/WebSockets.
- **Native Cashtab Wallet**: eCash wallet with multi-sig, entity addresses, and SLP token validation.
- **Chatterbox TTS**: Default TTS with emotion exaggeration control; multilingual support via Webizen API.[](https://github.com/resemble-ai/chatterbox)[](https://www.resemble.ai/chatterbox/)
- **SPARQL-MM**: Media metadata (images, videos) with object descriptions and timeline alignment.
- **Hypermedia Creation**: Multilingual transcriptions, voice/music characteristics, and object metadata.
- **Work Management**: Comprehensive project management with global collaboration and peer reviews.
- **Obligation Cost**: Track resource costs; obligation-free after costs met.
- **Webizen API**: Extensible API for modules, apps, and mobile integration.
- **Mobile App**: Support for chat, SMS/MMS, call recording, ADP/WebID verification, and personal AI assistant.
- **Email Interface**: IMAP-based email with AI-driven responses based on conditions.
- **Test Suite UI**: Reports functionality status with green tick/red cross and error messages.
- **Security**: SPHINCS+ for non-Bitcoin functions; ECDSA for Cashtab/Chronik/SLP; RSA/AES/Ed25519 for compatibility.

### 1.3 Client Requirements
- **Native Cashtab Wallet**: Integrated for payments/tokens with ECDSA signatures.
- **Browser/OS**: Chrome (v120+), Firefox (v115+), Electron (Windows, macOS, Linux); mobile app (Android 12+, iOS 16+).
- **Storage**: 50MB (IndexedDB), 100MB (Solid pod), 100MB (Chroma), 10MB (SPHINCS+), 8-15GB (Ollama models), 1-10GB (HDF5 resources).
- **Internet**: Required for ADP, Chronik, GUN, WebTorrent, IPFS, Google Drive, online LLMs/TTS, Tailscale, Webizen API.
- **Optional**: Ollama, Chatterbox, LM Studio, AnythingLLM, Google Cloud TTS, AWS Polly, Solid pod, MapLibre GL JS, Tailscale.
- **Hardware**: 4GB RAM, 1GHz CPU (desktop); 6GB RAM, 2GHz CPU (mobile with Ollama); GPU (CUDA/Metal) recommended.
- **Accessibility**: Screen reader support (NVDA, VoiceOver, JAWS); Chatterbox TTS.
- **Dependencies**: Node.js 20, npm, Python 3.11 (Chatterbox/Chroma), Docker (Open WebUI), Tailscale, h5wasm, node-schedule, torchaudio (Chatterbox).

## 2. Architecture

### 2.1 Components
- **Access Control**: Verifies eCash payment or SLP token; tracks obligation costs.
- **Identity (ADP)**: Validates DNS TXT `adp:hasEcashAccount` with WebID and Cashtab address.
- **Service Activation (Cashtab)**: ECDSA-signed message verification with Chronik.
- **Address Book**: Faceted search with ADP/WebID integration.
- **Chat**: GUN.eco, WebRTC, WebSockets; SMS/MMS, call recording, ADP/WebID sharing; CML annotations.
- **Bookmarks**: JSON-LD with media metadata, magnet links, and spatio-temporal data.
- **Agreements**: RDF-based, IPFS-stored, SHACL-validated, SPHINCS+-signed.
- **Media**: WebTorrent sharing; paid access via ECDSA.
- **Hypermedia Creation**: Multilingual transcriptions (Chatterbox), voice/music characteristics, object descriptions, SPARQL-MM timeline metadata.
- **Work Management**: Projects, tasks, contributors, Kanban/Gantt, peer reviews.
- **Obligation Cost**: Tracks resource costs in Quadstore.
- **Semantic Library**: SPARQL/vector-based search with spatio-temporal contexts.
- **Web Usage Tracking**: WebExtension tracking; syncs with Electron/mobile.
- **Solid Pod**: Local storage/sync in Electron.
- **Local Apps**: Host Solid/Webizen apps with JSON-to-RDF translation.
- **App Store**: Discover/install apps with RDF/JSON metadata and crypto reporting.
- **AI Assistants**: Chatterbox (default TTS), Ollama, Grok, OpenAI, Gemini with RAG and spatio-temporal context.
- **Email Interface**: IMAP-based with AI-driven responses (e.g., `[ollama] research (topic)`).
- **Mobile App**: Webizen app with chat, SMS/MMS, call recording, ADP/WebID verification, AI assistant.
- **Resource Management**: Dynamic HDF5 loading via WebTorrent/IPFS.
- **Job Scheduling**: `xaitask` for task scheduling.
- **Parental Controls**: Guardian-managed ward accounts.
- **Accessibility**: Chatterbox TTS and screen reader support.
- **Security**: SPHINCS+, ECDSA, RSA, AES, Ed25519.
- **Vector Database**: Chroma for embeddings, mapped to Quadstore.
- **Spatio-Temporal Support**: GeoSPARQL, OWL-Time, SPARQL-MM, MapLibre GL JS.
- **Import/Export**: RDF/OWL/HDF5 with encryption.
- **Backups**: Encrypted storage in IPFS/Google Drive/Solid pods.
- **Device Sync**: Webizen API, Solid pods, Tailscale.
- **Dynamic Library Loading**: Context-aware library/resource loading.
- **Webizen API**: REST-like API for module extensions.
- **Test Suite UI**: Reports functionality status.

### 2.2 Modularity
- **Modules**: Versioned interfaces in `src/modules/`.
- **Interfaces**: `init`, `handleEvent`, `getData`.
- **Dependency Injection**: `src/services/` for shared services.
- **Config**: `config/webizen-config-v0.25.json` defines compensation, features, obligation costs; AI configs in `ai/configs/`.
- **Event Bus**: `services/eventBus.js` for module communication.
- **Module Manager**: `services/moduleManager.js` for dynamic loading.
- **Platform-Specific Logic**: `src/platforms/` for WebExtension, Electron, mobile.

### 2.3 File Structure
```
socialweb/
├── config/
│   ├── webizen-config-v0.25.json
├── resources/
│   ├── lang-en.h5
├── public/
│   ├── index.html
│   ├── sidebar.html
│   ├── icon.png
│   ├── manifest.json
├── src/
│   ├── components/
│   │   ├── Sidebar.js
│   │   ├── MainWindow.js
│   │   ├── Access.js
│   │   ├── AddressBook.js
│   │   ├── Chat.js
│   │   ├── Bookmarks.js
│   │   ├── Agreements.js
│   │   ├── Media.js
│   │   ├── Work.js
│   │   ├── Library.js
│   │   ├── Tracking.js
│   │   ├── Apps.js
│   │   ├── AppStore.js
│   │   ├── AI.js
│   │   ├── Email.js
│   │   ├── Mobile.js
│   │   ├── Resources.js
│   │   ├── Jobs.js
│   │   ├── ParentalControls.js
│   │   ├── Accessibility.js
│   │   ├── Timeline.js
│   │   ├── Backups.js
│   │   ├── TestSuite.js
│   ├── modules/
│   │   ├── access/
│   │   ├── adp/
│   │   ├── cashtab/
│   │   ├── chronik/
│   │   ├── addressbook/
│   │   ├── chat/
│   │   ├── bookmarks/
│   │   ├── agreements/
│   │   ├── media/
│   │   ├── hypermedia/
│   │   ├── work/
│   │   ├── library/
│   │   ├── solid/
│   │   ├── apps/
│   │   ├── appstore/
│   │   ├── translator/
│   │   ├── ai/
│   │   │   ├── chatterbox/
│   │   │   ├── ollama/
│   │   │   ├── openai/
│   │   │   ├── gemini/
│   │   │   ├── grok/
│   │   │   ├── configs/
│   │   ├── email/
│   │   ├── mobile/
│   │   ├── resources/
│   │   ├── jobs/
│   │   ├── parental/
│   │   ├── accessibility/
│   │   ├── vectordb/
│   │   ├── importexport/
│   │   ├── security/
│   │   ├── timeline/
│   │   ├── backups/
│   │   ├── testsuite/
│   ├── services/
│   │   ├── quadstore.js
│   │   ├── jsonld.js
│   │   ├── turtle.js
│   │   ├── ipfs.js
│   │   ├── webtorrent.js
│   │   ├── webrtc.js
│   │   ├── websockets.js
│   │   ├── permissions.js
│   │   ├── moduleManager.js
│   │   ├── eventBus.js
│   │   ├── config.js
│   │   ├── crypto.js
│   │   ├── webizen-api.js
│   ├── platforms/
│   │   ├── webextension/
│   │   ├── electron/
│   │   ├── mobile/
│   ├── apps/
│   │   ├── configs/
│   │   ├── store/
│   │   ├── installed/
│   ├── accessibility/
│   │   ├── configs/
│   │   │   ├── chatterbox.json
│   │   │   ├── web-speech.json
│   │   │   ├── google-tts.json
│   │   │   ├── aws-polly.json
│   ├── ontologies/
│   │   ├── SemBookmarks-v1.ttl
│   │   ├── cml-v1.ttl
│   │   ├── ai-v1.ttl
│   │   ├── resources-v1.ttl
│   │   ├── work-v1.ttl
│   │   ├── work-v1.shacl.ttl
│   │   ├── parental-v1.ttl
│   │   ├── accessibility-v1.ttl
│   │   ├── cashtab-v1.ttl
│   │   ├── appstore-v1.ttl
│   │   ├── vectordb-v1.ttl
│   │   ├── spatiotemporal-v1.ttl
│   │   ├── sparql-mm-v1.ttl
│   │   ├── importexport-v1.ttl
│   │   ├── security-v1.ttl
│   │   ├── timeline-v1.ttl
│   │   ├── agreements-v1.shacl.ttl
│   │   ├── email-v1.ttl
│   │   ├── mobile-v1.ttl
│   ├── config.js
│   ├── App.js
│   ├── background.js
├── docs/
│   ├── post-installation.md
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 3. Technology Stack
- **WebExtension**: WebExtensions API, React 18.3.0, Tailwind CSS 3.4.0, D3.js 7.8.0, MapLibre GL JS 4.1.3.
- **Electron**: Electron 32.1.0, React 18.3.0, Tailwind CSS 3.4.0.
- **Mobile**: React Native 0.74.0, Tailwind CSS Native 1.0.0.
- **Identity/Data**: N3.js 1.27.0, Quadstore 11.0.0, quadstore-comunica 4.0.0, @comunica/query-sparql 3.0.0, jsonld.js 8.3.2, ipfs-http-client 62.0.0, @inrupt/solid-client 2.0.0, @inrupt/solid-client-authn-browser 2.0.0, node-solid-server 6.0.0, shacl-validator 0.7.0, sparql-mm 0.3.0.
- **TTS**: Chatterbox (resemble-ai/chatterbox 0.1.0, Python 3.11, torchaudio), Web Speech API, Google Cloud TTS, AWS Polly.
- **Vector Database**: chromadb 1.8.0.
- **Resources**: h5wasm 1.4.0 for HDF5 processing.
- **Security**: sphincs 3.0.4 (SHAKE256-robust), @cashtab/wallet-lib (ECDSA), node-rsa 1.1.1, ed25519 1.7.3, CryptoJS 4.1.1.
- **Communication**: GUN.eco 0.2020.1236, WebTorrent 2.1.0, WebRTC (native), WebSockets (ws 8.18.0), react-native-webrtc 1.106.0, react-native-sms 1.11.0, react-native-callkeep 4.3.0.
- **eCash**: Cashtab (refactored), chronik-client 0.11.0.
- **Email**: imap-simple 4.3.0, nodemailer 6.9.0.
- **AI**: Ollama (0.1.0), OpenAI (4.0.0), LiteLLM, LM Studio, AnythingLLM, Grok, Gemini, Whisper (speech-to-text).
- **Backups**: googleapis 144.0.0, CryptoJS 4.1.1.
- **Work Management**: node-schedule 2.1.0, D3.js 7.8.0.
- **Accessibility**: Web Speech API, Chatterbox, Google Cloud TTS, AWS Polly.
- **Apps**: cimba (fork), ThemeForest JSON-based apps.
- **Remote Access**: Tailscale (latest).
- **Build Tools**: Vite 5.0.0, electron-builder 24.0.0, react-native-cli 2.0.1.
- **Node.js**: 20 (LTS).
- **Python**: 3.11 (Chatterbox/Chroma).
- **RDF Vocabularies**: SemBookmarks, ActivityStreams, ADP, Agreements, Media, Work, Library, Access, AI, Resources, Parental, CML, Accessibility, Cashtab, AppStore, VectorDB, SpatioTemporal, SPARQL-MM, ImportExport, Security, Timeline, Email, Mobile.

## 4. Webizen Core API
- **Purpose**: Enable module/app extensions, resource sync, and AI queries.
- **Endpoints**:
  ```javascript
  // REST-like API over WebSockets/Tailscale (port 8080)
  const endpoints = {
    '/modules/register': {
      method: 'POST',
      description: 'Register a new module',
      params: { id: 'string', version: 'string', init: 'function', handleEvent: 'function', getData: 'function' },
      auth: 'SPHINCS+ or Ed25519'
    },
    '/modules/unregister': {
      method: 'POST',
      description: 'Unregister a module',
      params: { id: 'string' },
      auth: 'SPHINCS+ or Ed25519'
    },
    '/resources/load': {
      method: 'POST',
      description: 'Load HDF5 resource',
      params: { uri: 'string', type: 'string' },
      auth: 'SPHINCS+ or AES'
    },
    '/ai/query': {
      method: 'POST',
      description: 'Query AI (Ollama, Grok, etc.) with RAG',
      params: { model: 'string', prompt: 'string', context: 'object' },
      auth: 'SPHINCS+ or AES'
    },
    '/sync/data': {
      method: 'POST',
      description: 'Sync data across devices',
      params: { data: 'object', type: 'string' },
      auth: 'SPHINCS+ or AES'
    },
    '/work/create': {
      method: 'POST',
      description: 'Create project/task',
      params: { projectData: 'object' },
      auth: 'SPHINCS+ or ECDSA'
    },
    '/email/respond': {
      method: 'POST',
      description: 'Trigger AI email response',
      params: { emailId: 'string', condition: 'string', model: 'string' },
      auth: 'SPHINCS+ or AES'
    }
  };
  ```
- **Implementation**: `services/webizen-api.js` exposes endpoints over WebSockets/Tailscale; secures with SPHINCS+/Ed25519/AES.
- **Extension**: Modules register via `/modules/register`; implement `init`, `handleEvent`, `getData`.

## 5. Refactoring Beaker Browser and Cashtab
- **Beaker Fork**: Fork `github.com/beakerbrowser/beaker` to `github.com/mediaprophet/socialweb`; replace Dat with WebTorrent/GUN.eco/WebRTC/WebSockets.
- **Cashtab Refactor**: Integrate `@cashtab/wallet-lib` into `modules/cashtab` with multi-sig, entity addresses, SLP token validation, and ECDSA.
- **Mobile**: Use React Native for mobile app; integrate Cashtab, WebRTC, SMS, call recording.

## 6. Development Phases (Prioritized)

### Phase 1: Core Infrastructure and Webizen API
- **Objective**: Fork Beaker, refactor Cashtab, set up Webizen API and modular structure.
- **Estimated Prompts**: 10-15
- **Estimated Time**: 80-120 hours
- **Tasks**:
  1. Fork Beaker to `github.com/mediaprophet/socialweb`.
  2. Update `package.json` with Node.js 20, React Native, and dependencies.
  3. Remove Dat-specific code; add WebTorrent, GUN.eco, WebRTC, WebSockets.
  4. Refactor Cashtab into `modules/cashtab` with multi-sig, entity addresses, SLP token validation.
  5. Implement `services/webizen-api.js` with core endpoints.
  6. Configure WebExtension (`manifest.json`), Electron (`platforms/electron/main.js`), and React Native (`platforms/mobile/`).
  7. Set up `services/quadstore.js`, `services/jsonld.js`, `services/turtle.js`, `services/ipfs.js`, `services/webtorrent.js`, `services/webrtc.js`, `services/websockets.js`, `services/permissions.js`, `services/moduleManager.js`, `services/config.js`, `services/crypto.js`, `services/eventBus.js`.
  8. Define ontologies (`ontologies/*.ttl`).
  9. Create `config/webizen-config-v0.25.json`.
  10. Implement test suite (`modules/testsuite`) and UI (`components/TestSuite.js`).
- **Deliverables**:
  - Forked repository.
  - Cashtab module (v1.0.0).
  - Webizen API (v1.0.0).
  - WebExtension/Electron/mobile skeleton.
  - Test suite UI with green tick/red cross reporting.

### Phase 2: Access Control and Obligation Costs
- **Objective**: Implement payment/token access model with obligation cost tracking.
- **Estimated Prompts**: 5-8
- **Estimated Time**: 40-60 hours
- **Tasks**:
  1. Implement `modules/access` for 100 XEC payment or SLP token; track obligation costs.
  2. Create `components/Access.js` with ARIA attributes for wallet UI and cost status.
  3. Test with Cashtab/Chronik and SLP token validation.
- **Deliverables**:
  - Access module (v1.0.0).
  - Accessible access UI.

### Phase 3: ADP with WebID and Call Verification
- **Objective**: Implement ADP with WebID and call verification.
- **Estimated Prompts**: 5-7
- **Estimated Time**: 40-60 hours
- **Tasks**:
  1. Implement `modules/adp`:
     - Validate DNS TXT `adp:hasEcashAccount` with WebID and Cashtab address.
     - Verify calls via WebRTC with ADP/WebID.
  2. Create `components/Access.js` with domain/call verification UI (ARIA-compliant).
- **Deliverables**:
  - ADP module (v1.0.0).
  - Accessible ADP UI.

### Phase 4: Security
- **Objective**: Integrate SPHINCS+, ECDSA, RSA, AES, Ed25519.
- **Estimated Prompts**: 6-10
- **Estimated Time**: 50-70 hours
- **Tasks**:
  1. Implement `modules/security` with SPHINCS+ for non-Bitcoin functions, ECDSA for Cashtab, RSA/AES/Ed25519 for compatibility.
  2. Update modules to use appropriate cryptography.
  3. Create `ontologies/security-v1.ttl`.
  4. Test with test suite UI.
- **Deliverables**:
  - Security module (v1.0.0).
  - Updated modules.

### Phase 5: Chatterbox TTS and Accessibility
- **Objective**: Integrate Chatterbox as default TTS; support accessibility.
- **Estimated Prompts**: 5-7
- **Estimated Time**: 40-60 hours
- **Tasks**:
  1. Implement `modules/ai/chatterbox` with Python 3.11, torchaudio, and Chatterbox (MIT license).[](https://github.com/resemble-ai/chatterbox)
  2. Configure `accessibility/configs/chatterbox.json` for emotion exaggeration control.
  3. Update `modules/accessibility` for screen reader and TTS integration.
  4. Create `components/Accessibility.js` with ARIA attributes.
  5. Test with NVDA, VoiceOver, JAWS, and test suite UI.
- **Deliverables**:
  - Chatterbox TTS module (v1.0.0).
  - Accessible TTS UI.

### Phase 6: Work Management
- **Objective**: Implement project management with Kanban/Gantt and peer reviews.
- **Estimated Prompts**: 10-15
- **Estimated Time**: 80-120 hours
- **Tasks**:
  1. Implement `modules/work` with projects, tasks, contributors, timesheets, reports, issues, Kanban/Gantt, peer reviews.
  2. Create `components/Work.js` with ARIA attributes.
  3. Create `ontologies/work-v1.ttl`, `work-v1.shacl.ttl`.
  4. Integrate with Cashtab, timeline, resources, agreements.
  5. Test with test suite UI.
- **Deliverables**:
  - Work module (v1.0.0).
  - Accessible work UI.

### Phase 7: SPARQL-MM and Hypermedia Creation
- **Objective**: Implement SPARQL-MM for media and hypermedia creation with transcriptions.
- **Estimated Prompts**: 6-8
- **Estimated Time**: 50-70 hours
- **Tasks**:
  1. Implement `modules/hypermedia`:
     - Process media (images, videos) with SPARQL-MM (`ontologies/sparql-mm-v1.ttl`).
     - Generate multilingual transcriptions (Chatterbox/Whisper), voice/music characteristics, object descriptions, timeline metadata.
  2. Create `components/Media.js` with hypermedia creation UI (ARIA-compliant).
  3. Integrate with `modules/ai`, `modules/timeline`, `modules/vectordb`.
  4. Test with test suite UI.
- **Deliverables**:
  - Hypermedia module (v1.0.0).
  - Accessible hypermedia UI.

### Phase 8: Mobile App
- **Objective**: Implement React Native mobile app with chat, SMS/MMS, call recording, ADP/WebID, AI assistant.
- **Estimated Prompts**: 8-12
- **Estimated Time**: 60-80 hours
- **Tasks**:
  1. Implement `platforms/mobile` with React Native:
     - Chat (WebRTC/WebSockets), SMS/MMS (`react-native-sms`), call recording (`react-native-callkeep`).
     - ADP/WebID call verification.
     - Address book with faceted search.
     - AI assistant (Ollama/Chatterbox via Tailscale).
  2. Create `components/Mobile.js` with ARIA attributes.
  3. Test resource-intensive features (Ollama) on high-spec devices (6GB RAM, 2GHz CPU).
  4. Test with test suite UI.
- **Deliverables**:
  - Mobile module (v1.0.0).
  - Accessible mobile UI.

### Phase 9: Email Interface
- **Objective**: Implement IMAP-based email with AI-driven responses.
- **Estimated Prompts**: 5-7
- **Estimated Time**: 40-60 hours
- **Tasks**:
  1. Implement `modules/email` with `imap-simple` for email retrieval and `nodemailer` for sending.
  2. Add AI response logic (e.g., `[ollama] research (topic)`) via `modules/ai`.
  3. Create `components/Email.js` with ARIA attributes.
  4. Create `ontologies/email-v1.ttl`.
  5. Test with test suite UI.
- **Deliverables**:
  - Email module (v1.0.0).
  - Accessible email UI.

### Phase 10: Remaining Features
- **Objective**: Implement remaining features (bookmarks, media sharing, library, app store, Solid, AI, resources, timeline, backups, parental controls).
- **Estimated Prompts**: 20-30
- **Estimated Time**: 150-200 hours
- **Tasks**:
  1. Implement `modules/bookmarks`, `modules/media`, `modules/library`, `modules/appstore`, `modules/solid`, `modules/ai`, `modules/resources`, `modules/timeline`, `modules/backups`, `modules/parental`.
  2. Create corresponding components with ARIA attributes.
  3. Integrate with Webizen API, Cashtab, and test suite UI.
- **Deliverables**:
  - Remaining modules (v1.0.0).
  - Accessible UIs.

### Phase 11: Testing and Documentation
- **Objective**: Finalize testing and documentation.
- **Estimated Prompts**: 8-12
- **Estimated Time**: 60-80 hours
- **Tasks**:
  1. Write unit, integration, and e2e tests (`tests/`).
  2. Update `docs/post-installation.md`.
  3. Test accessibility and functionality via `components/TestSuite.js`.
- **Deliverables**:
  - Test suites.
  - Updated documentation.

### Total Estimated Effort
- **Total Prompts**: 88-127
- **Total Time**: 730-950 hours (~4-5 months for a single developer).

## 7. Post-Installation Guide
<xaiArtifact artifact_id="8bd793b6-a607-48ae-b3c0-a75dba1b981e" artifact_version_id="128e5c4f-78bc-40d8-a737-59fb4d4fedfd" title="post-installation.md" contentType="text/markdown">

# Webizen v0.25 Post-Installation Guide

## Prerequisites
- **Browser/OS**: Chrome (v120+), Firefox (v115+), Electron (Windows, macOS, Linux), Android 12+, iOS 16+.
- **Node.js**: 20 (LTS) with npm.
- **Python**: 3.11 (Chatterbox/Chroma).
- **Dependencies**: Install `libtool`, `m4`, `make`, `g++` (Linux), `autoconf`, `automake` (Linux/macOS), Docker, Tailscale, torchaudio.
- **Storage**: 50MB (IndexedDB), 100MB (Solid pod), 100MB (Chroma), 10MB (SPHINCS+), 8-15GB (Ollama), 1-10GB (HDF5).
- **Hardware**: 4GB RAM, 1GHz CPU (desktop); 6GB RAM, 2GHz CPU (mobile with Ollama); GPU (CUDA/Metal) recommended.
- **Accessibility**: Screen reader (NVDA, VoiceOver, JAWS); Chatterbox TTS.

## Installation Steps
1. **Clone Repository**:
   ```bash
   git clone https://github.com/mediaprophet/socialweb.git
   cd socialweb
   npm install
   npm run rebuild
   ```
2. **Install Chatterbox**:
   ```bash
   conda create -n chatterbox python=3.11
   conda activate chatterbox
   git clone https://github.com/resemble-ai/chatterbox.git
   cd chatterbox
   pip install -e .
   ```
3. **Build and Run**:
   - **WebExtension**: `npm run build`; load `socialweb/dist/`.
   - **Electron**: `npm start`.
   - **Mobile**: `npx react-native run-android` or `run-ios`.
4. **Set Up Cashtab Wallet**: Initialize in Access panel; fund with >200,000 XEC or SLP token.
5. **Set Up ADP/WebID**: Validate domain and WebID in Access panel.
6. **Set Up Address Book**: Import contacts; enable faceted search.
7. **Set Up Chat**: Configure 1:1, group chats, SMS/MMS, call recording, ADP/WebID sharing.
8. **Set Up Bookmarks**: Save URLs/media with spatio-temporal tags.
9. **Set Up Agreements**: Create RDF agreements; store in IPFS.
10. **Set Up Media/Hypermedia**: Upload/share media; create hypermedia with transcriptions.
11. **Set Up Work Management**: Create projects, tasks, Kanban/Gantt; manage obligation costs.
12. **Set Up Email**: Configure IMAP; set AI response rules (e.g., `[ollama] research (topic)`).
13. **Set Up Mobile App**: Install on Android/iOS; configure AI, chat, call verification.
14. **Set Up Remaining Features**: Configure library, app store, Solid, AI, resources, timeline, backups, parental controls.
15. **Run Test Suite**: Open Test Suite panel; verify green ticks or view error messages.

## Troubleshooting
- **Wallet**: Check Chronik endpoint; verify ECDSA signatures.
- **Chatterbox**: Ensure Python 3.11, torchaudio; test GPU (CUDA).
- **Mobile**: Verify React Native dependencies; test Ollama on high-spec devices.
- **Email**: Check IMAP credentials; test AI response conditions.
- **Test Suite**: Review error messages in `components/TestSuite.js`.