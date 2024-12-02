export const AUTHORIZED_DRIVERS: DriverInfo[] = [
  { authCode: '413578', fullName: 'Alex Mladenovich' },
  { authCode: '195969', fullName: 'Alex Sachdev' },
  { authCode: '000001', fullName: 'John Doe' },
  { authCode: '000002', fullName: 'Mark Zuckerberg' }
];

interface DriverInfo {
  authCode: string;
  fullName: string;
}

interface StoredDriverAuth {
  authCode: string;
  hashedPassword: string;
  isPasswordSet: boolean;
}

const STORAGE_KEY = 'huskieats_driver_auth';

function getStoredDriverAuths(): StoredDriverAuth[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function setStoredDriverAuths(auths: StoredDriverAuth[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auths));
}

export async function validateDriverAuth(authCode: string): Promise<DriverInfo | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return AUTHORIZED_DRIVERS.find(driver => driver.authCode === authCode) || null;
}

export async function isPasswordSet(authCode: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const auths = getStoredDriverAuths();
  const driverAuth = auths.find(auth => auth.authCode === authCode);
  return Boolean(driverAuth?.isPasswordSet);
}

export async function getDriverPassword(authCode: string): Promise<string | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const auths = getStoredDriverAuths();
  const driverAuth = auths.find(auth => auth.authCode === authCode);
  return driverAuth?.hashedPassword;
}

export async function setDriverPassword(authCode: string, password: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const auths = getStoredDriverAuths();
  const existingIndex = auths.findIndex(auth => auth.authCode === authCode);
  
  if (existingIndex >= 0 && auths[existingIndex].isPasswordSet) {
    throw new Error('Password has already been set and cannot be changed');
  }
  
  const hashedPassword = await hashPassword(password);
  
  if (existingIndex >= 0) {
    auths[existingIndex] = {
      ...auths[existingIndex],
      hashedPassword,
      isPasswordSet: true
    };
  } else {
    auths.push({ 
      authCode, 
      hashedPassword,
      isPasswordSet: true
    });
  }
  
  setStoredDriverAuths(auths);
}

export async function verifyDriverPassword(authCode: string, password: string): Promise<boolean> {
  const storedHash = await getDriverPassword(authCode);
  if (!storedHash) return false;
  return verifyPassword(password, storedHash);
}

// Helper function to get active driver count
export function getActiveDriverCount(): number {
  const auths = getStoredDriverAuths();
  return auths.filter(auth => auth.isPasswordSet).length;
}