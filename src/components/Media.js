import React, { useState } from 'react';

const Media = () => {
  const [file, setFile] = useState(null);
  const [sharedLink, setSharedLink] = useState('');
  const [price, setPrice] = useState('');
  const [accessLink, setAccessLink] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleShareMedia = () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    setSharedLink(`https://example.com/shared/${file.name}`);
  };

  const handleManagePaidAccess = () => {
    if (!file || !price) {
      alert('Please select a file and set a price.');
      return;
    }

    setAccessLink(`https://example.com/paid/${file.name}?price=${price}`);
  };

  return (
    <div role="main" aria-labelledby="media-section" className="p-4 border rounded">
      <h1 id="media-section" className="text-2xl font-bold mb-4">Media Sharing</h1>

      {/* File Upload Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upload Media File</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleShareMedia}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
        >
          Share Media
        </button>
        {sharedLink && (
          <p><strong>Shared Link:</strong> <a href={sharedLink}>{sharedLink}</a></p>
        )}
      </div>

      {/* Paid Access Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Manage Paid Access</h2>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleManagePaidAccess}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Set Paid Access
        </button>
        {accessLink && (
          <p><strong>Access Link:</strong> <a href={accessLink}>{accessLink}</a></p>
        )}
      </div>
    </div>
  );
};

export default Media;
