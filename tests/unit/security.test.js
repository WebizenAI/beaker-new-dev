const security = require('../../modules/security');

describe('Security Module', () => {
  test('SPHINCS+ signing', () => {
    const data = 'test data';
    expect(() => security.sphincsPlusSign(data)).not.toThrow();
  });

  test('ECDSA signing', () => {
    const data = 'test data';
    expect(() => security.ecdsaSign(data)).not.toThrow();
  });

  test('Fallback to ECDSA', () => {
    const data = 'test data';
    expect(() => security.signData(data, 'UnsupportedAlgorithm')).not.toThrow();
  });
});
