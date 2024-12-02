import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Order, OrderStats } from '../types';

interface OrderContextType {
  orders: Order[];
  stats: OrderStats;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  getOrdersByCustomerId: (customerId: string) => Order[];
  getOrdersByDriverId: (driverId: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats>({
    totalOrders: 0,
    favoriteRestaurant: '',
    averageDeliveryTime: '',
    mostOrderedFrom: '',
    recentOrders: []
  });

  const addOrder = useCallback(async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setOrders(prev => [...prev, newOrder]);
    setStats(prev => ({
      ...prev,
      totalOrders: prev.totalOrders + 1,
      recentOrders: [newOrder, ...prev.recentOrders].slice(0, 5)
    }));

    return newOrder;
  }, []);

  const updateOrderStatus = useCallback(async (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    ));
  }, []);

  const getOrdersByCustomerId = useCallback((customerId: string) => {
    return orders.filter(order => order.customerId === customerId);
  }, [orders]);

  const getOrdersByDriverId = useCallback((driverId: string) => {
    return orders.filter(order => order.driverId === driverId);
  }, [orders]);

  return (
    <OrderContext.Provider value={{
      orders,
      stats,
      addOrder,
      updateOrderStatus,
      getOrdersByCustomerId,
      getOrdersByDriverId
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}