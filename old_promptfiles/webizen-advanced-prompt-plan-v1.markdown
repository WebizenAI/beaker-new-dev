# Webizen v0.25: Advanced Prompt Plan (Version 1)

## Overview
This advanced prompt plan enhances the development of **Webizen v0.25**, a decentralized social-web browser with features including native Cashtab wallet, ADP/WebID call verification, Chatterbox TTS, SPARQL-MM for media, hypermedia creation, work management, obligation cost tracking, mobile app support, email interface with AI responses, and a test suite UI. It builds on the comprehensive prompt plan (95 prompts, 757 hours) by adding 20 prompts to address edge cases, performance, scalability, accessibility, and advanced AI/mobile features, resulting in 115 prompts and 880 hours (~5 months for a single developer). The plan prioritizes foundational modules (Webizen API, access control, security, Cashtab), followed by critical features (Chatterbox, work management, hypermedia, mobile, email), and advanced enhancements (AI optimization, scalability, UX). Prompts are modular, testable, and aligned with humanitarian ICT goals.

## Prompt Plan Structure
- **Phases**: Aligned with the development phases in the specification (Version 20) and comprehensive prompt plan.
- **Prompts**: Specific tasks to elicit requirements, code, or documentation, including new prompts for robustness and enhancements.
- **Expected Output**: Code artifacts, configuration files, or documentation.
- **Estimated Prompts per Phase**: Breakdown of 115 total prompts.
- **Estimated Time per Prompt**: 1-2 hours for interpretation, coding, or documentation (average 1.5 hours).
- **Dependencies**: Links to prior prompts or modules.
- **Prioritization**: Foundational modules first, then complex features, followed by advanced enhancements.
- **New Additions**: Prompts for performance optimization, error handling, scalability, advanced AI, mobile UX, and accessibility testing.

## Development Phases and Prompts

### Phase 1: Core Infrastructure and Webizen API
- **Objective**: Establish project structure, fork Beaker Browser, refactor Cashtab, implement Webizen API, and add scalability/error handling.
- **Estimated Prompts**: 18 (15 from prior plan + 3 new)
- **Estimated Time**: 135 hours
- **Prompts**:
  1. **Prompt**: "Fork the Beaker Browser repository from `github.com/beakerbrowser/beaker` to `github.com/mediaprophet/socialweb` and update `package.json` for Node.js 20 with dependencies for React 18.3.0, Tailwind CSS 3.4.0, Electron 32.1.0, React Native 0.74.0, and libraries (N3.js, Quadstore, WebTorrent, GUN.eco, etc.). Provide the updated `package.json`."
     - **Expected Output**: `package.json`
     - **Time**: 2 hours
  2. **Prompt**: "Remove Dat-specific code (`app/dat`, `scripts/dat`, `bkr` CLI) and implement WebTorrent, GUN.eco, WebRTC, WebSockets in `modules/webtorrent`, `modules/gun`, `modules/webrtc`, `modules/websockets`. Provide module skeletons."
     - **Expected Output**: Module files
     - **Time**: 4 hours
  3. **Prompt**: "Refactor `@cashtab/wallet-lib` into `modules/cashtab` for multi-sig wallets, entity eCash addresses, SLP token validation, and ECDSA signatures. Include error handling for failed transactions. Provide the code."
     - **Expected Output**: `modules/cashtab/index.js`
     - **Time**: 6 hours
  4. **Prompt**: "Implement `services/webizen-api.js` with REST-like endpoints (`/modules/register`, `/modules/unregister`, `/resources/load`, `/ai/query`, `/sync/data`, `/work/create`, `/email/respond`) over WebSockets/Tailscale, secured with SPHINCS+/Ed25519/AES. Add rate limiting and error logging. Provide the code."
     - **Expected Output**: `services/webizen-api.js`
     - **Time**: 8 hours
  5. **Prompt**: "Configure WebExtension in `manifest.json` with permissions for `storage`, `activeTab`, `sidebarAction`, `tabs`, `history`, `webRequest`, `webRequestBlocking`, `https://*/*`. Provide the manifest file."
     - **Expected Output**: `public/manifest.json`
     - **Time**: 2 hours
  6. **Prompt**: "Configure Electron in `platforms/electron/main.js` with sandboxing and React 18 integration. Add memory monitoring for dynamic library unloading. Provide the code."
     - **Expected Output**: `platforms/electron/main.js`
     - **Time**: 4 hours
  7. **Prompt**: "Configure React Native in `platforms/mobile/` for Android/iOS with dependencies for `react-native-webrtc`, `react-native-sms`, `react-native-callkeep`. Provide the setup code."
     - **Expected Output**: `platforms/mobile/index.js`, `package.json` updates
     - **Time**: 4 hours
  8. **Prompt**: "Set up shared services (`quadstore.js`, `jsonld.js`, `turtle.js`, `ipfs.js`, `webtorrent.js`, `webrtc.js`, `websockets.js`, `permissions.js`, `moduleManager.js`, `config.js`, `crypto.js`, `eventBus.js`) with error handling and logging. Provide the service skeletons."
     - **Expected Output**: Service files
     - **Time**: 10 hours
  9. **Prompt**: "Define versioned ontologies (`SemBookmarks-v1.ttl`, `cml-v1.ttl`, `ai-v1.ttl`, `resources-v1.ttl`, `work-v1.ttl`, `work-v1.shacl.ttl`, `parental-v1.ttl`, `accessibility-v1.ttl`, `cashtab-v1.ttl`, `appstore-v1.ttl`, `vectordb-v1.ttl`, `spatiotemporal-v1.ttl`, `sparql-mm-v1.ttl`, `importexport-v1.ttl`, `security-v1.ttl`, `timeline-v1.ttl`, `agreements-v1.shacl.ttl`, `email-v1.ttl`, `mobile-v1.ttl`). Provide the Turtle/SHACL files."
     - **Expected Output**: Ontology files
     - **Time**: 6 hours
  10. **Prompt**: "Create `config/webizen-config-v0.25.json` defining compensation model, features, and AI configs. Add versioning for backward compatibility. Provide the configuration file."
      - **Expected Output**: `config/webizen-config-v0.25.json`
      - **Time**: 3 hours
  11. **Prompt**: "Implement `modules/testsuite/index.js` with tests for access control, Cashtab, and Webizen API, returning `{ testName, status, error }`. Add performance metrics. Provide the code."
      - **Expected Output**: `modules/testsuite/index.js`
      - **Time**: 5 hours
  12. **Prompt**: "Create `components/TestSuite.js` with a React UI to display test results (green tick/red cross with errors and performance metrics), using ARIA attributes. Provide the code."
      - **Expected Output**: `components/TestSuite.js`
      - **Time**: 4 hours
  13. **Prompt**: "Set up Jest for unit, integration, and e2e tests in `tests/`. Include sample tests for Webizen API and Cashtab with code coverage. Provide the setup and tests."
      - **Expected Output**: `tests/unit/`, `tests/integration/`, `tests/e2e/`, Jest config
      - **Time**: 4 hours
  14. **Prompt**: "Update `README.md` with setup instructions for WebExtension, Electron, and React Native, including dependency troubleshooting. Provide the documentation."
      - **Expected Output**: `README.md`
      - **Time**: 3 hours
  15. **Prompt**: "Create build scripts in `package.json` for WebExtension, Electron, and mobile app using Vite, electron-builder, and react-native-cli. Add minification and optimization. Provide the updated scripts."
      - **Expected Output**: `package.json` scripts
      - **Time**: 3 hours
  16. **Prompt (New)**: "Implement a scalability test in `modules/testsuite/index.js` to simulate 10,000 Quadstore triples and 1,000 Webizen API requests, measuring latency and memory usage. Provide the test case."
      - **Expected Output**: `tests/integration/scalability.test.js`
      - **Time**: 4 hours
      - **Dependencies**: Prompt 11 (test suite)
  17. **Prompt (New)**: "Add a Webizen API health check endpoint (`/health`) in `services/webizen-api.js` to report module status and resource availability (e.g., Quadstore, IPFS). Provide the updated code."
      - **Expected Output**: `services/webizen-api.js`
      - **Time**: 3 hours
      - **Dependencies**: Prompt 4 (Webizen API)
  18. **Prompt (New)**: "Create a logging service in `services/logging.js` for error tracking across modules, with export to Quadstore and IPFS. Provide the code."
      - **Expected Output**: `services/logging.js`
      - **Time**: 3 hours
      - **Dependencies**: Prompt 8 (Quadstore, IPFS)
