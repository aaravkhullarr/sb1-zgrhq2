import { useAuth } from './useAuth';

export function useAdminAuth() {
  const { user } = useAuth();
  
  const isAdmin = user?.role === 'admin';
  
  // Admin credentials - in production, these should be stored securely
  const ADMIN_CREDENTIALS = {
    schoolId: '00000',
    password: 'admin123'  // This should be properly hashed in production
  };
  
  return {
    isAdmin,
    ADMIN_CREDENTIALS
  };
}