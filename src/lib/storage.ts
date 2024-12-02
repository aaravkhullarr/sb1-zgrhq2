import type { User } from '../types';

interface StorageData {
  users: User[];
}

const STORAGE_KEY = 'huskieats_db';

export function getStorageData(): StorageData {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { users: [] };
}

export function setStorageData(data: StorageData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearStorageData(): void {
  localStorage.removeItem(STORAGE_KEY);
}