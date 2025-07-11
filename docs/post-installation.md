# Webizen Post-Installation Guide

This guide provides instructions for setting up core Webizen features after the initial installation.

## 1. Access Control and Wallet Setup

Webizen uses a unique access model based on eCash (XEC) to ensure fair resource usage and support the project's sustainability.

### Step 1: Initialize Your Wallet

Before you can use most features, you need to initialize your native Cashtab wallet.

1.  Navigate to the **Access Control** panel in the Webizen sidebar.
2.  Click the **"Initialize Wallet"** button.
3.  A new eCash wallet will be created for you. Your unique Wallet ID will be displayed. **For security, your private keys are managed by the application and are not displayed.**

### Step 2: Fund Your Wallet

To interact with the network, your wallet will need a small amount of eCash (XEC). You can acquire XEC from various exchanges.

### Step 3: Understanding the Access Model

Webizen's access is based on your wallet's balance:

-   **Balance below 200,000 XEC**: You have free access to all features. No payment is required.
-   **Balance above 200,000 XEC**: A one-time payment of **100 XEC** is required to unlock full access. This payment is processed automatically when you request access. This model ensures that users who can contribute do so, while keeping the platform accessible to everyone.

Alternatively, you can gain access by providing a valid **SLP (Simple Ledger Protocol) token ID** in the designated field. This allows for access via project-specific tokens or other forms of digital assets.

### Step 4: Gaining Access

1.  Once your wallet is initialized (and funded, if necessary), click the **"Request Access"** button in the Access Control panel.
2.  The system will check your balance or validate your SLP token.
3.  If a payment is required, it will be processed automatically.
4.  The status panel will update to show "Access Granted" upon success.

## 2. Obligation Cost Tracking

Webizen tracks the cost of using certain third-party services or computationally intensive features (like premium AI models or TTS services).

-   **How it works**: As you use these services, the associated costs are logged as "obligation costs."
-   **Viewing Costs**: The total obligation cost paid is displayed in the status section of the Access Control panel. A detailed history will be available in a future update.
-   **Obligation-Free Derivatives**: The goal of this system is to cover the operational costs of the platform. Once the collective obligation costs are met, future use of the platform and any derivative works can become obligation-free.