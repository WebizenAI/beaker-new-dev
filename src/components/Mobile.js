import React, { useState, useEffect } from 'react';
import { mobileManager } from '../../modules/mobile';
import Toast from 'react-native-toast-message';
import i18next from 'i18next';
import Chatterbox from 'chatterbox';

const aiAssistant = new Chatterbox();

const Mobile = () => {
  const [incomingCall, setIncomingCall] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [domain, setDomain] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [smsStatus, setSmsStatus] = useState('');
  const [callRecordingStatus, setCallRecordingStatus] = useState('');

  // Simulate an incoming call for demonstration purposes
  const simulateCall = (callerId) => {
    setIncomingCall({ callerId });
    setVerificationStatus({ verified: false, details: 'Verifying...' });
    mobileManager.verifyCall(callerId).then(status => {
      setVerificationStatus(status);
    });
  };

  useEffect(() => {
    // Example calls to demonstrate functionality
    // In a real app, this would be triggered by WebRTC events
    const timer1 = setTimeout(() => simulateCall('example.com'), 2000); // A known, verifiable domain
    const timer2 = setTimeout(() => simulateCall('unverified-caller.net'), 8000); // A domain without an ADP record
    const timer3 = setTimeout(() => simulateCall('1-800-555-1234'), 14000); // A phone number

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (verificationStatus && !verificationStatus.verified) {
      notifyCallVerificationFailure(incomingCall?.callerId);
    }
  }, [verificationStatus]);

  const getStatusColor = () => {
    if (!verificationStatus) return 'text-gray-500';
    if (verificationStatus.details === 'Verifying...') return 'text-blue-500';
    return verificationStatus.verified ? 'text-green-600' : 'text-red-600';
  };

  const handleSendSMS = () => {
    // Logic to send SMS
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    setSmsStatus('SMS sent successfully');
    // Reset fields after sending
    setPhoneNumber('');
    setMessage('');
  };

  const handleRecordCall = () => {
    // Logic to record call
    console.log(`Recording call for domain: ${domain}`);
    setCallRecordingStatus('Call recorded successfully');
  };

  const handleVerifyCall = () => {
    // Logic to verify call
    console.log(`Verifying call for domain: ${domain}`);
    mobileManager.verifyCall(domain).then(status => {
      setVerificationStatus(status);
    });
  };

  /**
   * Show a multi-lingual notification for call verification failure.
   * @param {string} callerId - The caller's identifier.
   * @param {object} [options] - Optional notification style overrides.
   */
  const notifyCallVerificationFailure = (callerId, options = {}) => {
    const message = i18next.t('callVerificationFailure', { callerId });
    Toast.show({
      type: options.type || 'error',
      text1: options.text1 || i18next.t('notificationTitle'),
      text2: options.text2 || message,
      position: options.position || 'bottom',
      ...options
    });
  };

  const handleVoiceInputForAI = async (voiceInput) => {
    try {
      const response = await aiAssistant.processInput(voiceInput);
      console.log('AI Assistant response:', response);
      Toast.show({
        type: 'success',
        text1: i18next.t('aiAssistantResponseTitle'),
        text2: response,
        position: 'bottom',
      });
    } catch (error) {
      console.error('Error processing voice input for AI assistant:', error);
      Toast.show({
        type: 'error',
        text1: i18next.t('aiAssistantErrorTitle'),
        text2: i18next.t('aiAssistantErrorMessage'),
        position: 'bottom',
      });
    }
  };

  return (
    <div role="region" aria-labelledby="mobile-heading" className="p-4">
      <h2 id="mobile-heading" className="text-2xl font-bold mb-4">Mobile Interface</h2>
      
      <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Incoming Call</div>
          
          {incomingCall ? (
            <>
              <p className="block mt-1 text-lg leading-tight font-medium text-black">{incomingCall.callerId}</p>
              {verificationStatus && (
                <div 
                  role="alert" 
                  aria-live="assertive" 
                  className={`mt-2 p-3 rounded-lg ${verificationStatus.verified ? 'bg-green-100' : 'bg-red-100'}`}
                >
                  <p className={`font-bold ${getStatusColor()}`}>
                    {verificationStatus.verified ? '✓ Verified Caller' : '✗ Unverified Caller'}
                  </p>
                  <p className={`text-sm ${getStatusColor()}`}>{verificationStatus.details}</p>
                  {!verificationStatus.verified && verificationStatus.details.includes('ADP/WebID') && (
                     <p className="text-xs text-yellow-700 mt-1">
                       Warning: This caller could be spoofing their identity. Proceed with caution.
                     </p>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="mt-2 text-gray-500">Waiting for call...</p>
          )}

          <div className="mt-6 flex justify-around">
            <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75">
              Decline
            </button>
            <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
              Accept
            </button>
          </div>

          {/* SMS Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Send SMS</h2>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            ></textarea>
            <button
              onClick={handleSendSMS}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send SMS
            </button>
            {smsStatus && <p className="mt-2">{smsStatus}</p>}
          </div>

          {/* Call Recording Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Call Recording</h2>
            <button
              onClick={handleRecordCall}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Record Call
            </button>
            {callRecordingStatus && <p className="mt-2">{callRecordingStatus}</p>}
          </div>

          {/* Chat Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Chat</h2>
            <textarea
              placeholder="Type your message..."
              className="w-full p-2 border rounded mb-2"
            ></textarea>
            <button
              onClick={() => setChatMessages([...chatMessages, 'New message'])}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send Message
            </button>
          </div>

          {/* Call Verification Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Verify Call</h2>
            <input
              type="text"
              placeholder="Domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleVerifyCall}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Verify Call
            </button>
          </div>

          {/* Voice Input for AI Assistant Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Voice Input for AI Assistant</h2>
            <button
              onClick={() => handleVoiceInputForAI('Example voice input')}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Use Voice Input
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
export { notifyCallVerificationFailure, enableVoiceInputForAI };