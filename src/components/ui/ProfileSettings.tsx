import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from './Button';
import { Input } from './Input';
import { PasswordInput } from './PasswordInput';

interface ProfileSettingsProps {
  onClose: () => void;
  settingType: 'password' | 'phone' | 'lunch-period';
}

export function ProfileSettings({ onClose, settingType }: ProfileSettingsProps) {
  const { user, updateUserSettings } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [lunchPeriod, setLunchPeriod] = useState(user?.lunchPeriod || 4);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      switch (settingType) {
        case 'password':
          if (newPassword !== confirmPassword) {
            throw new Error('New passwords do not match');
          }
          if (newPassword.length < 8) {
            throw new Error('Password must be at least 8 characters long');
          }
          await updateUserSettings({ 
            type: 'password',
            currentPassword,
            newPassword
          });
          break;

        case 'phone':
          if (!/^\d{10}$/.test(phoneNumber.replace(/\D/g, ''))) {
            throw new Error('Please enter a valid 10-digit phone number');
          }
          await updateUserSettings({
            type: 'phone',
            phoneNumber
          });
          break;

        case 'lunch-period':
          await updateUserSettings({
            type: 'lunch-period',
            lunchPeriod
          });
          break;
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    switch (settingType) {
      case 'password':
        return (
          <>
            <PasswordInput
              label="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <PasswordInput
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </>
        );

      case 'phone':
        return (
          <Input
            label="Phone Number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        );

      case 'lunch-period':
        return (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Lunch Period
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[4, 5, 6].map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => setLunchPeriod(period)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    lunchPeriod === period
                      ? 'border-[#fd6600] bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="block text-lg font-semibold">Period {period}</span>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  const getTitle = () => {
    switch (settingType) {
      case 'password': return 'Update Password';
      case 'phone': return 'Update Phone Number';
      case 'lunch-period': return 'Update Lunch Period';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold text-[#040084] mb-4">
          {getTitle()}
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderForm()}

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}