- **Dependencies**: None (foundational phase).
- **Total Prompts**: 18
- **Total Time**: 135 hours

### Phase 2: Access Control and Obligation Costs
- **Objective**: Implement payment/token access model with obligation cost tracking and error handling.
- **Estimated Prompts**: 8 (6 from prior plan + 2 new)
- **Estimated Time**: 35 hours
- **Prompts**:
  1. **Prompt**: "Implement `modules/access/index.js` to check eCash balance, process 100 XEC payment via Cashtab, validate SLP tokens, and track obligation costs in Quadstore. Include retry logic for failed payments. Provide the code."
     - **Expected Output**: `modules/access/index.js`
     - **Time**: 7 hours
     - **Dependencies**: Prompt 3 (Cashtab), Prompt 8 (Quadstore)
  2. **Prompt**: "Create `components/Access.js` with a React UI for wallet initialization, payment input, SLP token input, and obligation cost status, using ARIA attributes. Provide the code."
     - **Expected Output**: `components/Access.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 1 (React)
  3. **Prompt**: "Update `config/webizen-config-v0.25.json` to include obligation cost tracking for licenses (e.g., Chatterbox, Google Cloud TTS), services (e.g., Grok API), and compute (e.g., Ollama GPU). Provide the updated configuration."
     - **Expected Output**: `config/webizen-config-v0.25.json`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 10 (config)
  4. **Prompt**: "Write integration tests for access control, testing payment, SLP token validation, and obligation cost calculation with edge cases (e.g., insufficient balance). Provide the test cases."
     - **Expected Output**: `tests/integration/access.test.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 13 (Jest)
  5. **Prompt**: "Update `modules/testsuite/index.js` to include access control and obligation cost tests, reporting pass/fail with errors. Provide the updated code."
     - **Expected Output**: `modules/testsuite/index.js`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 11 (test suite)
  6. **Prompt**: "Document access control setup in `docs/post-installation.md`, including wallet initialization, payment, and obligation cost tracking. Provide the updated guide."
     - **Expected Output**: `docs/post-installation.md`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 14 (README)
  7. **Prompt (New)**: "Add an obligation cost audit trail in `modules/access/index.js` to log cost updates in Quadstore with SPHINCS+ signatures. Provide the updated code."
     - **Expected Output**: `modules/access/index.js`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 1 (access), Prompt 8 (Quadstore)
  8. **Prompt (New)**: "Create a UI component in `components/Access.js` to display obligation cost history with export functionality (CSV/RDF). Provide the updated code."
     - **Expected Output**: `components/Access.js`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 2 (Access UI)
- **Total Prompts**: 8
- **Total Time**: 35 hours

