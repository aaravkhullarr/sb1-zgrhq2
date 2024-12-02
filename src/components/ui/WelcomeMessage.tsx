import React from 'react';
import { AlertCircle } from 'lucide-react';

interface WelcomeMessageProps {
  onClose: () => void;
}

export function WelcomeMessage({ onClose }: WelcomeMessageProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <span className="sr-only">Close</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-[#fd6600] flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-[#040084] mb-2">
              Welcome to huskieats!
            </h3>
            <p className="text-sm text-gray-600">
              Browse restaurants, place your order, and get it delivered right to your lunch period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}