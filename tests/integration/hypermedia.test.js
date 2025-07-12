const hypermediaManager = require('../../modules/hypermedia');

describe('Hypermedia Integration Tests', () => {
  test('should process media file and generate metadata', () => {
    const filePath = 'test_media.mp4';

    const mockExistsSync = jest.spyOn(require('fs'), 'existsSync').mockReturnValue(true);
    const mockStatSync = jest.spyOn(require('fs'), 'statSync').mockReturnValue({ size: 1024 });

    const metadata = hypermediaManager.processMediaFile(filePath);
    expect(metadata).toBeDefined();
    expect(metadata.fileName).toBe('test_media.mp4');
    expect(metadata.size).toBe(1024);

    mockExistsSync.mockRestore();
    mockStatSync.mockRestore();
  });

  test('should generate transcription for media file', () => {
    const filePath = 'test_media.mp4';

    const mockExistsSync = jest.spyOn(require('fs'), 'existsSync').mockReturnValue(true);

    const transcription = hypermediaManager.generateTranscription(filePath, 'en');
    expect(transcription).toBeDefined();
    expect(transcription).toContain('Transcription for test_media.mp4 in en');

    mockExistsSync.mockRestore();
  });

  test('should create SPARQL-MM metadata for media file', () => {
    const filePath = 'test_media.mp4';

    const mockExistsSync = jest.spyOn(require('fs'), 'existsSync').mockReturnValue(true);

    const sparqlMetadata = hypermediaManager.createSparqlMetadata(filePath);
    expect(sparqlMetadata).toBeDefined();
    expect(sparqlMetadata).toContain('SPARQL-MM metadata for test_media.mp4');

    mockExistsSync.mockRestore();
  });
});
