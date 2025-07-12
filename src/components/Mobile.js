import React, { useState, useEffect } from 'react';
import { mobileManager } from '../../modules/mobile';

const Mobile = () => {
  const [incomingCall, setIncomingCall] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);

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

  const getStatusColor = () => {
    if (!verificationStatus) return 'text-gray-500';
    if (verificationStatus.details === 'Verifying...') return 'text-blue-500';
    return verificationStatus.verified ? 'text-green-600' : 'text-red-600';
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
        </div>
      </div>
    </div>
  );
};

export default Mobile;