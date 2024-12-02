import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../ui/Input';
import { PasswordInput } from '../ui/PasswordInput';
import { Button } from '../ui/Button';

export function LoginForm() {
  const navigate = useNavigate();
  const { login, error: authError } = useAuth();
  const [schoolId, setSchoolId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSchoolIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setSchoolId(value);
    if (/[^0-9]/.test(e.target.value)) {
      setError('Please enter numbers only');
    } else if (e.target.value.length > 5) {
      setError('School ID cannot be more than 5 digits');
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (schoolId.length !== 5) {
      setError('School ID must be 5 digits');
      return;
    }
    setIsLoading(true);
    setError(null);
    
    try {
      await login(schoolId, password);
      navigate('/home');
    } catch (err) {
      if (err instanceof Error && err.message.includes('User not found')) {
        setError("We couldn't find an account with that school ID. Would you like to create one?");
      } else {
        setError('Invalid school ID or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {(error || authError) && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error || authError}</p>
          {error?.includes('create one') && (
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="mt-2 text-[#fd6600] hover:text-[#e4a74b] font-semibold"
            >
              Create an Account
            </button>
          )}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="School ID"
          type="text"
          value={schoolId}
          onChange={handleSchoolIdChange}
          placeholder="Enter your 5-digit school ID"
          pattern="\d{5}"
          maxLength={5}
          disabled={isLoading}
          required
          className="text-lg"
        />

        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          disabled={isLoading}
          required
          className="text-lg"
        />

        <div className="text-center">
          <Link
            to="/forgot-password"
            className="text-[#fd6600] hover:text-[#e4a74b] text-lg"
          >
            Trouble signing in?
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={isLoading}
          className="text-lg"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="text-center pt-4">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-[#fd6600] hover:text-[#e4a74b] font-semibold"
          >
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
}