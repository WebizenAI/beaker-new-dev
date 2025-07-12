import React, { useState } from 'react';
import i18next from 'i18next';
import SettingsManager from '../modules/settings';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [status, setStatus] = useState('');
  const settingsManager = new SettingsManager();

  const handleThemeChange = async (newTheme) => {
    setTheme(newTheme);
    setStatus(i18next.t('Theme updated successfully!'));
  };

  const handleClaimSubmission = async (claimDetails) => {
    try {
      const transactionId = await settingsManager.manageContributorClaim(claimDetails);
      setStatus(i18next.t('Claim processed successfully! Transaction ID: ') + transactionId);
    } catch (error) {
      setStatus(i18next.t('Error processing claim: ') + error.message);
    }
  };

  const handleTokenIssuance = async (tokenDetails) => {
    try {
      const tokenId = await settingsManager.issueSLPTokens(tokenDetails);
      setStatus(i18next.t('Token issued successfully! Token ID: ') + tokenId);
    } catch (error) {
      setStatus(i18next.t('Error issuing token: ') + error.message);
    }
  };

  return (
    <div className="p-4 font-sans" role="main">
      <h1 className="text-2xl font-bold mb-4">{i18next.t('Settings')}</h1>

      <section aria-labelledby="theme-selection">
        <h2 id="theme-selection" className="text-xl font-semibold mb-2">{i18next.t('Theme Selection')}</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => handleThemeChange('light')}
            className={`px-4 py-2 rounded ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i18next.t('Light Theme')}
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i18next.t('Dark Theme')}
          </button>
        </div>
      </section>

      <section aria-labelledby="ecash-claims" className="mt-6">
        <h2 id="ecash-claims" className="text-xl font-semibold mb-2">{i18next.t('eCash Claims')}</h2>
        <button
          onClick={() => handleClaimSubmission({ amount: 100, recipient: 'testAddress' })}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {i18next.t('Submit Claim')}
        </button>
      </section>

      <section aria-labelledby="token-issuance" className="mt-6">
        <h2 id="token-issuance" className="text-xl font-semibold mb-2">{i18next.t('Token Issuance')}</h2>
        <button
          onClick={() => handleTokenIssuance({ name: 'Donation Token', amount: 1000 })}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          {i18next.t('Issue Token')}
        </button>
      </section>

      {status && (
        <div role="alert" className="mt-4 p-4 bg-blue-100 text-blue-800 rounded">
          {status}
        </div>
      )}
    </div>
  );
};

export default Settings;
