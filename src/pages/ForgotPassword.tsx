import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ExitButton } from '../components/ui/ExitButton';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const isStudent = email.endsWith('@stu.naperville203.org');
    const isTeacher = email.endsWith('@naperville203.org');
    return isStudent || isTeacher;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Please use your school email (@stu.naperville203.org for students, @naperville203.org for teachers)');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError('An error occurred while sending reset instructions');
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
          Reset Your Password
        </h2>

        {isSubmitted ? (
          <div className="text-center">
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
              If an account exists with that email, you'll receive password reset instructions shortly.
            </div>
            <Button onClick={() => navigate('/login')}>
              Return to Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <Input
              label="School Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.name@stu.naperville203.org"
              disabled={isLoading}
              required
              className="text-lg"
            />

            <Button
              type="submit"
              fullWidth
              loading={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-gray-800"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}