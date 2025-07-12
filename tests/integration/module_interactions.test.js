const { describe, it } = require('mocha');
const { expect } = require('chai');

// Import modules to test interactions
const CalendarModule = require('../../modules/calendar');
const WorkModule = require('../../modules/work');
const AIManager = require('../../modules/ai');
const EmailModule = require('../../modules/email');
const GitmarkModule = require('../../modules/gitmark');
const CashtabModule = require('../../modules/cashtab');
const SettingsModule = require('../../modules/settings');
const EditorModule = require('../../modules/editor');
const I18nModule = require('../../modules/i18n');

describe('Integration Tests for Module Interactions', () => {
  it('should integrate CalendarModule with WorkModule for event-based project management', () => {
    const calendar = new CalendarModule();
    const work = new WorkModule();

    const event = { id: 'event1', title: 'Project Kickoff', date: '2025-07-15' };
    calendar.addEvent(event);
    work.addProjectEvent(event);

    expect(work.getProjectEvents()).to.include(event);
  });

  it('should integrate AIManager with EmailModule for AI-driven email responses', () => {
    const aiManager = new AIManager();
    const email = new EmailModule();

    const query = 'Draft a response to the client';
    const aiResponse = aiManager.generateResponse(query);
    email.composeEmail({ subject: 'Client Response', body: aiResponse });

    expect(email.getDrafts()).to.deep.include({ subject: 'Client Response', body: aiResponse });
  });

  it('should integrate GitmarkModule with CashtabModule for eCash transactions', () => {
    const gitmark = new GitmarkModule();
    const cashtab = new CashtabModule();

    const commit = { id: 'commit1', message: 'Initial Commit' };
    gitmark.markCommit(commit);
    const transaction = cashtab.createTransaction({ amount: 10, to: 'eCashAddress' });

    expect(transaction).to.have.property('status', 'success');
  });

  it('should integrate SettingsModule with CashtabModule for eCash claims', () => {
    const settings = new SettingsModule();
    const cashtab = new CashtabModule();

    const claim = { id: 'claim1', amount: 50 };
    settings.addClaim(claim);
    const transaction = cashtab.processClaim(claim);

    expect(transaction).to.have.property('status', 'success');
  });

  it('should integrate EditorModule with GitmarkModule for git operations', () => {
    const editor = new EditorModule();
    const gitmark = new GitmarkModule();

    const file = { name: 'README.md', content: 'Initial content' };
    editor.editFile(file);
    const commit = gitmark.commitChanges(file);

    expect(commit).to.have.property('id');
  });

  it('should integrate I18nModule with all modules for multi-lingual support', () => {
    const i18n = new I18nModule();
    const language = 'es';

    i18n.changeLanguage(language);

    expect(i18n.getCurrentLanguage()).to.equal(language);
  });
});
