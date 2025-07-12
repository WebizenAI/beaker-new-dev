
const security = require('../../modules/security');
jest.mock('../../services/quadstore', () => ({
  insert: jest.fn().mockResolvedValue(true),
}));
jest.mock('@inrupt/solid-client', () => ({
  createSolidDataset: jest.fn(() => ({ things: [] })),
  createThing: jest.fn(({ name }) => ({ name })),
  addStringNoLocale: jest.fn(),
  addThing: jest.fn(),
  saveSolidDatasetAt: jest.fn().mockResolvedValue(true),
}));
jest.mock('../../services/ipfs', () => ({
  storeBackup: jest.fn(async (data) => 'QmFakeCID'),
}));

describe('Security Module', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
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

  test('storeRotatedKeys stores keys and backs up to IPFS', async () => {
    const keys = [
      { id: 'key1', value: 'value1' },
      { id: 'key2', value: 'value2' },
    ];
    const solidPodUrl = 'https://example.org/solid/rotated-keys';
    await expect(security.storeRotatedKeys(keys, solidPodUrl)).resolves.not.toThrow();
    const quadstore = require('../../services/quadstore');
    const ipfs = require('../../services/ipfs');
    expect(quadstore.insert).toHaveBeenCalled();
    expect(ipfs.storeBackup).toHaveBeenCalledWith(JSON.stringify(keys));
  });
});
