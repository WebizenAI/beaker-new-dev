const i18next = require('i18next');
const Backend = require('i18next-http-backend');
const { SolidClient } = require('@inrupt/solid-client');

// Initialize i18next
const initI18n = async () => {
  await i18next.use(Backend).init({
    backend: {
      loadPath: '/locales/{{lng}}.jsonld',
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
  });

  console.log('i18next initialized with language:', i18next.language);
};

// Function to store language files in SolidOS pods
const storeLanguageFilesInSolidOS = async (languageFiles) => {
  try {
    const session = await SolidClient.login({
      oidcIssuer: 'https://solidcommunity.net',
      clientId: 'your-client-id',
      clientSecret: 'your-client-secret',
    });

    for (const file of languageFiles) {
      await SolidClient.putFile(session, file.path, file.content, {
        contentType: 'application/jsonld',
      });
    }

    console.log('Language files stored in SolidOS pods successfully.');
  } catch (error) {
    console.error('Error storing language files in SolidOS pods:', error);
  }
};

module.exports = {
  initI18n,
  storeLanguageFilesInSolidOS,
};
