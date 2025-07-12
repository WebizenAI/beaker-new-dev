const SettingsManager = require('../../modules/settings/index.js');
const { CashtabManager } = require('../../modules/cashtab/index.js');
const WorkManager = require('../../modules/work/index.js');
const { SolidClient } = require('@inrupt/solid-client-authn-browser');
const i18next = require('i18next');

const settingsManager = new SettingsManager();
const cashtabManager = new CashtabManager();
const workManager = new WorkManager();
const solidClient = new SolidClient();

// Mock data
const mockTransactionDetails = {
  to: 'mockAddress',
  amount: 100,
};
const mockVCDetails = {
  credentialSubject: {
    id: 'mockSubject',
    name: 'Mock Credential',
  },
};
const mockTheme = 'dark';
const mockPodUrl = 'https://mockpod.solidcommunity.net';

// Integration tests

describe('Settings Module Integration Tests', () => {
  test('eCash claims with valid transaction details', async () => {
    const transactionId = await settingsManager.integrateECashTransaction(mockTransactionDetails);
    expect(transactionId).toBeDefined();
    console.log('Transaction ID:', transactionId);
  });

  test('eCash claims with invalid transaction details', async () => {
    const invalidTransactionDetails = { to: '', amount: -100 };
    await expect(settingsManager.integrateECashTransaction(invalidTransactionDetails)).rejects.toThrow();
  });

  test('Donation token/VC issuance with valid details', async () => {
    const vc = await settingsManager.issueVerifiableCredential(mockVCDetails);
    expect(vc).toBeDefined();
    console.log('Issued VC:', vc);
  });

  test('Theme switching with valid theme', () => {
    settingsManager.enableMultiLingualSupport(mockTheme);
    expect(i18next.language).toBe(mockTheme);
    console.log('Theme switched to:', mockTheme);
  });

  test('SolidOS pod unavailability during data storage', async () => {
    const mockData = { key: 'value' };
    jest.spyOn(solidClient, 'saveFile').mockImplementation(() => {
      throw new Error('Pod unavailable');
    });
    await expect(settingsManager.storeData(mockPodUrl, mockData)).rejects.toThrow('Pod unavailable');
  });
});
