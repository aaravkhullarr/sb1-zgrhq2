import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useOrderStore } from '../stores/orderStore';
import { useDriverStore } from './useDriverStore';
import { restaurants } from '../data/restaurants';
import type { Order } from '../types';

export function useDriverDashboard() {
  const { user } = useAuth();
  const orderStore = useOrderStore();
  const { getSelectionsForDate } = useDriverStore();
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    const selectedRestaurantIds = getSelectionsForDate(today);

    // Filter orders based on status and restaurant selection
    const available = orderStore.orders.filter(order => 
      selectedRestaurantIds.includes(order.restaurantId) && 
      order.status === 'pending'
    );

    const active = orderStore.orders.filter(order =>
      order.driverId === user.id &&
      ['accepted', 'picked_up'].includes(order.status)
    );

    const completed = orderStore.orders.filter(order =>
      order.driverId === user.id &&
      order.status === 'delivered'
    );

    setAvailableOrders(available);
    setActiveOrders(active);
    setCompletedOrders(completed);
  }, [user, orderStore.orders, getSelectionsForDate]);

  const getRestaurantById = (id: number) => {
    return restaurants.find(r => r.id === id);
  };

  return {
    availableOrders,
    activeOrders,
    completedOrders,
    getRestaurantById,
  };
}