### Phase 3: ADP with WebID and Call Verification
- **Objective**: Implement ADP with WebID and call verification, with mobile UX enhancements.
- **Estimated Prompts**: 8 (6 from prior plan + 2 new)
- **Estimated Time**: 35 hours
- **Prompts**:
  1. **Prompt**: "Implement `modules/adp/index.js` to fetch `adp:hasEcashAccount` from DNS TXT, validate with WebID and Cashtab address, and store in Quadstore. Provide the code."
     - **Expected Output**: `modules/adp/index.js`
     - **Time**: 6 hours
     - **Dependencies**: Prompt 3 (Cashtab), Prompt 8 (Quadstore)
  2. **Prompt**: "Implement call verification in `modules/mobile/index.js` using WebRTC and ADP/WebID, with fallback for non-ADP users. Provide the code."
     - **Expected Output**: `modules/mobile/index.js`
     - **Time**: 7 hours
     - **Dependencies**: Prompt 7 (React Native), Prompt 8 (WebRTC)
  3. **Prompt**: "Update `components/Access.js` with a React UI for domain input and call verification status, using ARIA attributes. Provide the updated code."
     - **Expected Output**: `components/Access.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 2 (Access UI)
  4. **Prompt**: "Create `ontologies/mobile-v1.ttl` to define RDF schema for mobile call verification and ADP/WebID integration. Provide the Turtle file."
     - **Expected Output**: `ontologies/mobile-v1.ttl`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 9 (ontologies)
  5. **Prompt**: "Write integration tests for ADP and call verification, testing DNS TXT lookup, WebID validation, and WebRTC verification. Provide the test cases."
     - **Expected Output**: `tests/integration/adp.test.js`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 13 (Jest)
  6. **Prompt**: "Update `modules/testsuite/index.js` to include ADP and call verification tests. Provide the updated code."
     - **Expected Output**: `modules/testsuite/index.js`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 11 (test suite)
  7. **Prompt (New)**: "Add a retry mechanism in `modules/adp/index.js` for failed DNS TXT lookups with exponential backoff. Provide the updated code."
     - **Expected Output**: `modules/adp/index.js`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 1 (ADP)
  8. **Prompt (New)**: "Enhance `components/Mobile.js` with a mobile-optimized UI for call verification status, including notifications for ADP/WebID mismatches. Provide the updated code."
     - **Expected Output**: `components/Mobile.js`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 3 (Mobile UI)
- **Total Prompts**: 8
- **Total Time**: 35 hours

### Phase 4: Security
- **Objective**: Integrate SPHINCS+, ECDSA, RSA, AES, Ed25519 with robust error handling and key management.
- **Estimated Prompts**: 9 (7 from prior plan + 2 new)
- **Estimated Time**: 45 hours
- **Prompts**:
  1. **Prompt**: "Implement `modules/security/index.js` with SPHINCS+ for non-Bitcoin functions, ECDSA for Cashtab/Chronik/SLP, and RSA/AES/Ed25519 for WebRTC/WebSockets/apps. Provide the code."
     - **Expected Output**: `modules/security/index.js`
     - **Time**: 8 hours
     - **Dependencies**: Prompt 3 (Cashtab), Prompt 8 (crypto)
  2. **Prompt**: "Update `modules/cashtab`, `modules/chat`, `modules/ai`, `modules/work`, `modules/backups`, `modules/importexport`, `modules/resources` to use appropriate cryptography. Provide the updated code."
     - **Expected Output**: Updated module files
     - **Time**: 10 hours
     - **Dependencies**: Prompt 1 (modules)
  3. **Prompt**: "Create `ontologies/security-v1.ttl` for key metadata and signature types. Provide the Turtle file."
     - **Expected Output**: `ontologies/security-v1.ttl`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 9 (ontologies)
  4. **Prompt**: "Implement fallback logic in `modules/security/index.js` to use ECDSA if SPHINCS+ is unavailable, with UI notifications. Provide the updated code."
     - **Expected Output**: `modules/security/index.js`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 1 (security)
  5. **Prompt**: "Write unit tests for security module, testing SPHINCS+, ECDSA, RSA, AES, and Ed25519 signatures/encryption with edge cases (e.g., invalid keys). Provide the test cases."
     - **Expected Output**: `tests/unit/security.test.js`
     - **Time**: 5 hours
     - **Dependencies**: Prompt 13 (Jest)
  6. **Prompt**: "Update `modules/testsuite/index.js` to include security tests. Provide the updated code."
     - **Expected Output**: `modules/testsuite/index.js`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 11 (test suite)
  7. **Prompt**: "Document security setup in `docs/post-installation.md`, including key generation and fallback logic. Provide the updated guide."
     - **Expected Output**: `docs/post-installation.md`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 14 (README)
  8. **Prompt (New)**: "Implement a key rotation mechanism in `modules/security/index.js` for SPHINCS+ and ECDSA keys, with secure storage in Quadstore. Provide the updated code."
     - **Expected Output**: `modules/security/index.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 1 (security)
  9. **Prompt (New)**: "Add a security audit log in `modules/security/index.js` to track key usage and signature verifications, stored in Quadstore. Provide the updated code."
     - **Expected Output**: `modules/security/index.js`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 8 (Quadstore)
- **Total Prompts**: 9
- **Total Time**: 45 hours

