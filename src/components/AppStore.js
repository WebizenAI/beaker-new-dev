import React, { useState } from 'react';

const AppStore = () => {
  const [availableApps, setAvailableApps] = useState([
    { id: 'app_1', name: 'Example App 1', description: 'This is an example app.' },
    { id: 'app_2', name: 'Example App 2', description: 'This is another example app.' },
  ]);
  const [installedApps, setInstalledApps] = useState([]);

  const handleInstallApp = (appId) => {
    const app = availableApps.find((app) => app.id === appId);
    if (!app) {
      alert('App not found.');
      return;
    }

    setInstalledApps([...installedApps, app]);
  };

  return (
    <div role="main" aria-labelledby="appstore-section" className="p-4 border rounded">
      <h1 id="appstore-section" className="text-2xl font-bold mb-4">App Store</h1>

      {/* Available Apps Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Available Apps</h2>
        {availableApps.length === 0 ? (
          <p>No apps available.</p>
        ) : (
          <ul>
            {availableApps.map((app) => (
              <li key={app.id} className="mb-2">
                <strong>Name:</strong> {app.name} <br />
                <strong>Description:</strong> {app.description} <br />
                <button
                  onClick={() => handleInstallApp(app.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
                >
                  Install
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Installed Apps Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Installed Apps</h2>
        {installedApps.length === 0 ? (
          <p>No apps installed yet.</p>
        ) : (
          <ul>
            {installedApps.map((app) => (
              <li key={app.id} className="mb-2">
                <strong>Name:</strong> {app.name} <br />
                <strong>Description:</strong> {app.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppStore;
