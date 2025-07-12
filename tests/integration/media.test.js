const mediaManager = require('../../modules/media');

describe('Media Integration Tests', () => {
  test('should share media file successfully', () => {
    const filePath = 'test_media.mp4';

    const mockExistsSync = jest.spyOn(require('fs'), 'existsSync').mockReturnValue(true);

    const sharedLink = mediaManager.shareMedia(filePath);
    expect(sharedLink).toBeDefined();
    expect(sharedLink).toContain(`https://example.com/shared/${filePath}`);

    mockExistsSync.mockRestore();
  });

  test('should manage paid access for media file successfully', () => {
    const filePath = 'test_media.mp4';
    const price = 10;

    const mockExistsSync = jest.spyOn(require('fs'), 'existsSync').mockReturnValue(true);

    const accessLink = mediaManager.managePaidAccess(filePath, price);
    expect(accessLink).toBeDefined();
    expect(accessLink).toContain(`https://example.com/paid/${filePath}?price=${price}`);

    mockExistsSync.mockRestore();
  });
});
