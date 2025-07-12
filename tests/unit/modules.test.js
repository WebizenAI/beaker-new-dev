const { describe, it } = require('mocha');
const { expect } = require('chai');

// Import modules to test
const CalendarModule = require('../../modules/calendar');
const ChatterboxModule = require('../../modules/ai/chatterbox');
const WorkModule = require('../../modules/work');
const HypermediaModule = require('../../modules/hypermedia');
const MobileModule = require('../../modules/mobile');
const EmailModule = require('../../modules/email');
const LibraryModule = require('../../modules/library');
const AppStoreModule = require('../../modules/appstore');
const AIManager = require('../../modules/ai');
const BackupManager = require('../../modules/backups');
const Timeline = require('../../src/components/Timeline');
const GitmarkModule = require('../../modules/gitmark');
const SettingsModule = require('../../modules/settings');
const EditorModule = require('../../modules/editor');
const I18nModule = require('../../modules/i18n');

describe('Unit Tests for Modules', () => {
  it('should initialize CalendarModule correctly', () => {
    const calendar = new CalendarModule();
    expect(calendar).to.be.an('object');
  });

  it('should initialize ChatterboxModule correctly', () => {
    const chatterbox = new ChatterboxModule();
    expect(chatterbox).to.be.an('object');
  });

  it('should initialize WorkModule correctly', () => {
    const work = new WorkModule();
    expect(work).to.be.an('object');
  });

  it('should initialize HypermediaModule correctly', () => {
    const hypermedia = new HypermediaModule();
    expect(hypermedia).to.be.an('object');
  });

  it('should initialize MobileModule correctly', () => {
    const mobile = new MobileModule();
    expect(mobile).to.be.an('object');
  });

  it('should initialize EmailModule correctly', () => {
    const email = new EmailModule();
    expect(email).to.be.an('object');
  });

  it('should initialize LibraryModule correctly', () => {
    const library = new LibraryModule();
    expect(library).to.be.an('object');
  });

  it('should initialize AppStoreModule correctly', () => {
    const appstore = new AppStoreModule();
    expect(appstore).to.be.an('object');
  });

  it('should initialize AIManager correctly', () => {
    const aiManager = new AIManager();
    expect(aiManager).to.be.an('object');
  });

  it('should initialize BackupManager correctly', () => {
    const backupManager = new BackupManager();
    expect(backupManager).to.be.an('object');
  });

  it('should initialize Timeline correctly', () => {
    const timeline = new Timeline();
    expect(timeline).to.be.an('object');
  });

  it('should initialize GitmarkModule correctly', () => {
    const gitmark = new GitmarkModule();
    expect(gitmark).to.be.an('object');
  });

  it('should initialize SettingsModule correctly', () => {
    const settings = new SettingsModule();
    expect(settings).to.be.an('object');
  });

  it('should initialize EditorModule correctly', () => {
    const editor = new EditorModule();
    expect(editor).to.be.an('object');
  });

  it('should initialize I18nModule correctly', () => {
    const i18n = new I18nModule();
    expect(i18n).to.be.an('object');
  });
});
