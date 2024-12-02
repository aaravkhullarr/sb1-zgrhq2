import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../ui/Input';
import { PasswordInput } from '../ui/PasswordInput';
import { Button } from '../ui/Button';

export function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [formData, setFormData] = useState({
    schoolId: '',
    email: '',
    phoneNumber: '',
    password: '',
    firstName: '',
    lastName: '',
    lunchPeriod: '4',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'schoolId') {
      const numericValue = value.replace(/\D/g, '').slice(0, 5);
      if (value !== numericValue) {
        setError('Please enter numbers only for School ID');
      } else if (value.length > 5) {
        setError('School ID cannot be more than 5 digits');
      } else {
        setError(null);
      }
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else if (name === 'email') {
      const isStudent = value.endsWith('@stu.naperville203.org');
      const isTeacher = value.endsWith('@naperville203.org');
      
      if (!isStudent && !isTeacher) {
        setError('Please use your school email (@stu.naperville203.org for students, @naperville203.org for teachers)');
      } else {
        setError(null);
      }
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValidEmail = formData.email.endsWith('@stu.naperville203.org') || 
                        formData.email.endsWith('@naperville203.org');
                        
    if (!isValidEmail) {
      setError('Please use your school email (@stu.naperville203.org for students, @naperville203.org for teachers)');
      return;
    }
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.schoolId.length !== 5) {
      setError('School ID must be 5 digits');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      await register(formData);
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          className="text-lg"
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          className="text-lg"
          required
        />
      </div>

      <Input
        label="School ID"
        name="schoolId"
        value={formData.schoolId}
        onChange={handleChange}
        placeholder="Enter your 5-digit school ID"
        pattern="\d{5}"
        maxLength={5}
        className="text-lg"
        required
      />

      <Input
        label="School Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="your.name@stu.naperville203.org"
        className="text-lg"
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Enter your phone number"
        className="text-lg"
        required
      />

      <div className="space-y-2">
        <label className="block text-gray-700 font-medium">
          Lunch Period
        </label>
        <select
          name="lunchPeriod"
          value={formData.lunchPeriod}
          onChange={handleChange}
          className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:border-[#fd6600] focus:ring-2 focus:ring-[#fd6600] focus:ring-opacity-50 transition-colors"
          required
        >
          {[4, 5, 6].map(period => (
            <option key={period} value={period}>Period {period}</option>
          ))}
        </select>
      </div>

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a password"
        className="text-lg"
        required
        autoComplete="new-password"
      />

      <PasswordInput
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        className="text-lg"
        required
        autoComplete="new-password"
      />

      <Button
        type="submit"
        fullWidth
        loading={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
}