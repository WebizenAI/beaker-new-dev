const i18next = require('i18next');
const { SolidClient } = require('@inrupt/solid-client');
const assert = require('assert');

describe('i18n Integration Tests', () => {
  before(async () => {
    await i18next.init({
      lng: 'en',
      resources: {
        en: {
          translation: {
            testKey: 'Test Value',
          },
        },
        es: {
          translation: {
            testKey: 'Valor de Prueba',
          },
        },
      },
    });
  });

  it('should switch languages correctly', () => {
    i18next.changeLanguage('es');
    assert.strictEqual(i18next.t('testKey'), 'Valor de Prueba');

    i18next.changeLanguage('en');
    assert.strictEqual(i18next.t('testKey'), 'Test Value');
  });

  it('should handle missing language files gracefully', () => {
    i18next.changeLanguage('fr');
    assert.strictEqual(i18next.t('testKey'), 'Test Value'); // Fallback to default language
  });

  it('should handle SolidOS pod unavailability gracefully', async () => {
    const solidClient = new SolidClient();
    try {
      await solidClient.getFile('https://nonexistent-pod.example.com/language.jsonld');
    } catch (error) {
      assert.strictEqual(error.message.includes('404'), true);
    }
  });
});
