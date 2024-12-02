import { useEffect } from 'react';
import { useRestaurantAvailabilityStore } from '../stores/restaurantAvailabilityStore';

export function useRestaurantAvailability() {
  const store = useRestaurantAvailabilityStore();

  useEffect(() => {
    // Clear expired assignments at midnight
    const clearAtMidnight = () => {
      const now = new Date();
      const night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0
      );
      const msToMidnight = night.getTime() - now.getTime();

      setTimeout(() => {
        store.clearExpiredAssignments();
        clearAtMidnight(); // Set up next day's clear
      }, msToMidnight);
    };

    clearAtMidnight();
  }, [store]);

  return {
    availableRestaurants: store.getAvailableRestaurants(),
    getDriversForRestaurant: store.getDriversForRestaurant,
    assignDriver: store.assignDriver,
    removeDriver: store.removeDriver,
  };
}