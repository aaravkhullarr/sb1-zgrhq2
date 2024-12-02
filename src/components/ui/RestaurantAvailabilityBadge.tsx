import React from 'react';
import { useRestaurantAvailabilityStore } from '../../stores/restaurantAvailabilityStore';
import { Lock } from 'lucide-react';

interface RestaurantAvailabilityBadgeProps {
  restaurantId: number;
}

export function RestaurantAvailabilityBadge({ restaurantId }: RestaurantAvailabilityBadgeProps) {
  const drivers = useRestaurantAvailabilityStore(state => state.getDriversForRestaurant(restaurantId));
  const isAvailable = drivers.length > 0;

  if (!isAvailable) {
    return (
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
        <Lock className="w-3 h-3" />
        <span className="text-xs font-medium">Locked</span>
      </div>
    );
  }

  return (
    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
      {drivers.length} {drivers.length === 1 ? 'Driver' : 'Drivers'} Available
    </span>
  );
}