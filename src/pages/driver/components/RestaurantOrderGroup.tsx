import React from 'react';
import { Order } from '../../../types';
import { Restaurant } from '../../../data/restaurants';
import { OrderCard } from './OrderCard';

interface RestaurantOrderGroupProps {
  restaurant: Restaurant;
  orders: Order[];
}

export function RestaurantOrderGroup({ restaurant, orders }: RestaurantOrderGroupProps) {
  if (orders.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {/* Restaurant Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src={restaurant.logo}
            alt={`${restaurant.name} logo`}
            className="w-12 h-12 object-contain"
          />
          <div>
            <h3 className="font-semibold text-lg">{restaurant.name}</h3>
            <p className="text-sm text-gray-600">{orders.length} orders</p>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="divide-y divide-gray-200">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}