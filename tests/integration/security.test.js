import { securityManager } from '../../modules/security';

describe('Security Integration Tests', () => {
  test('should sign and verify data using SPHINCS+', async () => {
    const data = 'test_data';
    const signature = await securityManager.signWithSphincs(data);
    const isValid = await securityManager.verifyWithSphincs(data, signature);

    expect(isValid).toBe(true);
  });

  test('should sign and verify data using ECDSA', async () => {
    const data = 'test_data';
    const privateKey = 'ecdsa_private_key';
    const publicKey = 'ecdsa_public_key';

    const signature = await securityManager.signWithEcdsa(data, privateKey);
    const isValid = await securityManager.verifyWithEcdsa(data, signature, publicKey);

    expect(isValid).toBe(true);
  });

  test('should encrypt and decrypt data using RSA', async () => {
    const data = 'test_data';
    const { publicKey, privateKey } = await securityManager.generateRsaKeyPair();

    const encryptedData = await securityManager.encryptWithRsa(data, publicKey);
    const decryptedData = await securityManager.decryptWithRsa(encryptedData, privateKey);

    expect(decryptedData).toBe(data);
  });

  test('should encrypt and decrypt data using AES', async () => {
    const data = 'test_data';
    const key = await securityManager.generateAesKey();

    const encryptedData = await securityManager.encryptWithAes(data, key);
    const decryptedData = await securityManager.decryptWithAes(encryptedData, key);

    expect(decryptedData).toBe(data);
  });

  test('should sign and verify data using Ed25519', async () => {
    const data = 'test_data';
    const privateKey = 'ed25519_private_key';
    const publicKey = 'ed25519_public_key';

    const signature = await securityManager.signWithEd25519(data, privateKey);
    const isValid = await securityManager.verifyWithEd25519(data, signature, publicKey);

    expect(isValid).toBe(true);
  });

  test('SPHINCS+ signing', () => {
    const data = 'test data';
    expect(() => securityManager.sphincsPlusSign(data)).not.toThrow();
  });

  test('ECDSA signing', () => {
    const data = 'test data';
    expect(() => securityManager.ecdsaSign(data)).not.toThrow();
  });

  test('RSA encryption', () => {
    const data = 'test data';
    expect(() => securityManager.rsaEncrypt(data)).not.toThrow();
  });

  test('AES encryption', () => {
    const data = 'test data';
    const key = 'test key';
    expect(() => securityManager.aesEncrypt(data, key)).not.toThrow();
  });

  test('Ed25519 signing', () => {
    const data = 'test data';
    expect(() => securityManager.ed25519Sign(data)).not.toThrow();
  });

  test('Key rotation', () => {
    const keys = { key1: 'value1', key2: 'value2' };
    expect(() => securityManager.storeRotatedKeys(keys)).not.toThrow();
  });

  test('Audit trail logging', () => {
    const action = 'testAction';
    const details = { detail1: 'value1' };
    expect(() => securityManager.logAuditTrail(action, details)).not.toThrow();
  });
});
