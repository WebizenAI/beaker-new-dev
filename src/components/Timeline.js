const { SolidClient } = require('@inrupt/solid-client');
const i18next = require('i18next');
const pagesUI = require('pages-ui');

class Timeline {
  constructor() {
    this.solidClient = new SolidClient();
    this.timelineData = [];
  }

  async loadTimelineData(podUrl) {
    try {
      this.timelineData = await this.solidClient.getData(podUrl);
      console.log('Timeline data loaded from Solid Pod:', this.timelineData);
    } catch (error) {
      console.error('Error loading timeline data:', error);
      throw error;
    }
  }

  addInteractiveZoomAndFilters() {
    try {
      console.log('Adding interactive zoom and filter controls to timeline:', this.timelineData);
      pagesUI.addZoomControls(this.timelineData);
      pagesUI.addFilterControls(this.timelineData);
    } catch (error) {
      console.error('Error adding interactive zoom and filters:', error);
      throw error;
    }
  }

  renderTimeline(language) {
    try {
      i18next.changeLanguage(language);
      console.log('Rendering timeline with multi-lingual support:', language);
      pagesUI.renderTimeline(this.timelineData, i18next.t);
    } catch (error) {
      console.error('Error rendering timeline:', error);
      throw error;
    }
  }
}

module.exports = Timeline;