import React from 'react';
import { RegisterForm } from '../components/forms/RegisterForm';
import { ExitButton } from '../components/ui/ExitButton';

export function Register() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8">
      <ExitButton />
      <div className="w-full max-w-2xl">
        <h2 
          className="text-3xl font-bold text-center mb-8"
          style={{ fontFamily: '"Cocomat Pro", sans-serif' }}
        >
          Create Your Account
        </h2>
        
        <RegisterForm />
      </div>
    </div>
  );
}