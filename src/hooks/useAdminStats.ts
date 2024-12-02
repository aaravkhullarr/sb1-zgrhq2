import { useEffect, useState } from 'react';
import { getStorageData } from '../lib/storage';
import { AUTHORIZED_DRIVERS, getActiveDriverCount } from '../lib/driverAuth';

interface AdminStats {
  totalUsers: number;
  totalDrivers: number;
  activeDrivers: number;
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalDrivers: AUTHORIZED_DRIVERS.length,
    activeDrivers: 0
  });

  useEffect(() => {
    // Update stats whenever localStorage changes
    const updateStats = () => {
      const data = getStorageData();
      const customerCount = data.users.filter(user => user.role === 'customer').length;
      const activeDriversCount = getActiveDriverCount();

      setStats({
        totalUsers: customerCount,
        totalDrivers: AUTHORIZED_DRIVERS.length,
        activeDrivers: activeDriversCount
      });
    };

    // Initial update
    updateStats();

    // Listen for storage changes
    window.addEventListener('storage', updateStats);

    // Custom event for when new users are created
    window.addEventListener('userCreated', updateStats);

    return () => {
      window.removeEventListener('storage', updateStats);
      window.removeEventListener('userCreated', updateStats);
    };
  }, []);

  return stats;
}