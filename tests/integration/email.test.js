const emailManager = require('../../modules/email');

describe('Email Integration Tests', () => {
  test('should retrieve emails successfully', async () => {
    const mockConfig = {
      user: 'test@example.com',
      password: 'password',
      host: 'imap.example.com',
      port: 993,
      tls: true,
    };

    const emails = await emailManager.retrieveEmails(mockConfig);
    expect(emails).toBeDefined();
    expect(emails.length).toBeGreaterThan(0);
  });

  test('should send email successfully', async () => {
    const mockConfig = {
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'test@example.com',
        pass: 'password',
      },
    };

    const email = {
      from: 'test@example.com',
      to: 'recipient@example.com',
      subject: 'Test Email',
      text: 'This is a test email.',
    };

    const result = await emailManager.sendEmail(mockConfig, email);
    expect(result).toBe(true);
  });
});
