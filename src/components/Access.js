import React, { useState, useEffect } from 'react';

// In a real Electron/Node.js environment, these imports would likely be handled
// via a preload script to expose necessary backend modules to the frontend.
import AccessManager from '../modules/access';
import CashtabManager from '../modules/cashtab';

const Access = () => {
  const [walletId, setWalletId] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [slpTokenId, setSlpTokenId] = useState('');
  const [statusMessage, setStatusMessage] = useState('Please initialize your wallet to continue.');
  const [isProcessing, setIsProcessing] = useState(false);
  const [obligationCost, setObligationCost] = useState(0);
  const [history, setHistory] = useState([]);

  // Mock data for obligation cost history
  const mockHistory = [
    { timestamp: new Date().toISOString(), serviceName: 'initial_access', cost: 0, currency: 'XEC' },
    { timestamp: new Date(Date.now() - 100000).toISOString(), serviceName: 'grok_api', cost: 0.01, currency: 'USD' },
  ];

  useEffect(() => {
    // Effect to update balance when walletId changes

  useEffect(() => {
    // Effect to update balance when walletId changes
    if (walletId) {
      const fetchBalance = async () => {
        const balance = await AccessManager.checkBalance(walletId);
        setWalletBalance(balance);
      };
      fetchBalance();
      // In a real app, we would fetch the history from Quadstore
      setHistory(mockHistory);
    }
  }, [walletId]);

  // Effect to update obligation cost
  useEffect(() => {
    if (walletId) {
      const fetchObligationCost = async () => {
        const cost = await AccessManager.getObligationCost(walletId);
        setObligationCost(cost);
      };
      fetchObligationCost();
    }
  }, [walletId]);

  const handleInitializeWallet = () => {
    setStatusMessage('Initializing wallet...');
    try {
      const newWalletId = CashtabManager.createWallet({ name: 'WebizenUserWallet' });
      setWalletId(newWalletId);
      setStatusMessage(`Wallet initialized. ID: ${newWalletId}`);
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  const handleGrantAccess = async () => {
    if (!walletId) {
      setStatusMessage('Please initialize a wallet first.');
      return;
    }
    setIsProcessing(true);
    setStatusMessage('Checking access...');

    try {
      const accessGranted = await AccessManager.grantAccess(walletId, slpTokenId);
      if (accessGranted) {
        setStatusMessage('Access Granted. Welcome to Webizen!');
        // In a real app, this would unlock features.
      } else {
        setStatusMessage('Access Denied. Please check your balance or SLP token.');
      }
    } catch (error) {
      setStatusMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4 font-sans" role="application" aria-label="Webizen Access Control">
      <h1 className="text-2xl font-bold mb-4">Access Control</h1>

      {/* Wallet Section */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Wallet</h2>
        {!walletId ? (
          <button
            onClick={handleInitializeWallet}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Initialize Wallet
          </button>
        ) : (
          <div>
            <p><strong>Wallet ID:</strong> {walletId}</p>
            <p><strong>Balance:</strong> {walletBalance} XEC</p>
          </div>
        )}
      </div>

      {/* Access Granting Section */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Request Access</h2>
        <div className="mb-4">
          <label htmlFor="slpToken" className="block mb-1 font-medium">
            SLP Token ID (Optional)
          </label>
          <input
            id="slpToken"
            type="text"
            value={slpTokenId}
            onChange={(e) => setSlpTokenId(e.target.value)}
            placeholder="Enter SLP token for alternative access"
            className="w-full p-2 border rounded"
            aria-describedby="slpHelp"
          />
          <p id="slpHelp" className="text-sm text-gray-500 mt-1">
            Provide an SLP token ID to gain access without an eCash payment.
          </p>
        </div>
        <button
          onClick={handleGrantAccess}
          disabled={isProcessing || !walletId}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          aria-busy={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Request Access'}
        </button>
      </div>

      {/* Status Section */}
      <div role="status" aria-live="polite" className="p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Status</h2>
        <p>{statusMessage}</p>
        <p><strong>Obligation Cost Paid:</strong> {obligationCost} XEC</p>
      </div>

              <p>{statusMessage}</p>
        <p><strong>Obligation Cost Paid:</strong> {obligationCost} XEC</p>
      </div>

      {/* Obligation Cost History Section */}
      {history.length > 0 && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Obligation Cost History</h2>
          <div className="mb-4 space-x-2">
            <button
              onClick={() => console.log('Exporting history as CSV...')}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
            >
              Export as CSV
            </button>
            <button
              onClick={() => console.log('Exporting history as RDF...')}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
            >
              Export as RDF
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b">Timestamp</th>
                <th className="p-2 border-b">Service</th>
                <th className="p-2 border-b text-right">Cost</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border-b">{new Date(item.timestamp).toLocaleString()}</td>
                  <td className="p-2 border-b">{item.serviceName}</td>
                  <td className="p-2 border-b text-right">
                    {item.cost} {item.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Access;


    </div>
  );
};

export default Access;