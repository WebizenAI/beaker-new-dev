const bookmarksManager = require('../../modules/bookmarks');

describe('Bookmarks Integration Tests', () => {
  test('should add a new bookmark', () => {
    const url = 'https://example.com';
    const metadata = 'Example metadata';

    const bookmark = bookmarksManager.addBookmark(url, metadata);
    expect(bookmark).toBeDefined();
    expect(bookmark.url).toBe(url);
    expect(bookmark.metadata).toBe(metadata);
  });

  test('should retrieve all bookmarks', () => {
    const url = 'https://example.com';
    const metadata = 'Example metadata';

    bookmarksManager.addBookmark(url, metadata);
    const bookmarks = bookmarksManager.getBookmarks();

    expect(bookmarks).toBeDefined();
    expect(bookmarks.length).toBeGreaterThan(0);
  });

  test('should save bookmarks to a file', () => {
    const filePath = 'bookmarks.json';

    const result = bookmarksManager.saveBookmarks(filePath);
    expect(result).toBe(true);
  });
});
