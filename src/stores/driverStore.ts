import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';
import { format, addDays, isBefore, endOfDay } from 'date-fns';
import { useRestaurantAvailabilityStore } from './restaurantAvailabilityStore';

interface DriverSelection {
  restaurantId: number;
  date: string;
}

interface DriverStore {
  selections: DriverSelection[];
  earnings: {
    today: number;
    total: number;
  };
  addSelection: (restaurantId: number) => void;
  removeSelection: (restaurantId: number) => void;
  getSelectionsForDate: (date: string) => number[];
  addEarnings: (amount: number) => void;
  clearExpiredSelections: () => void;
}

export const useDriverStore = create<DriverStore>()(
  persist(
    (set, get) => ({
      selections: [],
      earnings: {
        today: 0,
        total: 0
      },

      addSelection: (restaurantId) => {
        const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
        
        set(produce((state) => {
          // Add new selection if it doesn't exist
          const exists = state.selections.some(
            s => s.restaurantId === restaurantId && s.date === tomorrow
          );
          
          if (!exists) {
            state.selections.push({
              restaurantId,
              date: tomorrow
            });
          }
        }));
      },

      removeSelection: (restaurantId) => {
        const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
        
        if (isBefore(new Date(), endOfDay(new Date()))) {
          set(produce((state) => {
            state.selections = state.selections.filter(
              s => !(s.restaurantId === restaurantId && s.date === tomorrow)
            );
          }));
        }
      },

      getSelectionsForDate: (date) => {
        return get().selections
          .filter(s => s.date === date)
          .map(s => s.restaurantId);
      },

      addEarnings: (amount) => {
        set(produce((state) => {
          state.earnings.today += amount;
          state.earnings.total += amount;
        }));
      },

      clearExpiredSelections: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        set(produce((state) => {
          state.selections = state.selections.filter(s => s.date >= today);
        }));
      }
    }),
    {
      name: 'driver-store'
    }
  )
);

// Auto-clear expired selections at midnight
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
    useDriverStore.getState().clearExpiredSelections();
    clearAtMidnight(); // Set up next day's clear
  }, msToMidnight);
};

clearAtMidnight();