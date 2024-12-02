import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';
import { getTomorrowDate } from '../utils/timeUtils';

interface DriverAssignment {
  driverId: string;
  restaurantId: number;
  driverName: string;
  date: string;
}

interface RestaurantAvailabilityStore {
  assignments: DriverAssignment[];
  assignDriver: (driverId: string, restaurantId: number, driverName: string) => void;
  removeDriver: (driverId: string, restaurantId: number) => void;
  getAvailableRestaurants: () => number[];
  getDriversForRestaurant: (restaurantId: number) => string[];
  clearExpiredAssignments: () => void;
}

export const useRestaurantAvailabilityStore = create<RestaurantAvailabilityStore>()(
  persist(
    (set, get) => ({
      assignments: [],

      assignDriver: (driverId, restaurantId, driverName) => {
        const tomorrow = getTomorrowDate();
        
        set(produce((state) => {
          state.assignments.push({
            driverId,
            restaurantId,
            driverName,
            date: tomorrow
          });
        }));
      },

      removeDriver: (driverId, restaurantId) => {
        const tomorrow = getTomorrowDate();
        
        set(produce((state) => {
          state.assignments = state.assignments.filter(
            a => !(a.driverId === driverId && 
                  a.restaurantId === restaurantId && 
                  a.date === tomorrow)
          );
        }));
      },

      getAvailableRestaurants: () => {
        const tomorrow = getTomorrowDate();
        const currentAssignments = get().assignments.filter(a => a.date === tomorrow);
        return [...new Set(currentAssignments.map(a => a.restaurantId))];
      },

      getDriversForRestaurant: (restaurantId) => {
        const tomorrow = getTomorrowDate();
        return get().assignments
          .filter(a => a.restaurantId === restaurantId && a.date === tomorrow)
          .map(a => a.driverName);
      },

      clearExpiredAssignments: () => {
        const today = getTomorrowDate();
        set(produce((state) => {
          state.assignments = state.assignments.filter(a => a.date >= today);
        }));
      },
    }),
    {
      name: 'restaurant-availability'
    }
  )
);