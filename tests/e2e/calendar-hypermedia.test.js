const calendarModule = require('../../modules/calendar');
const hypermediaModule = require('../../modules/hypermedia');

describe('E2E Tests for Calendar and Hypermedia Workflows', () => {
  test('Create calendar event and generate transcription', () => {
    const eventDetails = { title: 'Media Event', date: '2025-07-25' };
    calendarModule.createEvent(eventDetails);
    expect(() => hypermediaModule.processMedia(eventDetails)).not.toThrow();
  });

  test('Generate timeline metadata for calendar event', () => {
    const eventDetails = { title: 'Timeline Event', date: '2025-07-30' };
    calendarModule.createEvent(eventDetails);
    expect(() => hypermediaModule.optimizeForLargeDatasets(eventDetails)).not.toThrow();
  });
});
