const calendarModule = require('../../modules/calendar');

describe('Calendar Module Integration Tests', () => {
  test('Create event', () => {
    const eventDetails = { title: 'Test Event', date: '2025-07-15' };
    expect(() => calendarModule.createEvent(eventDetails)).not.toThrow();
  });

  test('Schedule reminder', () => {
    const eventId = 'event1';
    const reminderDetails = { time: '2025-07-15T09:00:00' };
    expect(() => calendarModule.scheduleReminder(eventId, reminderDetails)).not.toThrow();
  });

  test('Integrate with address book', () => {
    const attendees = ['attendee1', 'attendee2'];
    expect(() => calendarModule.integrateWithAddressBook(attendees)).not.toThrow();
  });

  test('Integrate with work management', () => {
    const projectEvents = ['event1', 'event2'];
    expect(() => calendarModule.integrateWithWorkManagement(projectEvents)).not.toThrow();
  });

  test('Issue VC invite for event', async () => {
    const eventDetails = { title: 'VC Event', date: '2025-07-20' };
    const recipientWebId = 'https://example.com/profile/card#me';
    const vcInvite = await calendarModule.issueCalendarInviteVC(eventDetails, recipientWebId);
    expect(vcInvite).toHaveProperty('credentialSubject');
    expect(vcInvite.credentialSubject.eventDetails.title).toBe('VC Event');
  });

  test('Handle conflicting events', () => {
    const event1 = { title: 'Event 1', date: '2025-07-15T10:00:00' };
    const event2 = { title: 'Event 2', date: '2025-07-15T10:00:00' };
    calendarModule.createEvent(event1);
    expect(() => calendarModule.createEvent(event2)).toThrow('Conflicting event detected');
  });

  test('Handle SolidOS pod unavailability', async () => {
    jest.spyOn(calendarModule, 'createEvent').mockImplementation(() => {
      throw new Error('SolidOS pod unavailable');
    });

    const eventDetails = { title: 'Unavailable Event', date: '2025-07-25' };
    await expect(calendarModule.createEvent(eventDetails)).rejects.toThrow('SolidOS pod unavailable');
  });
});