### Phase 5: Chatterbox TTS and Accessibility
- **Objective**: Integrate Chatterbox as default TTS, enhance accessibility with multilingual support and performance optimization.
- **Estimated Prompts**: 8 (6 from prior plan + 2 new)
- **Estimated Time**: 35 hours
- **Prompts**:
  1. **Prompt**: "Implement `modules/ai/chatterbox/index.js` using Chatterbox (resemble-ai/chatterbox, Python 3.11, torchaudio) for multilingual TTS with emotion exaggeration control. Provide the code and Python setup."
     - **Expected Output**: `modules/ai/chatterbox/index.js`, `chatterbox_setup.py`
     - **Time**: 8 hours
     - **Dependencies**: Prompt 8 (config)
  2. **Prompt**: "Create `accessibility/configs/chatterbox.json` for Chatterbox TTS settings (language, emotion). Provide the configuration file."
     - **Expected Output**: `accessibility/configs/chatterbox.json`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 10 (config)
  3. **Prompt**: "Update `modules/accessibility/index.js` to integrate Chatterbox as default TTS with fallbacks to Web Speech API, Google Cloud TTS, and AWS Polly. Provide the updated code."
     - **Expected Output**: `modules/accessibility/index.js`
     - **Time**: 6 hours
     - **Dependencies**: Prompt 1 (accessibility)
  4. **Prompt**: "Create `components/Accessibility.js` with a React UI for TTS configuration and screen reader integration, using ARIA attributes. Provide the code."
     - **Expected Output**: `components/Accessibility.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 1 (React)
  5. **Prompt**: "Write integration tests for Chatterbox TTS and accessibility, testing multilingual output and screen reader compatibility with edge cases (e.g., unsupported languages). Provide the test cases."
     - **Expected Output**: `tests/integration/accessibility.test.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 13 (Jest)
  6. **Prompt**: "Update `modules/testsuite/index.js` to include Chatterbox TTS and accessibility tests. Provide the updated code."
     - **Expected Output**: `modules/testsuite/index.js`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 11 (test suite)
  7. **Prompt (New)**: "Optimize Chatterbox TTS in `modules/ai/chatterbox/index.js` for low-latency audio generation on CPU/GPU, with caching for frequent phrases. Provide the updated code."
     - **Expected Output**: `modules/ai/chatterbox/index.js`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 1 (Chatterbox)
  8. **Prompt (New)**: "Add multilingual accessibility testing in `tests/integration/accessibility.test.js` for non-Latin scripts (e.g., Arabic, Chinese) using Noto fonts. Provide the updated test cases."
     - **Expected Output**: `tests/integration/accessibility.test.js`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 5 (accessibility tests)
- **Total Prompts**: 8
- **Total Time**: 35 hours

### Phase 6: Work Management
- **Objective**: Implement comprehensive project management with Kanban/Gantt, peer reviews, and scalability.
- **Estimated Prompts**: 10 (8 from prior plan + 2 new)
- **Estimated Time**: 50 hours
- **Prompts**:
  1. **Prompt**: "Implement `modules/work/index.js` to support projects, sub-projects, tasks, contributors, roles, assets, timesheets, reports, issues, Kanban boards, Gantt charts, peer reviews, and fair-terms contributions. Provide the code."
     - **Expected Output**: `modules/work/index.js`
     - **Time**: 10 hours
     - **Dependencies**: Prompt 3 (Cashtab), Prompt 8 (Quadstore)
  2. **Prompt**: "Create `modules/work/kanban.js` and `modules/work/gantt.js` using D3.js for Kanban board and Gantt chart visualizations with dependency analysis. Provide the code."
     - **Expected Output**: `modules/work/kanban.js`, `modules/work/gantt.js`
     - **Time**: 8 hours
     - **Dependencies**: Prompt 1 (D3.js)
  3. **Prompt**: "Create `components/Work.js` with a React UI for project management, including Kanban/Gantt views, contribution submission, and peer review, using ARIA attributes. Provide the code."
     - **Expected Output**: `components/Work.js`
     - **Time**: 6 hours
     - **Dependencies**: Prompt 1 (React)
  4. **Prompt**: "Create `ontologies/work-v1.ttl` and `work-v1.shacl.ttl` for project metadata and SHACL validation. Provide the Turtle/SHACL files."
     - **Expected Output**: `ontologies/work-v1.ttl`, `work-v1.shacl.ttl`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 9 (ontologies)
  5. **Prompt**: "Integrate `modules/work` with `modules/cashtab` for ECDSA payments, `modules/timeline` for spatio-temporal tracking, `modules/resources` for assets, and `modules/agreements` for fair-terms contributions. Provide the updated code."
     - **Expected Output**: Updated `modules/work/index.js`
     - **Time**: 6 hours
     - **Dependencies**: Prompt 3 (Cashtab), Prompt 8 (timeline, resources)
  6. **Prompt**: "Write integration tests for work management, testing project creation, task assignment, payment, and peer reviews with edge cases (e.g., invalid contributions). Provide the test cases."
     - **Expected Output**: `tests/integration/work.test.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 13 (Jest)
  7. **Prompt**: "Update `modules/testsuite/index.js` to include work management tests. Provide the updated code."
     - **Expected Output**: `modules/testsuite/index.js`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 11 (test suite)
  8. **Prompt**: "Document work management setup in `docs/post-installation.md`, including project creation and obligation cost tracking. Provide the updated guide."
     - **Expected Output**: `docs/post-installation.md`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 14 (README)
  9. **Prompt (New)**: "Add real-time collaboration in `modules/work/index.js` using GUN.eco for task updates across global contributors. Provide the updated code."
     - **Expected Output**: `modules/work/index.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 2 (GUN.eco)
  10. **Prompt (New)**: "Optimize Gantt chart rendering in `modules/work/gantt.js` for large projects (1,000+ tasks) using lazy loading. Provide the updated code."
      - **Expected Output**: `modules/work/gantt.js`
      - **Time**: 3 hours
      - **Dependencies**: Prompt 2 (Gantt)
- **Total Prompts**: 10
- **Total Time**: 50 hours

