import { useDriverStore as useStore } from '../stores/driverStore';
import { useEffect } from 'react';
import { useRestaurantAvailabilityStore } from '../stores/restaurantAvailabilityStore';
import { useAuth } from './useAuth';

export function useDriverStore() {
  const store = useStore();
  const { user } = useAuth();
  const { assignDriver, removeDriver } = useRestaurantAvailabilityStore();

  useEffect(() => {
    if (!user) return;

    // Sync driver selections with restaurant availability
    const unsubscribe = useStore.subscribe((state, prevState) => {
      const prevSelections = prevState.selections;
      const newSelections = state.selections;

      // Handle added selections
      newSelections.forEach(selection => {
        const wasSelected = prevSelections.some(
          prev => prev.restaurantId === selection.restaurantId && 
                 prev.date === selection.date
        );
        
        if (!wasSelected) {
          assignDriver(
            user.id,
            selection.restaurantId,
            `${user.firstName} ${user.lastName}`
          );
        }
      });

      // Handle removed selections
      prevSelections.forEach(selection => {
        const isStillSelected = newSelections.some(
          curr => curr.restaurantId === selection.restaurantId &&
                 curr.date === selection.date
        );
        
        if (!isStillSelected) {
          removeDriver(user.id, selection.restaurantId);
        }
      });
    });

    return () => unsubscribe();
  }, [user, assignDriver, removeDriver]);

  return store;
}