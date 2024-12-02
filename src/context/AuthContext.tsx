import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { validateCredentials, createUser, getSession, clearSession } from '../lib/auth';
import { getStorageData, setStorageData } from '../lib/storage';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (schoolId: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  error: string | null;
  showWelcomeMessage: boolean;
  setShowWelcomeMessage: (show: boolean) => void;
  updateProfilePicture: (pictureData: string) => Promise<void>;
  updateUserSettings: (settings: {
    type: 'password' | 'phone' | 'lunch-period';
    currentPassword?: string;
    newPassword?: string;
    phoneNumber?: string;
    lunchPeriod?: number;
  }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  useEffect(() => {
    const sessionUser = getSession();
    if (sessionUser) {
      setUser(sessionUser);
    }
  }, []);

  const updateProfilePicture = useCallback(async (pictureData: string) => {
    if (!user) return;

    const data = getStorageData();
    const updatedUsers = data.users.map(u => 
      u.id === user.id ? { ...u, profilePicture: pictureData } : u
    );
    setStorageData({ ...data, users: updatedUsers });

    const updatedUser = { ...user, profilePicture: pictureData };
    sessionStorage.setItem('huskieats_session', JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, [user]);

  const updateUserSettings = useCallback(async (settings: {
    type: 'password' | 'phone' | 'lunch-period';
    currentPassword?: string;
    newPassword?: string;
    phoneNumber?: string;
    lunchPeriod?: number;
  }) => {
    if (!user) throw new Error('No user logged in');

    const data = getStorageData();
    const userIndex = data.users.findIndex(u => u.id === user.id);
    if (userIndex === -1) throw new Error('User not found');

    let updatedUser = { ...data.users[userIndex] };

    switch (settings.type) {
      case 'lunch-period':
        if (settings.lunchPeriod) {
          updatedUser = { ...updatedUser, lunchPeriod: settings.lunchPeriod };
        }
        break;

      case 'phone':
        if (settings.phoneNumber) {
          updatedUser = { ...updatedUser, phoneNumber: settings.phoneNumber };
        }
        break;

      case 'password':
        // Password update logic here
        break;
    }

    // Update storage
    data.users[userIndex] = updatedUser;
    setStorageData(data);

    // Update session
    const { password: _, ...userWithoutPassword } = updatedUser;
    sessionStorage.setItem('huskieats_session', JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
  }, [user]);

  const login = useCallback(async (schoolId: string, password: string) => {
    try {
      const validatedUser = await validateCredentials(schoolId, password);
      if (!validatedUser) {
        throw new Error('Invalid credentials');
      }
      setUser(validatedUser);
      setError(null);
      setShowWelcomeMessage(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }, []);

  const register = useCallback(async (userData: Omit<User, 'id'> & { password: string }) => {
    try {
      const newUser = await createUser(userData);
      setError(null);
      // Don't set user or show welcome message - redirect to login instead
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      error,
      showWelcomeMessage,
      setShowWelcomeMessage,
      updateProfilePicture,
      updateUserSettings
    }}>
      {children}
    </AuthContext.Provider>
  );
}