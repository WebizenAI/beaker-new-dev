const chatterboxManager = require('../../modules/ai/chatterbox');

describe('Chatterbox TTS Integration Tests', () => {
  test('should generate transcription for text', async () => {
    const text = 'Hello, world!';
    const language = 'en';

    const transcription = await chatterboxManager.generateTranscription(text, language);
    expect(transcription).toBeDefined();
    expect(transcription).toContain('Hello, world!');
  });

  test('should adjust emotion exaggeration for text', async () => {
    const text = 'I am very happy!';
    const exaggerationLevel = 75;

    const processedText = await chatterboxManager.adjustEmotion(text, exaggerationLevel);
    expect(processedText).toBeDefined();
    expect(processedText).toContain('I am very happy!');
  });
});
