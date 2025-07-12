const chroma = require('chroma');

class AppStoreModule {
  constructor() {
    this.apps = [];
  }

  async addApp(appDetails) {
    try {
      this.apps.push(appDetails);
      console.log('App added successfully:', appDetails);
      return appDetails;
    } catch (error) {
      console.error('Error adding app:', error);
      throw error;
    }
  }

  async recommendApps(userPreferences) {
    try {
      console.log('Generating recommendations based on user preferences:', userPreferences);
      const recommendations = this.apps.filter(app => app.category === userPreferences.category);

      console.log('Recommended apps:', recommendations);
      return recommendations;
    } catch (error) {
      console.error('Error generating app recommendations:', error);
      throw error;
    }
  }
}

module.exports = AppStoreModule;
