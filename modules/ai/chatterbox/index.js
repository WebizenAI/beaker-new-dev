const { exec } = require('child_process');

class ChatterboxManager {
  constructor() {
    console.log('Chatterbox Manager initialized');
  }

  /**
   * Generate transcription using Chatterbox TTS.
   * @param {string} text - The text to transcribe.
   * @param {string} language - The language for transcription.
   * @returns {Promise<string>} - The transcription.
   */
  async generateTranscription(text, language = 'en') {
    return new Promise((resolve, reject) => {
      const command = `chatterbox-cli transcribe --text "${text}" --lang ${language}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error generating transcription: ${stderr}`);
          return reject(error);
        }
        resolve(stdout.trim());
      });
    });
  }

  /**
   * Adjust emotion exaggeration in Chatterbox TTS.
   * @param {string} text - The text to process.
   * @param {number} exaggerationLevel - The level of emotion exaggeration (0-100).
   * @returns {Promise<string>} - The processed text.
   */
  async adjustEmotion(text, exaggerationLevel = 50) {
    return new Promise((resolve, reject) => {
      const command = `chatterbox-cli emotion --text "${text}" --level ${exaggerationLevel}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error adjusting emotion: ${stderr}`);
          return reject(error);
        }
        resolve(stdout.trim());
      });
    });
  }
}

module.exports = new ChatterboxManager();
