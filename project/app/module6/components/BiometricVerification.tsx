'use client';

import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { CameraIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const BiometricVerification = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'error' | null>(null);
  const [verificationMessage, setVerificationMessage] = useState<string>('');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const resetVerification = () => {
    setVerificationStatus(null);
    setVerificationMessage('');
    setCapturedImage(null);
    setIsVerifying(false);
  };

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      setIsVerifying(true);
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);

      // Simulate verification process
      setTimeout(() => {
        const success = Math.random() > 0.3; // 70% success rate for demo
        setVerificationStatus(success ? 'success' : 'error');
        setVerificationMessage(
          success
            ? 'Identity verified successfully'
            : 'Verification failed. Please ensure proper lighting and face positioning.'
        );
        setIsVerifying(false);
      }, 2000);
    }
  }, [webcamRef]);

  return (
    <div className="glass-card rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Biometric Verification</h2>
        <div className="flex items-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${isVerifying ? 'bg-yellow-400 animate-pulse' : 'bg-emerald-400'}`}></div>
          <span className="text-sm text-gray-600">{isVerifying ? 'Processing' : 'Ready'}</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-2xl aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
          {!capturedImage ? (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
            />
          ) : (
            <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
          )}
          
          {isVerifying && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
                <p className="text-lg font-medium">Verifying identity...</p>
              </div>
            </div>
          )}

          {verificationStatus && (
            <div className={`absolute inset-0 ${
              verificationStatus === 'success' ? 'bg-emerald-500' : 'bg-red-500'
            } bg-opacity-20 flex items-center justify-center`}>
              {verificationStatus === 'success' ? (
                <CheckCircleIcon className="h-20 w-20 text-emerald-500" />
              ) : (
                <XCircleIcon className="h-20 w-20 text-red-500" />
              )}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          {!verificationStatus ? (
            <button
              onClick={captureImage}
              disabled={isVerifying}
              className={`inline-flex items-center px-8 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                isVerifying
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:transform hover:-translate-y-1'
              }`}
            >
              <CameraIcon className="h-5 w-5 mr-2" />
              {isVerifying ? 'Verifying...' : 'Verify Identity'}
            </button>
          ) : (
            <button
              onClick={resetVerification}
              className="inline-flex items-center px-8 py-3 rounded-lg text-white font-semibold bg-gray-600 hover:bg-gray-700 transition-all duration-300"
            >
              Try Again
            </button>
          )}

          {verificationMessage && (
            <p className={`mt-4 text-lg font-medium ${
              verificationStatus === 'success' ? 'text-emerald-600' : 'text-red-600'
            } animate-fade-in`}>
              {verificationMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiometricVerification;