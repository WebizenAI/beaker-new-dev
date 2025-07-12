import React, { useState } from 'react';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState('');
  const [metadata, setMetadata] = useState('');

  const handleAddBookmark = () => {
    if (!url) {
      alert('Please provide a URL.');
      return;
    }

    const newBookmark = {
      id: `bookmark_${Date.now()}`,
      url,
      metadata,
    };
    setBookmarks([...bookmarks, newBookmark]);
    setUrl('');
    setMetadata('');
  };

  return (
    <div role="main" aria-labelledby="bookmarks-section" className="p-4 border rounded">
      <h1 id="bookmarks-section" className="text-2xl font-bold mb-4">Bookmarks</h1>

      {/* Add Bookmark Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Bookmark</h2>
        <input
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          placeholder="Metadata"
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <button
          onClick={handleAddBookmark}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Bookmark
        </button>
      </div>

      {/* Bookmarks List Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Bookmarks List</h2>
        {bookmarks.length === 0 ? (
          <p>No bookmarks added yet.</p>
        ) : (
          <ul>
            {bookmarks.map((bookmark) => (
              <li key={bookmark.id} className="mb-2">
                <strong>URL:</strong> {bookmark.url} <br />
                <strong>Metadata:</strong> {bookmark.metadata}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
