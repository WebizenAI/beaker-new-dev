const { loadModel, switchModel } = require('ai-model-loader');
const { cacheQuery, retrieveCachedQuery } = require('rag-query-cache');
const { SolidClient } = require('@inrupt/solid-client');

class AIManager {
  constructor() {
    this.currentModel = null;
    this.solidClient = new SolidClient();
  }

  async initializeModel(modelName) {
    try {
      this.currentModel = await loadModel(modelName);
      console.log(`Model ${modelName} initialized successfully.`);
    } catch (error) {
      console.error(`Error initializing model ${modelName}:`, error);
      throw error;
    }
  }

  async switchToModel(modelName) {
    try {
      this.currentModel = await switchModel(modelName);
      console.log(`Switched to model ${modelName} successfully.`);
    } catch (error) {
      console.error(`Error switching to model ${modelName}:`, error);
      throw error;
    }
  }

  async cacheRAGQuery(query, result) {
    try {
      await cacheQuery(query, result);
      console.log('Query cached successfully:', query);
    } catch (error) {
      console.error('Error caching query:', error);
      throw error;
    }
  }

  async retrieveCachedQuery(query) {
    try {
      const result = await retrieveCachedQuery(query);
      console.log('Retrieved cached query result:', result);
      return result;
    } catch (error) {
      console.error('Error retrieving cached query:', error);
      throw error;
    }
  }

  async storeDataInSolidPod(data, podUrl) {
    try {
      await this.solidClient.saveData(podUrl, data);
      console.log('Data stored in Solid Pod successfully:', podUrl);
    } catch (error) {
      console.error('Error storing data in Solid Pod:', error);
      throw error;
    }
  }
}

module.exports = AIManager;