const CashtabManager = require('../../modules/cashtab');

describe('CashtabManager Unit Tests', () => {
  beforeEach(() => {
    // Reset wallets before each test to ensure isolation
    CashtabManager.wallets.clear();
  });

  test('should create a new wallet', () => {
    const walletId = CashtabManager.createWallet({ name: 'Unit Test Wallet' });
    expect(walletId).toBeDefined();
    expect(CashtabManager.wallets.has(walletId)).toBe(true);
  });

  test('should create a multi-sig address for an existing wallet', () => {
    const walletId = CashtabManager.createWallet({ name: 'MultiSig Wallet' });
    const publicKeys = ['pubkey1', 'pubkey2', 'pubkey3'];
    const address = CashtabManager.createMultiSigAddress(walletId, 2, publicKeys);
    expect(address).toMatch(/^multisig_/);
  });

  test('should throw an error when creating multi-sig for a non-existent wallet', () => {
    expect(() => {
      CashtabManager.createMultiSigAddress('non-existent-wallet', 2, ['pubkey1']);
    }).toThrow('Wallet not found');
  });

  test('should successfully validate a token (mocked)', async () => {
    const isValid = await CashtabManager.validateSLPToken('some_valid_token');
    expect(isValid).toBe(true);
  });

  test('should sign a transaction (mocked)', async () => {
    const txDetails = { to: 'test_address', amount: 500 };
    const signedTx = await CashtabManager.createAndSignTransaction(txDetails, 'test_private_key');
    expect(signedTx).toContain('unsigned_tx_for_500_to_test_address');
    expect(signedTx).toContain('signed_with_test_private_key');
  });
});