import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthNumberInput } from '../components/ui/AuthNumberInput';
import { PasswordInput } from '../components/ui/PasswordInput';
import { Button } from '../components/ui/Button';
import { ExitButton } from '../components/ui/ExitButton';
import { 
  validateDriverAuth, 
  isPasswordSet,
  getDriverPassword, 
  setDriverPassword, 
  verifyDriverPassword 
} from '../lib/driverAuth';

type AuthMode = 'verify' | 'register' | 'login';

export function DriverAuth() {
  const navigate = useNavigate();
  const [authNumber, setAuthNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [driverInfo, setDriverInfo] = useState<{ fullName: string } | null>(null);
  const [mode, setMode] = useState<AuthMode>('verify');

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authNumber.length !== 6) {
      setError('Authentication number must be 6 digits');
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const driver = await validateDriverAuth(authNumber);
      if (driver) {
        setDriverInfo(driver);
        const hasPassword = await isPasswordSet(authNumber);
        setMode(hasPassword ? 'login' : 'register');
      } else {
        setError('Invalid authentication number');
      }
    } catch (err) {
      setError('An error occurred while verifying your authentication number');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter a password');
      return;
    }

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (mode === 'register') {
        await setDriverPassword(authNumber, password);
        navigate('/driver/dashboard');
      } else {
        const isValid = await verifyDriverPassword(authNumber, password);
        if (!isValid) {
          throw new Error('Invalid password');
        }
        navigate('/driver/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      <ExitButton />
      <div className="w-full max-w-md">
        <h2 
          className="text-3xl font-bold text-center mb-8"
          style={{ fontFamily: '"Cocomat Pro", sans-serif' }}
        >
          Driver Authentication
        </h2>

        {mode === 'verify' ? (
          <form onSubmit={handleAuthSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <AuthNumberInput
              label="Authentication Number"
              value={authNumber}
              onChange={(e) => setAuthNumber(e.target.value)}
              placeholder="Enter your 6-digit number"
              required
              className="text-lg"
            />

            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              className="text-lg"
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-xl font-semibold text-[#040084]">Hey {driverInfo?.fullName}!</p>
              <p className="text-gray-600">
                {mode === 'register' 
                  ? 'Please set up your password to continue'
                  : 'Please enter your password to continue'}
              </p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'register' ? 'Create your password' : 'Enter your password'}
              required
              className="text-lg"
            />

            {mode === 'register' && (
              <PasswordInput
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="text-lg"
              />
            )}

            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              className="text-lg"
            >
              {isLoading 
                ? (mode === 'register' ? 'Setting up...' : 'Signing in...') 
                : (mode === 'register' ? 'Complete Setup' : 'Sign in')}
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Sign-in/authentication related questions? Text or call{' '}
              <a href="tel:331-814-9954" className="text-[#fd6600] hover:text-[#e4a74b]">
                331-814-9954
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}