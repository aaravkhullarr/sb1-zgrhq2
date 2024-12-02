import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showValidation?: boolean;
}

export function Input({ label, showValidation = true, ...props }: InputProps) {
  const [showMessage, setShowMessage] = useState(false);
  const isSchoolId = props.name === 'schoolId';

  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShowMessage(true);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setShowMessage(false);
    if (isSchoolId) {
      const input = e.currentTarget;
      if (input.value.length > 5) {
        input.value = input.value.slice(0, 5);
        setShowMessage(true);
      }
      if (/[^0-9]/.test(input.value)) {
        input.value = input.value.replace(/[^0-9]/g, '');
        setShowMessage(true);
      }
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-gray-700 font-medium">
        {label}
      </label>
      <input
        {...props}
        onInvalid={handleInvalid}
        onInput={handleInput}
        className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:border-[#fd6600] focus:ring-2 focus:ring-[#fd6600] focus:ring-opacity-50 transition-colors"
      />
      {showValidation && showMessage && isSchoolId && (
        <p className="validation-message">
          Please enter a 5-digit school ID using numbers only
        </p>
      )}
    </div>
  );
}