import React, { useState } from 'react';

const Library = () => {
  const [resources, setResources] = useState([]);
  const [name, setName] = useState('');
  const [metadata, setMetadata] = useState('');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleAddResource = () => {
    if (!name) {
      alert('Please provide a resource name.');
      return;
    }

    const newResource = {
      id: `resource_${Date.now()}`,
      name,
      metadata,
    };
    setResources([...resources, newResource]);
    setName('');
    setMetadata('');
  };

  const handleSearchResources = () => {
    const results = resources.filter((resource) => resource.name.includes(query));
    setSearchResults(results);
  };

  return (
    <div role="main" aria-labelledby="library-section" className="p-4 border rounded">
      <h1 id="library-section" className="text-2xl font-bold mb-4">Library Management</h1>

      {/* Add Resource Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Resource</h2>
        <input
          type="text"
          placeholder="Resource Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          placeholder="Metadata"
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <button
          onClick={handleAddResource}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Resource
        </button>
      </div>

      {/* Search Resources Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Search Resources</h2>
        <input
          type="text"
          placeholder="Search Query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleSearchResources}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Search
        </button>
        {searchResults.length === 0 ? (
          <p>No matching resources found.</p>
        ) : (
          <ul>
            {searchResults.map((resource) => (
              <li key={resource.id} className="mb-2">
                <strong>Name:</strong> {resource.name} <br />
                <strong>Metadata:</strong> {resource.metadata}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Resources List Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Resources List</h2>
        {resources.length === 0 ? (
          <p>No resources added yet.</p>
        ) : (
          <ul>
            {resources.map((resource) => (
              <li key={resource.id} className="mb-2">
                <strong>Name:</strong> {resource.name} <br />
                <strong>Metadata:</strong> {resource.metadata}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Library;
