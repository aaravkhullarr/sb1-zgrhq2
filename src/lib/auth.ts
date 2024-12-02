import type { User } from '../types';
import { getStorageData, setStorageData } from './storage';
import { hashPassword, verifyPassword } from './crypto';

const SESSION_KEY = 'huskieats_session';

// Admin credentials
const ADMIN_USER: User = {
  id: 'admin',
  schoolId: '00000',
  email: 'admin@naperville203.org',
  phoneNumber: '000-000-0000',
  firstName: 'Admin',
  lastName: 'User',
  lunchPeriod: 4,
  role: 'admin',
  password: 'admin123' // This will be hashed during initialization
};

// Initialize admin user if it doesn't exist
export async function initializeAdmin() {
  const data = getStorageData();
  const adminExists = data.users.some(user => user.role === 'admin');
  
  if (!adminExists) {
    const hashedPassword = await hashPassword(ADMIN_USER.password!);
    const adminWithHashedPassword = { ...ADMIN_USER, password: hashedPassword };
    data.users.push(adminWithHashedPassword);
    setStorageData(data);
  }
}

export function setSession(user: Omit<User, 'password'>): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getSession(): User | null {
  const data = sessionStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export async function findUserBySchoolId(schoolId: string): Promise<User | undefined> {
  const { users } = getStorageData();
  return users.find(user => user.schoolId === schoolId);
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const { users } = getStorageData();
  return users.find(user => user.email === email);
}

export async function validateCredentials(schoolId: string, password: string): Promise<User | null> {
  const user = await findUserBySchoolId(schoolId);
  if (!user || !user.password) return null;

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return null;

  const { password: _, ...userWithoutPassword } = user;
  setSession(userWithoutPassword);
  return userWithoutPassword;
}

export async function createUser(userData: Omit<User, 'id'> & { password: string }): Promise<User> {
  const data = getStorageData();
  
  // Check if school ID is already in use
  const existingUserWithSchoolId = await findUserBySchoolId(userData.schoolId);
  if (existingUserWithSchoolId) {
    throw new Error('This school ID is already in use');
  }

  // Check if email is already in use
  const existingUserWithEmail = await findUserByEmail(userData.email);
  if (existingUserWithEmail) {
    throw new Error('This email is already in use');
  }

  const hashedPassword = await hashPassword(userData.password);
  const newUser: User = {
    ...userData,
    id: crypto.randomUUID()
  };

  data.users.push({ ...newUser, password: hashedPassword });
  setStorageData(data);

  // Dispatch event to notify stats update
  window.dispatchEvent(new Event('userCreated'));

  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}