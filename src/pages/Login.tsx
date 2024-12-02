import React from 'react';
import { LoginForm } from '../components/forms/LoginForm';
import { ExitButton } from '../components/ui/ExitButton';

export function Login() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      <ExitButton />
      <div className="w-full max-w-md">
        <h2 
          className="text-3xl font-bold text-center mb-8"
          style={{ fontFamily: '"Cocomat Pro", sans-serif' }}
        >
          Sign In to HuskieEats
        </h2>
        
        <LoginForm />
      </div>
    </div>
  );
}