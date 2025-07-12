const { Wallet } = require('@cashtab/wallet-lib');
const { issue, verify } = require('@digitalbazaar/vc');
const Quadstore = require('quadstore');
const { SolidClient } = require('@inrupt/solid-client-authn-browser');
const { CashtabManager } = require('../cashtab/index.js');
const WorkManager = require('../work/index.js');
const i18next = require('i18next');

class SettingsManager {
  constructor() {
    this.wallet = new Wallet();
    this.quadstore = new Quadstore();
    this.solidClient = new SolidClient();
    this.cashtabManager = new CashtabManager();
    this.workManager = new WorkManager();
    this.i18n = i18next;
  }

  /**
   * Manage eCash contributor claims.
   * @param {object} claimDetails - Details of the claim.
   * @returns {Promise<string>} - The transaction ID.
   */
  async manageContributorClaim(claimDetails) {
    try {
      const transaction = await this.wallet.createAndSignTransaction(claimDetails);
      console.log('eCash contributor claim processed:', transaction);
      return transaction;
    } catch (error) {
      console.error('Error managing contributor claim:', error);
      throw error;
    }
  }

  /**
   * Issue SLP tokens for agreements/donations.
   * @param {object} tokenDetails - Details of the token issuance.
   * @returns {Promise<string>} - The token ID.
   */
  async issueSLPTokens(tokenDetails) {
    try {
      const tokenId = await this.wallet.issueToken(tokenDetails);
      console.log('SLP token issued:', tokenId);
      return tokenId;
    } catch (error) {
      console.error('Error issuing SLP tokens:', error);
      throw error;
    }
  }

  /**
   * Issue Verifiable Credentials (VCs).
   * @param {object} vcDetails - Details of the VC issuance.
   * @returns {Promise<object>} - The issued VC.
   */
  async issueVerifiableCredential(vcDetails) {
    try {
      const vc = await issue(vcDetails);
      console.log('Verifiable Credential issued:', vc);
      return vc;
    } catch (error) {
      console.error('Error issuing Verifiable Credential:', error);
      throw error;
    }
  }

  /**
   * Store data in Quadstore and SolidOS pods.
   * @param {string} podUrl - The URL of the SolidOS pod.
   * @param {object} data - The data to store.
   */
  async storeData(podUrl, data) {
    try {
      await this.quadstore.put(data);
      await this.solidClient.saveFile(`${podUrl}/settings.json`, JSON.stringify(data), {
        contentType: 'application/json',
      });
      console.log('Data stored successfully in Quadstore and SolidOS pod.');
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  }

  /**
   * Integrate eCash transactions with CashtabManager.
   * @param {object} transactionDetails - Details of the transaction.
   * @returns {Promise<string>} - The transaction ID.
   */
  async integrateECashTransaction(transactionDetails) {
    try {
      const transactionId = await this.cashtabManager.createAndSignTransaction(transactionDetails);
      console.log('Integrated eCash transaction:', transactionId);
      return transactionId;
    } catch (error) {
      console.error('Error integrating eCash transaction:', error);
      throw error;
    }
  }

  /**
   * Integrate project tracking with WorkManager.
   * @param {string} projectId - The ID of the project.
   * @param {object} taskDetails - Details of the task.
   * @returns {object|null} - The added task or null if the project is not found.
   */
  integrateProjectTracking(projectId, taskDetails) {
    try {
      const task = this.workManager.addTask(projectId, taskDetails.name, taskDetails.assignee);
      console.log('Integrated project tracking task:', task);
      return task;
    } catch (error) {
      console.error('Error integrating project tracking:', error);
      return null;
    }
  }

  /**
   * Enable multi-lingual support using i18next.
   * @param {string} language - The language to set.
   */
  enableMultiLingualSupport(language) {
    try {
      this.i18n.changeLanguage(language);
      console.log(this.i18n.t('multi_lingual_support_enabled'), language);
    } catch (error) {
      console.error(this.i18n.t('error_enabling_multi_lingual_support'), error);
    }
  }
}

module.exports = SettingsManager;
