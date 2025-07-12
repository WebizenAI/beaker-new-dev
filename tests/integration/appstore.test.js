const appStoreManager = require('../../modules/appstore');

describe('App Store Integration Tests', () => {
  describe('discoverApps', () => {
    it('should return a list of available apps', async () => {
      const apps = await appStoreManager.discoverApps();
      expect(apps).toBeInstanceOf(Array);
      expect(apps.length).toBeGreaterThan(0);
      expect(apps[0]).toHaveProperty('name');
      expect(apps[0]).toHaveProperty('id');
    });
  });

  describe('installApp', () => {
    it('should install an app successfully', async () => {
      const appId = 'test-app-id';
      const result = await appStoreManager.installApp(appId);
      expect(result).toBe(true);
    });

    it('should throw an error for invalid app ID', async () => {
      const invalidAppId = 'invalid-app-id';
      await expect(appStoreManager.installApp(invalidAppId)).rejects.toThrow('App not found');
    });
  });

  test('should retrieve installed apps successfully', () => {
    const installedApps = appStoreManager.getInstalledApps();
    expect(installedApps).toBeDefined();
    expect(installedApps.length).toBeGreaterThan(0);
  });
});
