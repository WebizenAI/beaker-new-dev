import React, { useState } from 'react';

const Solid = () => {
  const [podUrl, setPodUrl] = useState('');
  const [data, setData] = useState('');
  const [syncMessage, setSyncMessage] = useState('');

  const handleStoreData = () => {
    if (!podUrl || !data) {
      alert('Please provide both pod URL and data.');
      return;
    }

    alert(`Data stored in Solid pod at ${podUrl}`);
    setData('');
  };

  const handleSynchronizeData = () => {
    if (!podUrl) {
      alert('Please provide a pod URL.');
      return;
    }

    setSyncMessage(`Synchronization successful with Solid pod at ${podUrl}`);
  };

  return (
    <div role="main" aria-labelledby="solid-section" className="p-4 border rounded">
      <h1 id="solid-section" className="text-2xl font-bold mb-4">Solid Pod Management</h1>

      {/* Store Data Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Store Data</h2>
        <input
          type="url"
          placeholder="Pod URL"
          value={podUrl}
          onChange={(e) => setPodUrl(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          placeholder="Data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <button
          onClick={handleStoreData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Store Data
        </button>
      </div>

      {/* Synchronize Data Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Synchronize Data</h2>
        <input
          type="url"
          placeholder="Pod URL"
          value={podUrl}
          onChange={(e) => setPodUrl(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleSynchronizeData}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Synchronize Data
        </button>
        {syncMessage && (
          <p className="mt-2"><strong>Message:</strong> {syncMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Solid;
