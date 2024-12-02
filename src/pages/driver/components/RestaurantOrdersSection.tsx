import React from 'react';
import { OrderCard } from './OrderCard';
import type { Order } from '../../../types';
import type { Restaurant } from '../../../data/restaurants';

interface RestaurantOrdersSectionProps {
  restaurant: Restaurant;
  orders: Order[];
}

export function RestaurantOrdersSection({ restaurant, orders }: RestaurantOrdersSectionProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <img
            src={restaurant.logo}
            alt={restaurant.name}
            className="w-12 h-12 object-contain mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold">{restaurant.name}</h2>
            <p className="text-sm text-gray-600">{restaurant.address}</p>
          </div>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
          No orders for this restaurant yet
        </div>
      )}
    </div>
  );
}