import React from 'react';
import { X } from 'lucide-react';

interface AlertProps {
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  onClose?: () => void;
}

export function Alert({ type, title, message, onClose }: AlertProps) {
  const colors = {
    info: 'bg-blue-50 text-blue-800',
    warning: 'bg-yellow-50 text-yellow-800',
    error: 'bg-red-50 text-red-800',
    success: 'bg-green-50 text-green-800',
  };

  return (
    <div className={`${colors[type]} p-4 rounded-lg mb-6 relative`}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm">{message}</p>
    </div>
  );
}