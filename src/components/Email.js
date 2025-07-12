import React, { useState } from 'react';
import Chatterbox from 'chatterbox';
import i18next from 'i18next';

const aiAssistant = new Chatterbox();

const Email = () => {
  const [emails, setEmails] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleRetrieveEmails = () => {
    // Mock email retrieval
    const mockEmails = [
      { from: 'alice@example.com', subject: 'Hello', date: '2025-07-12', body: 'Hi there!' },
      { from: 'bob@example.com', subject: 'Meeting', date: '2025-07-11', body: 'Let’s schedule a meeting.' },
    ];
    setEmails(mockEmails);
  };

  const handleSendEmail = () => {
    if (!recipient || !subject || !body) {
      alert('Please fill in all fields.');
      return;
    }

    alert(`Email sent to ${recipient} with subject: ${subject}`);
    setRecipient('');
    setSubject('');
    setBody('');
  };

  const handleAIResponsePreview = async (emailContent) => {
    try {
      const response = await aiAssistant.processInput(emailContent);
      console.log('AI-generated response:', response);
      alert(i18next.t('aiResponsePreview', { response }));
    } catch (error) {
      console.error('Error generating AI response preview:', error);
      alert(i18next.t('aiResponseError'));
    }
  };

  return (
    <div role="main" aria-labelledby="email-section" className="p-4 border rounded">
      <h1 id="email-section" className="text-2xl font-bold mb-4">Email Management</h1>

      {/* Retrieve Emails Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Inbox</h2>
        <button
          onClick={handleRetrieveEmails}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
        >
          Retrieve Emails
        </button>
        {emails.length === 0 ? (
          <p>No emails retrieved.</p>
        ) : (
          <ul>
            {emails.map((email, index) => (
              <li key={index} className="mb-2">
                <strong>From:</strong> {email.from} <br />
                <strong>Subject:</strong> {email.subject} <br />
                <strong>Date:</strong> {email.date} <br />
                <strong>Body:</strong> {email.body}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Send Email Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Compose Email</h2>
        <input
          type="email"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <button
          onClick={handleSendEmail}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Send Email
        </button>
      </div>

      {/* AI Response Preview Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">AI Response Preview</h2>
        <textarea
          placeholder="Enter email content for AI response"
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <button
          onClick={() => handleAIResponsePreview(body)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Generate AI Response
        </button>
      </div>
    </div>
  );
};

export default Email;
export { previewAIResponse };
