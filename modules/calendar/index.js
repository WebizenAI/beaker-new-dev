const xaitask = require('xaitask');
const solidClient = require('@inrupt/solid-client');
const vc = require('@digitalbazaar/vc');
const addressBook = require('../addressbook');
const workManager = require('../work');
const i18next = require('i18next');

async function createEvent(eventDetails, solidPodUrl) {
  console.log(i18next.t('creating_event'), eventDetails);
  // Store event in SolidOS pod
  const eventData = JSON.stringify(eventDetails);
  await solidClient.saveFileInContainer(solidPodUrl, eventData, {
    contentType: 'application/json',
  });
  console.log(i18next.t('event_stored'), solidPodUrl);
}

async function scheduleReminder(eventId, reminderDetails, solidPodUrl) {
  console.log(i18next.t('scheduling_reminder'), eventId);
  // Store reminder in SolidOS pod
  const reminderData = JSON.stringify(reminderDetails);
  await solidClient.saveFileInContainer(solidPodUrl, reminderData, {
    contentType: 'application/json',
  });
  console.log(i18next.t('reminder_stored'), solidPodUrl);
}

async function issueCalendarInviteVC(eventDetails, recipientWebId) {
  console.log('Issuing calendar invite VC for event:', eventDetails);
  const vcData = {
    '@context': 'https://www.w3.org/2018/credentials/v1',
    type: ['VerifiableCredential', 'CalendarInvite'],
    credentialSubject: {
      id: recipientWebId,
      eventDetails,
    },
    issuer: 'https://example.com',
    issuanceDate: new Date().toISOString(),
  };
  const signedVC = await vc.issue(vcData);
  console.log('Calendar invite VC issued:', signedVC);
  return signedVC;
}

async function integrateWithAddressBook(attendees) {
  console.log('Fetching attendee details from address book:', attendees);
  return attendees.map((attendee) => addressBook.searchContacts({ name: attendee }));
}

async function linkWithWorkProject(eventDetails, projectId) {
  console.log('Linking event with work project:', projectId);
  const project = workManager.projects.find((p) => p.id === projectId);
  if (project) {
    project.tasks.push({
      id: `event_${Date.now()}`,
      name: eventDetails.title,
      status: 'scheduled',
    });
    console.log('Event linked to project:', project);
  } else {
    console.error('Project not found:', projectId);
  }
}

module.exports = {
  createEvent,
  scheduleReminder,
  integrateWithAddressBook,
  integrateWithWorkManagement,
  issueCalendarInviteVC,
  linkWithWorkProject,
};
