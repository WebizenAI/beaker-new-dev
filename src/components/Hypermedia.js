import React, { useState } from 'react';

const Hypermedia = () => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [transcription, setTranscription] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProcessFile = () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const mockMetadata = {
      fileName: file.name,
      size: file.size,
      type: file.type,
    };
    setMetadata(mockMetadata);
  };

  const handleGenerateTranscription = () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    setTranscription(`Transcription for ${file.name} in English`);
  };

  return (
    <div role="main" aria-labelledby="hypermedia-section" className="p-4 border rounded">
      <h1 id="hypermedia-section" className="text-2xl font-bold mb-4">Hypermedia Creation</h1>

      {/* File Upload Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upload Media File</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleProcessFile}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Process File
        </button>
      </div>

      {/* Metadata Section */}
      {metadata && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Metadata</h2>
          <p><strong>File Name:</strong> {metadata.fileName}</p>
          <p><strong>Size:</strong> {metadata.size} bytes</p>
          <p><strong>Type:</strong> {metadata.type}</p>
        </div>
      )}

      {/* Transcription Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Generate Transcription</h2>
        <button
          onClick={handleGenerateTranscription}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Generate Transcription
        </button>
        {transcription && (
          <p className="mt-2"><strong>Transcription:</strong> {transcription}</p>
        )}
      </div>
    </div>
  );
};

export default Hypermedia;
