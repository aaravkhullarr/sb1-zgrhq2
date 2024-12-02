import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AuthNumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  showValidation?: boolean;
}

export function AuthNumberInput({ label, showValidation = true, onChange, ...props }: AuthNumberInputProps) {
  const [showNumber, setShowNumber] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    
    if (/[^0-9]/.test(e.target.value)) {
      setError('Please enter numbers only');
    } else if (e.target.value.length > 6) {
      setError('Authentication number cannot be more than 6 digits');
    } else {
      setError(null);
    }

    // Create a new event with the sanitized value
    const newEvent = {
      ...e,
      target: {
        ...e.target,
        value
      }
    };

    onChange?.(newEvent as React.ChangeEvent<HTMLInputElement>);
  };

  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShowMessage(true);
    if (e.target.value.length === 0) {
      setError('Authentication number is required');
    } else if (e.target.value.length !== 6) {
      setError('Authentication number must be 6 digits');
    }
  };

  const toggleVisibility = () => {
    setShowNumber(!showNumber);
  };

  return (
    <div className="space-y-2">
      <label className="block text-gray-700 font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={showNumber ? 'text' : 'password'}
          pattern="\d{6}"
          maxLength={6}
          onChange={handleChange}
          onInvalid={handleInvalid}
          className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:border-[#fd6600] focus:ring-2 focus:ring-[#fd6600] focus:ring-opacity-50 transition-colors pr-12"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showNumber ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      {showValidation && (error || showMessage) && (
        <p className="text-sm text-red-500">{error || 'Please enter a valid 6-digit authentication number'}</p>
      )}
    </div>
  );
}