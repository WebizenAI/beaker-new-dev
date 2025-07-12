const nodemailer = require('nodemailer');
const imap = require('imap-simple');

class EmailManager {
  constructor() {
    console.log('Email Manager initialized');
  }

  /**
   * Retrieve emails from the inbox.
   * @param {object} config - The IMAP configuration.
   * @returns {Promise<object[]>} - The list of emails.
   */
  async retrieveEmails(config) {
    try {
      const connection = await imap.connect({ imap: config });
      await connection.openBox('INBOX');

      const searchCriteria = ['ALL'];
      const fetchOptions = { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'], struct: true };

      const messages = await connection.search(searchCriteria, fetchOptions);
      const emails = messages.map((message) => {
        const header = message.parts.find((part) => part.which === 'HEADER.FIELDS (FROM TO SUBJECT DATE)');
        const body = message.parts.find((part) => part.which === 'TEXT');

        return {
          from: header.body.from,
          to: header.body.to,
          subject: header.body.subject,
          date: header.body.date,
          body: body.body,
        };
      });

      await connection.end();
      return emails;
    } catch (error) {
      console.error('Failed to retrieve emails:', error);
      return [];
    }
  }

  /**
   * Send an email.
   * @param {object} config - The SMTP configuration.
   * @param {object} email - The email details.
   * @returns {Promise<boolean>} - True if the email is sent successfully.
   */
  async sendEmail(config, email) {
    try {
      const transporter = nodemailer.createTransport(config);
      await transporter.sendMail(email);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }
}

module.exports = new EmailManager();
