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
});
