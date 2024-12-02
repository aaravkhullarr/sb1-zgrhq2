import React from 'react';
import { Package } from 'lucide-react';
import { OrderCard } from './OrderCard';
import { useDriverDashboard } from '../../../hooks/useDriverDashboard';
import type { Order } from '../../../types';

interface OrderListProps {
  orders: Order[];
  filter: 'available' | 'active' | 'completed';
}

export function OrderList({ orders, filter }: OrderListProps) {
  const { getRestaurantById } = useDriverDashboard();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <Package className="w-12 h-12 mb-4" />
        <p className="text-lg font-medium">
          {filter === 'available' 
            ? 'No available orders at the moment'
            : filter === 'active'
            ? 'No active orders'
            : 'No completed orders yet'}
        </p>
        <p className="text-sm">
          {filter === 'available' 
            ? 'Check back soon for new orders'
            : filter === 'active'
            ? 'Accept orders to see them here'
            : 'Orders you complete will appear here'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map(order => {
        const restaurant = getRestaurantById(order.restaurantId);
        if (!restaurant) return null;
        
        return (
          <OrderCard 
            key={order.id} 
            order={order}
            restaurant={restaurant}
          />
        );
      })}
    </div>
  );
}