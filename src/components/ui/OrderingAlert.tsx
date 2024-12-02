import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface OrderingAlertProps {
  onClose: () => void;
}

export function OrderingAlert({ onClose }: OrderingAlertProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-[#fd6600] flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-[#040084] mb-2">
              Order Early for Higher Priority!
            </h3>
            <p className="text-sm text-gray-600">
              Drivers select their restaurants after 2:00 PM the day before. Order early to ensure you get your preferred restaurant choice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}