### Phase 7: SPARQL-MM and Hypermedia Creation
- **Objective**: Implement SPARQL-MM for media metadata and hypermedia creation with performance optimization.
- **Estimated Prompts**: 8 (6 from prior plan + 2 new)
- **Estimated Time**: 35 hours
- **Prompts**:
  1. **Prompt**: "Implement `modules/hypermedia/index.js` to process media (images, videos) with SPARQL-MM, generating multilingual transcriptions (Chatterbox/Whisper), voice/music characteristics, object descriptions, and timeline metadata. Provide the code."
     - **Expected Output**: `modules/hypermedia/index.js`
     - **Time**: 8 hours
     - **Dependencies**: Prompt 5 (Chatterbox)
  2. **Prompt**: "Create `ontologies/sparql-mm-v1.ttl` for media metadata, including objects and timeline alignment. Provide the Turtle file."
     - **Expected Output**: `ontologies/sparql-mm-v1.ttl`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 9 (ontologies)
  3. **Prompt**: "Update `components/Media.js` with a React UI for hypermedia creation, including transcription and object tagging, using ARIA attributes. Provide the updated code."
     - **Expected Output**: `components/Media.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 1 (React)
  4. **Prompt**: "Integrate `modules/hypermedia` with `modules/ai` for transcriptions, `modules/timeline` for metadata, and `modules/vectordb` for embeddings. Provide the updated code."
     - **Expected Output**: Updated `modules/hypermedia/index.js`
     - **Time**: 5 hours
     - **Dependencies**: Prompt 5 (AI), Prompt 8 (timeline, vectordb)
  5. **Prompt**: "Write integration tests for hypermedia creation, testing transcription, object detection, and SPARQL-MM queries with edge cases (e.g., large video files). Provide the test cases."
     - **Expected Output**: `tests/integration/hypermedia.test.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 13 (Jest)
  6. **Prompt**: "Update `modules/testsuite/index.js` to include hypermedia tests. Provide the updated code."
     - **Expected Output**: `modules/testsuite/index.js`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 11 (test suite)
  7. **Prompt (New)**: "Optimize SPARQL-MM queries in `modules/hypermedia/index.js` for large media datasets (10,000+ objects) using indexing in Quadstore. Provide the updated code."
     - **Expected Output**: `modules/hypermedia/index.js`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 1 (hypermedia)
  8. **Prompt (New)**: "Add a preview feature in `components/Media.js` for hypermedia transcriptions and object annotations before saving. Provide the updated code."
     - **Expected Output**: `components/Media.js`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 3 (Media UI)
- **Total Prompts**: 8
- **Total Time**: 35 hours

### Phase 8: Mobile App
- **Objective**: Implement React Native mobile app with chat, SMS/MMS, call recording, ADP/WebID, AI assistant, and UX enhancements.
- **Estimated Prompts**: 10 (8 from prior plan + 2 new)
- **Estimated Time**: 45 hours
- **Prompts**:
  1. **Prompt**: "Implement `modules/mobile/index.js` for React Native, supporting chat (WebRTC/WebSockets), SMS/MMS (`react-native-sms`), call recording (`react-native-callkeep`), and ADP/WebID call verification. Provide the code."
     - **Expected Output**: `modules/mobile/index.js`
     - **Time**: 8 hours
     - **Dependencies**: Prompt 7 (React Native), Prompt 3 (ADP)
  2. **Prompt**: "Implement `modules/addressbook/index.js` with faceted search for contacts, integrating ADP/WebID. Provide the code."
     - **Expected Output**: `modules/addressbook/index.js`
     - **Time**: 5 hours
     - **Dependencies**: Prompt 3 (ADP)
  3. **Prompt**: "Create `components/Mobile.js` with a React Native UI for chat, SMS/MMS, call recording, and address book, using ARIA attributes. Provide the code."
     - **Expected Output**: `components/Mobile.js`
     - **Time**: 6 hours
     - **Dependencies**: Prompt 7 (React Native)
  4. **Prompt**: "Integrate `modules/mobile` with `modules/ai` for personal AI assistant (Ollama/Chatterbox via Tailscale) on high-spec devices. Provide the updated code."
     - **Expected Output**: Updated `modules/mobile/index.js`
     - **Time**: 5 hours
     - **Dependencies**: Prompt 5 (Chatterbox), Prompt 8 (Tailscale)
  5. **Prompt**: "Create `ontologies/mobile-v1.ttl` for mobile features (chat, calls, address book). Provide the Turtle file."
     - **Expected Output**: `ontologies/mobile-v1.ttl`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 9 (ontologies)
  6. **Prompt**: "Write integration tests for mobile features, testing chat, SMS/MMS, call recording, and AI assistant with edge cases (e.g., low battery). Provide the test cases."
     - **Expected Output**: `tests/integration/mobile.test.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 13 (Jest)
  7. **Prompt**: "Update `modules/testsuite/index.js` to include mobile feature tests. Provide the updated code."
     - **Expected Output**: `modules/testsuite/index.js`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 11 (test suite)
  8. **Prompt**: "Document mobile app setup in `docs/post-installation.md`, including React Native and AI configuration. Provide the updated guide."
     - **Expected Output**: `docs/post-installation.md`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 14 (README)
  9. **Prompt (New)**: "Add offline support in `modules/mobile/index.js` for chat and address book using local storage and sync via Webizen API. Provide the updated code."
     - **Expected Output**: `modules/mobile/index.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 4 (Webizen API)
  10. **Prompt (New)**: "Enhance `components/Mobile.js` with a mobile-optimized UI for AI assistant interactions, including voice input via Chatterbox. Provide the updated code."
      - **Expected Output**: `components/Mobile.js`
      - **Time**: 3 hours
      - **Dependencies**: Prompt 3 (Mobile UI)
- **Total Prompts**: 10
- **Total Time**: 45 hours

