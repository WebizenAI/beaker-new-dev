const AccessManager = require('../../modules/access');
const CashtabManager = require('../../modules/cashtab');

// Mock the CashtabManager to control its behavior during tests
jest.mock('../../modules/cashtab', () => ({
  createWallet: jest.fn(),
  validateSLPToken: jest.fn(),
  createAndSignTransaction: jest.fn(),
  wallets: new Map(),
}));

describe('AccessManager Integration Tests', () => {
  let walletId;

  beforeEach(() => {
    // Reset mocks and create a fresh wallet for each test
    jest.clearAllMocks();
    walletId = 'test_wallet_123';
    CashtabManager.wallets.set(walletId, { balance: 0 });
  });

  describe('eCash Payment Access', () => {
    test('should grant access and process payment for a wallet with high balance', async () => {
      // Mock a high balance that requires payment
      AccessManager.checkBalance = jest.fn().mockResolvedValue(300000);
      CashtabManager.createAndSignTransaction.mockResolvedValue('signed_tx_hash');

      const hasAccess = await AccessManager.grantAccess(walletId);

      expect(AccessManager.checkBalance).toHaveBeenCalledWith(walletId);
      expect(CashtabManager.createAndSignTransaction).toHaveBeenCalledTimes(1);
      expect(hasAccess).toBe(true);
    });

    test('should grant access without payment for a wallet with low balance', async () => {
      // Mock a low balance that does not require payment
      AccessManager.checkBalance = jest.fn().mockResolvedValue(150000);

      const hasAccess = await AccessManager.grantAccess(walletId);

      expect(AccessManager.checkBalance).toHaveBeenCalledWith(walletId);
      expect(CashtabManager.createAndSignTransaction).not.toHaveBeenCalled();
      expect(hasAccess).toBe(true);
    });

    test('should deny access if payment fails after multiple retries', async () => {
      AccessManager.checkBalance = jest.fn().mockResolvedValue(300000);
      // Mock transaction failure
      CashtabManager.createAndSignTransaction.mockRejectedValue(new Error('Transaction failed'));

      const hasAccess = await AccessManager.grantAccess(walletId);

      expect(CashtabManager.createAndSignTransaction).toHaveBeenCalledTimes(3); // From MAX_PAYMENT_RETRIES
      expect(hasAccess).toBe(false);
    });

    test('should deny access if balance is high but insufficient for payment', async () => {
        // This test simulates a scenario where the user's balance is above the
        // threshold but not high enough to complete the transaction.
        AccessManager.checkBalance = jest.fn().mockResolvedValue(200100); // Above threshold
        CashtabManager.createAndSignTransaction.mockRejectedValue(new Error('Insufficient funds'));

        const hasAccess = await AccessManager.grantAccess(walletId);
        expect(hasAccess).toBe(false);
    });
  });

  describe('SLP Token Access', () => {
    test('should grant access with a valid SLP token, skipping payment check', async () => {
      CashtabManager.validateSLPToken.mockResolvedValue(true);
      AccessManager.checkBalance = jest.fn(); // Create a spy to ensure it's not called

      const hasAccess = await AccessManager.grantAccess(walletId, 'valid_slp_token');

      expect(CashtabManager.validateSLPToken).toHaveBeenCalledWith('valid_slp_token');
      expect(AccessManager.checkBalance).not.toHaveBeenCalled();
      expect(CashtabManager.createAndSignTransaction).not.toHaveBeenCalled();
      expect(hasAccess).toBe(true);
    });

    test('should fall back to eCash payment check with an invalid SLP token', async () => {
      CashtabManager.validateSLPToken.mockResolvedValue(false);
      // Use a low balance to grant access without payment after the token check fails
      AccessManager.checkBalance = jest.fn().mockResolvedValue(150000);

      const hasAccess = await AccessManager.grantAccess(walletId, 'invalid_slp_token');

      expect(CashtabManager.validateSLPToken).toHaveBeenCalledWith('invalid_slp_token');
      expect(AccessManager.checkBalance).toHaveBeenCalledWith(walletId);
      expect(CashtabManager.createAndSignTransaction).not.toHaveBeenCalled();
      expect(hasAccess).toBe(true);
    });
  });

  describe('Obligation Cost Tracking', () => {
    test('should track obligation cost on successful access', async () => {
      const trackObligationCostSpy = jest.spyOn(AccessManager, 'trackObligationCost');
      AccessManager.checkBalance = jest.fn().mockResolvedValue(150000); // Grant access easily

      await AccessManager.grantAccess(walletId);

      expect(trackObligationCostSpy).toHaveBeenCalledWith(walletId, 'initial_access', 0);
      trackObligationCostSpy.mockRestore();
    });

    test('should log obligation cost details correctly', async () => {
      const walletId = 'test_wallet';
      const serviceName = 'test_service';
      const cost = 0.01;

      await AccessManager.trackObligationCost(walletId, serviceName, cost);

      const obligationCosts = AccessManager.obligationCosts;
      expect(obligationCosts).toContainEqual({
        walletId,
        serviceName,
        cost,
        currency: 'XEC',
        timestamp: expect.any(String),
      });
    });
  });
});