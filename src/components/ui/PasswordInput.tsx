import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  showValidation?: boolean;
}

export function PasswordInput({ label, showValidation = true, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShowMessage(true);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-2">
      <label className="block text-gray-700 font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={showPassword ? 'text' : 'password'}
          onInvalid={handleInvalid}
          className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:border-[#fd6600] focus:ring-2 focus:ring-[#fd6600] focus:ring-opacity-50 transition-colors pr-12"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      {showValidation && showMessage && (
        <p className="text-sm text-red-500">Please enter your password</p>
      )}
    </div>
  );
}