### Phase 9: Email Interface
- **Objective**: Implement IMAP-based email with AI-driven responses and error handling.
- **Estimated Prompts**: 8 (6 from prior plan + 2 new)
- **Estimated Time**: 35 hours
- **Prompts**:
  1. **Prompt**: "Implement `modules/email/index.js` using `imap-simple` for email retrieval and `nodemailer` for sending, with AI-driven responses for conditions (e.g., `[ollama] research (topic)`). Provide the code."
     - **Expected Output**: `modules/email/index.js`
     - **Time**: 8 hours
     - **Dependencies**: Prompt 5 (AI)
  2. **Prompt**: "Create `components/Email.js` with a React UI for email management and AI response configuration, using ARIA attributes. Provide the code."
     - **Expected Output**: `components/Email.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 1 (React)
  3. **Prompt**: "Create `ontologies/email-v1.ttl` for email metadata and AI response rules. Provide the Turtle file."
     - **Expected Output**: `ontologies/email-v1.ttl`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 9 (ontologies)
  4. **Prompt**: "Integrate `modules/email` with `modules/ai` for AI-driven responses via Webizen API. Provide the updated code."
     - **Expected Output**: Updated `modules/email/index.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 4 (Webizen API)
  5. **Prompt**: "Write integration tests for email interface, testing IMAP retrieval and AI responses with edge cases (e.g., invalid IMAP credentials). Provide the test cases."
     - **Expected Output**: `tests/integration/email.test.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 13 (Jest)
  6. **Prompt**: "Update `modules/testsuite/index.js` to include email tests. Provide the updated code."
     - **Expected Output**: `modules/testsuite/index.js`
     - **Time**: 2 hours
     - **Dependencies**: Prompt 11 (test suite)
  7. **Prompt (New)**: "Add rate limiting for AI email responses in `modules/email/index.js` to prevent abuse, with configurable thresholds. Provide the updated code."
     - **Expected Output**: `modules/email/index.js`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 1 (email)
  8. **Prompt (New)**: "Enhance `components/Email.js` with a preview feature for AI-generated email responses before sending. Provide the updated code."
     - **Expected Output**: `components/Email.js`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 2 (Email UI)
- **Total Prompts**: 8
- **Total Time**: 35 hours

### Phase 10: Remaining Features
- **Objective**: Implement bookmarks, media sharing, library, app store, Solid pod, AI assistants, resources, timeline, backups, parental controls, with advanced optimizations.
- **Estimated Prompts**: 28 (23 from prior plan + 5 new)
- **Estimated Time**: 120 hours
- **Prompts**:
  1. **Prompt**: "Implement `modules/bookmarks/index.js` for semantic bookmarks with media processing (`pdf.js`), magnet links, and spatio-temporal data. Provide the code."
     - **Expected Output**: `modules/bookmarks/index.js`
     - **Time**: 6 hours
     - **Dependencies**: Prompt 8 (Quadstore)
  2. **Prompt**: "Create `components/Bookmarks.js` with a React UI for bookmark management, using ARIA attributes. Provide the code."
     - **Expected Output**: `components/Bookmarks.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 1 (React)
  3. **Prompt**: "Implement `modules/media/index.js` for WebTorrent-based media sharing with ECDSA payments. Provide the code."
     - **Expected Output**: `modules/media/index.js`
     - **Time**: 6 hours
     - **Dependencies**: Prompt 3 (Cashtab), Prompt 8 (WebTorrent)
  4. **Prompt**: "Update `components/Media.js` for media sharing UI, using ARIA attributes. Provide the updated code."
     - **Expected Output**: `components/Media.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 7 (hypermedia UI)
  5. **Prompt**: "Implement `modules/library/index.js` for semantic library with SPARQL/vector-based search and spatio-temporal contexts. Provide the code."
     - **Expected Output**: `modules/library/index.js`
     - **Time**: 6 hours
     - **Dependencies**: Prompt 8 (Quadstore, vectordb)
  6. **Prompt**: "Create `components/Library.js` with a React UI for library search, using ARIA attributes. Provide the code."
     - **Expected Output**: `components/Library.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 1 (React)
  7. **Prompt**: "Implement `modules/appstore/index.js` for app discovery, installation, and crypto support reporting (ECDSA, Ed25519). Provide the code."
     - **Expected Output**: `modules/appstore/index.js`
     - **Time**: 6 hours
     - **Dependencies**: Prompt 8 (IPFS)
  8. **Prompt**: "Create `components/AppStore.js` with a React UI for app browsing, using ARIA attributes. Provide the code."
     - **Expected Output**: `components/AppStore.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 1 (React)
  9. **Prompt**: "Implement `modules/solid/index.js` for local Solid pod hosting in Electron. Provide the code."
     - **Expected Output**: `modules/solid/index.js`
     - **Time**: 5 hours
     - **Dependencies**: Prompt 6 (Electron)
  10. **Prompt**: "Implement `modules/apps/index.js` and `modules/translator/index.js` for local app hosting and JSON-to-RDF translation. Provide the code."
      - **Expected Output**: `modules/apps/index.js`, `modules/translator/index.js`
      - **Time**: 6 hours
      - **Dependencies**: Prompt 8 (Quadstore)
  11. **Prompt**: "Create `components/Apps.js` with a React UI for local app management, using ARIA attributes. Provide the code."
      - **Expected Output**: `components/Apps.js`
      - **Time**: 4 hours
      - **Dependencies**: Prompt 1 (React)
  12. **Prompt**: "Implement `modules/ai/index.js` for local (Ollama, LM Studio, AnythingLLM) and online (Grok, OpenAI, Gemini) AI with RAG and spatio-temporal context. Provide the code."
      - **Expected Output**: `modules/ai/index.js`
      - **Time**: 8 hours
      - **Dependencies**: Prompt 5 (Chatterbox), Prompt 8 (vectordb)
  13. **Prompt**: "Create `components/AI.js` with a React UI for AI query and configuration, using ARIA attributes. Provide the code."
      - **Expected Output**: `components/AI.js`
      - **Time**: 4 hours
      - **Dependencies**: Prompt 1 (React)
  14. **Prompt**: "Implement `modules/resources/index.js` for dynamic HDF5 loading/downloading via WebTorrent/IPFS. Provide the code."
      - **Expected Output**: `modules/resources/index.js`
      - **Time**: 6 hours
      - **Dependencies**: Prompt 8 (WebTorrent, IPFS)
  15. **Prompt**: "Create `components/Resources.js` with a React UI for resource management, using ARIA attributes. Provide the code."
      - **Expected Output**: `components/Resources.js`
      - **Time**: 4 hours
      - **Dependencies**: Prompt 1 (React)
  16. **Prompt**: "Implement `modules/timeline/index.js` for n-dimensional timeline visualization with GeoSPARQL, OWL-Time, and MapLibre GL JS. Provide the code."
      - **Expected Output**: `modules/timeline/index.js`
      - **Time**: 6 hours
      - **Dependencies**: Prompt 8 (Quadstore)
  17. **Prompt**: "Create `components/Timeline.js` with a React UI for timeline visualization, using ARIA attributes. Provide the code."
      - **Expected Output**: `components/Timeline.js`
      - **Time**: 4 hours
      - **Dependencies**: Prompt 1 (React)
  18. **Prompt**: "Implement `modules/backups/index.js` for encrypted backups to IPFS, Google Drive, local, or Solid pods. Provide the code."
      - **Expected Output**: `modules/backups/index.js`
      - **Time**: 5 hours
      - **Dependencies**: Prompt 4 (security), Prompt 8 (IPFS)
  19. **Prompt**: "Create `components/Backups.js` with a React UI for backup management, using ARIA attributes. Provide the code."
      - **Expected Output**: `components/Backups.js`
      - **Time**: 4 hours
      - **Dependencies**: Prompt 1 (React)
  20. **Prompt**: "Implement `modules/parental/index.js` for guardian-managed ward accounts with rule-based restrictions. Provide the code."
      - **Expected Output**: `modules/parental/index.js`
      - **Time**: 5 hours
      - **Dependencies**: Prompt 8 (Quadstore)
  21. **Prompt**: "Create `components/ParentalControls.js` with a React UI for parental controls, using ARIA attributes. Provide the code."
      - **Expected Output**: `components/ParentalControls.js`
      - **Time**: 4 hours
      - **Dependencies**: Prompt 1 (React)
  22. **Prompt**: "Write integration tests for remaining features (bookmarks, media, library, app store, Solid, AI, resources, timeline, backups, parental controls) with edge cases. Provide the test cases."
      - **Expected Output**: `tests/integration/*.test.js`
      - **Time**: 8 hours
      - **Dependencies**: Prompt 13 (Jest)
  23. **Prompt**: "Update `modules/testsuite/index.js` to include tests for remaining features. Provide the updated code."
      - **Expected Output**: `modules/testsuite/index.js`
      - **Time**: 3 hours
      - **Dependencies**: Prompt 11 (test suite)
  24. **Prompt (New)**: "Optimize `modules/library/index.js` for large-scale SPARQL queries (10,000+ triples) using caching and batch processing. Provide the updated code."
      - **Expected Output**: `modules/library/index.js`
      - **Time**: 3 hours
      - **Dependencies**: Prompt 5 (library)
  25. **Prompt (New)**: "Add a recommendation engine in `modules/appstore/index.js` using Chroma embeddings for personalized app suggestions. Provide the updated code."
      - **Expected Output**: `modules/appstore/index.js`
      - **Time**: 4 hours
      - **Dependencies**: Prompt 8 (vectordb)
  26. **Prompt (New)**: "Enhance `modules/ai/index.js` with dynamic model switching (e.g., Ollama to Grok based on query complexity) and caching for RAG queries. Provide the updated code."
      - **Expected Output**: `modules/ai/index.js`
      - **Time**: 4 hours
      - **Dependencies**: Prompt 12 (AI)
  27. **Prompt (New)**: "Add incremental backup support in `modules/backups/index.js` for efficient sync with IPFS/Solid pods. Provide the updated code."
      - **Expected Output**: `modules/backups/index.js`
      - **Time**: 3 hours
      - **Dependencies**: Prompt 18 (backups)
  28. **Prompt (New)**: "Enhance `components/Timeline.js` with interactive zoom and filter controls for n-dimensional timelines. Provide the updated code."
      - **Expected Output**: `components/Timeline.js`
      - **Time**: 3 hours
      - **Dependencies**: Prompt 17 (Timeline UI)
- **Total Prompts**: 28
- **Total Time**: 120 hours

### Phase 11: Testing and Documentation
- **Objective**: Finalize comprehensive testing, documentation, and accessibility validation.
- **Estimated Prompts**: 12 (8 from prior plan + 4 new)
- **Estimated Time**: 60 hours
- **Prompts**:
  1. **Prompt**: "Write unit tests for all modules (`access`, `adp`, `cashtab`, `chat`, `bookmarks`, `agreements`, `media`, `hypermedia`, `work`, `library`, `solid`, `apps`, `appstore`, `ai`, `email`, `mobile`, `resources`, `jobs`, `parental`, `accessibility`, `vectordb`, `importexport`, `security`, `timeline`, `backups`) with edge cases. Provide the test cases."
     - **Expected Output**: `tests/unit/*.test.js`
     - **Time**: 10 hours
     - **Dependencies**: Prompt 13 (Jest)
  2. **Prompt**: "Write integration tests for module interactions (e.g., Cashtab with Work, AI with Resources, Mobile with ADP) with performance metrics. Provide the test cases."
     - **Expected Output**: `tests/integration/*.test.js`
     - **Time**: 8 hours
     - **Dependencies**: Prompt 13 (Jest)
  3. **Prompt**: "Write end-to-end tests for full workflows (e.g., payment, ADP call verification, hypermedia creation, email AI response) with edge cases. Provide the test cases."
     - **Expected Output**: `tests/e2e/*.test.js`
     - **Time**: 8 hours
     - **Dependencies**: Prompt 13 (Jest)
  4. **Prompt**: "Update `components/TestSuite.js` to display results for all tests with performance metrics, ensuring ARIA compliance. Provide the updated code."
     - **Expected Output**: `components/TestSuite.js`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 12 (test suite UI)
  5. **Prompt**: "Test accessibility with NVDA, VoiceOver, JAWS across all components. Document findings and fixes in `docs/accessibility-report.md`."
     - **Expected Output**: `docs/accessibility-report.md`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 5 (accessibility)
  6. **Prompt**: "Update `docs/post-installation.md` with complete setup instructions for all features, including Chatterbox, mobile app, and email interface. Provide the updated guide."
     - **Expected Output**: `docs/post-installation.md`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 14 (README)
  7. **Prompt**: "Document Webizen API endpoints and module extension guidelines in `docs/api.md`. Provide the documentation."
     - **Expected Output**: `docs/api.md`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 4 (Webizen API)
  8. **Prompt**: "Create a deployment guide for WebExtension, Electron, and mobile app in `docs/deployment.md`. Provide the documentation."
     - **Expected Output**: `docs/deployment.md`
     - **Time**: 3 hours
     - **Dependencies**: Prompt 14 (README)
  9. **Prompt (New)**: "Add performance benchmarking in `tests/performance/` for AI queries, timeline rendering, and resource loading. Provide the test cases."
     - **Expected Output**: `tests/performance/*.test.js`
     - **Time**: 4 hours
     - **Dependencies**: Prompt 13 (Jest)
  10. **Prompt (New)**: "Create a user feedback form in `components/TestSuite.js` to report test failures to developers, integrated with `services/logging.js`. Provide the updated code."
      - **Expected Output**: `components/TestSuite.js`
      - **Time**: 3 hours
      - **Dependencies**: Prompt 12 (test suite UI), Prompt 18 (logging)
  11. **Prompt (New)**: "Document troubleshooting guides for common issues (e.g., Chatterbox GPU setup, mobile app crashes) in `docs/troubleshooting.md`. Provide the documentation."
      - **Expected Output**: `docs/troubleshooting.md`
      - **Time**: 3 hours
      - **Dependencies**: Prompt 6 (post-installation)
  12. **Prompt (New)**: "Add a CI/CD pipeline configuration in `.github/workflows/ci.yml` for automated testing and deployment of WebExtension, Electron, and mobile app. Provide the configuration."
      - **Expected Output**: `.github/workflows/ci.yml`
      - **Time**: 3 hours
      - **Dependencies**: Prompt 15 (build scripts)
- **Total Prompts**: 12
- **Total Time**: 60 hours

## Total Estimated Effort
- **Total Prompts**: 115
- **Total Time**: 880 hours (~5 months for a single developer, ~2.5 months with 2 developers)
- **Breakdown by Phase**:
  - Phase 1: 18 prompts, 135 hours
  - Phase 2: 8 prompts, 35 hours
  - Phase 3: 8 prompts, 35 hours
  - Phase 4: 9 prompts, 45 hours
  - Phase 5: 8 prompts, 35 hours
  - Phase 6: 10 prompts, 50 hours
  - Phase 7: 8 prompts, 35 hours
  - Phase 8: 10 prompts, 45 hours
  - Phase 9: 8 prompts, 35 hours
  - Phase 10: 28 prompts, 120 hours
  - Phase 11: 12 prompts, 60 hours

## Prioritization Rationale
- **Phase 1**: Establishes Webizen API, Cashtab, and test suite, with new prompts for scalability, health checks, and logging.
- **Phase 2**: Secures access control with audit trails and cost history UI.
- **Phase 3**: Enhances ADP with retry mechanisms and mobile-optimized call verification.
- **Phase 4**: Strengthens security with key rotation and audit logging.
- **Phase 5**: Optimizes Chatterbox TTS and adds multilingual accessibility testing.
- **Phase 6**: Improves work management with real-time collaboration and Gantt optimization.
- **Phase 7**: Enhances hypermedia with SPARQL-MM query optimization and preview features.
- **Phase 8**: Adds offline support and voice input for mobile app.
- **Phase 9**: Improves email interface with rate limiting and response previews.
- **Phase 10**: Optimizes library, app store, AI, backups, and timeline for scalability and UX.
- **Phase 11**: Ensures quality with performance benchmarking, user feedback, troubleshooting, and CI/CD.

## Notes
- **Additional Prompts**: 20 new prompts address edge cases, performance, scalability, and UX, ensuring an excellent solution.
- **Scalability**: Tests for large datasets (10,000+ triples) and optimized rendering/querying.
- **Accessibility**: Enhanced testing for non-Latin scripts and screen readers.
- **Testing**: Comprehensive tests with performance metrics and user feedback.
- **Documentation**: Detailed guides for setup, API, troubleshooting, and deployment.
- **CI/CD**: Automated pipeline for testing and deployment.
- **Parallel Development**: Modular prompts allow 2+ developers to reduce calendar time.