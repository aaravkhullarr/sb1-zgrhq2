import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from 'date-fns';
import type { Order, OrderNotification } from '../types';

interface OrderStore {
  orders: Order[];
  addOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'notifications'>) => Order;
  updateOrderStatus: (orderId: string, newStatus: Order['status'], driverName: string) => void;
  assignDriver: (orderId: string, driverId: string, driverInfo: { profilePicture?: string }) => void;
  addNotification: (orderId: string, type: OrderNotification['type']) => void;
  markNotificationAsRead: (orderId: string, notificationId: string) => void;
  getOrdersByCustomerId: (customerId: string) => Order[];
  getOrdersByDriverId: (driverId: string) => Order[];
  getOrdersByRestaurantId: (restaurantId: number) => Order[];
  getPendingOrdersForRestaurant: (restaurantId: number) => Order[];
  cancelOrder: (orderId: string) => void;
  getUnreadNotificationsCount: (userId: string) => number;
  getDriverInfo: (driverId: string | undefined) => { name: string; phone: string; profilePicture?: string } | null;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          notifications: [],
        };

        set(state => ({
          orders: [...state.orders, newOrder]
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, newStatus, driverName) => {
        set(state => ({
          orders: state.orders.map(order =>
            order.id === orderId
              ? {
                  ...order,
                  status: newStatus,
                  updatedAt: new Date().toISOString(),
                  notifications: [
                    ...order.notifications,
                    {
                      id: crypto.randomUUID(),
                      orderId,
                      type: 'status_update',
                      message: getStatusMessage(newStatus, order.lunchPeriod, driverName),
                      createdAt: new Date().toISOString(),
                      isRead: false,
                      restaurantId: order.restaurantId
                    }
                  ]
                }
              : order
          )
        }));
      },

      assignDriver: (orderId, driverId, driverInfo) => {
        set(state => ({
          orders: state.orders.map(order =>
            order.id === orderId
              ? {
                  ...order,
                  driverId,
                  driverName: 'John Doe',
                  driverPhone: '331-814-9954',
                  driverProfilePicture: driverInfo.profilePicture,
                  status: 'accepted',
                  updatedAt: new Date().toISOString(),
                  notifications: [
                    ...order.notifications,
                    {
                      id: crypto.randomUUID(),
                      orderId,
                      type: 'driver_assigned',
                      message: `John Doe has accepted your order for Period ${order.lunchPeriod} (${format(new Date(), 'MMMM do')})`,
                      createdAt: new Date().toISOString(),
                      isRead: false,
                      restaurantId: order.restaurantId
                    }
                  ]
                }
              : order
          )
        }));
      },

      addNotification: (orderId, type) => {
        const order = get().orders.find(o => o.id === orderId);
        if (!order) return;

        const notification: OrderNotification = {
          id: crypto.randomUUID(),
          orderId,
          type,
          message: getNotificationMessage(type, order.lunchPeriod),
          createdAt: new Date().toISOString(),
          isRead: false,
          restaurantId: order.restaurantId
        };

        set(state => ({
          orders: state.orders.map(order =>
            order.id === orderId
              ? {
                  ...order,
                  notifications: [...order.notifications, notification]
                }
              : order
          )
        }));
      },

      markNotificationAsRead: (orderId, notificationId) => {
        set(state => ({
          orders: state.orders.map(order =>
            order.id === orderId
              ? {
                  ...order,
                  notifications: order.notifications.map(notif =>
                    notif.id === notificationId
                      ? { ...notif, isRead: true }
                      : notif
                  )
                }
              : order
          )
        }));
      },

      getOrdersByCustomerId: (customerId) => {
        return get().orders.filter(order => order.customerId === customerId);
      },

      getOrdersByDriverId: (driverId) => {
        return get().orders.filter(order => order.driverId === driverId);
      },

      getOrdersByRestaurantId: (restaurantId) => {
        return get().orders.filter(order => order.restaurantId === restaurantId);
      },

      getPendingOrdersForRestaurant: (restaurantId) => {
        return get().orders.filter(order => 
          order.restaurantId === restaurantId && 
          order.status === 'pending'
        );
      },

      cancelOrder: (orderId) => {
        set(state => ({
          orders: state.orders.map(order =>
            order.id === orderId
              ? {
                  ...order,
                  status: 'cancelled',
                  updatedAt: new Date().toISOString()
                }
              : order
          )
        }));
      },

      getUnreadNotificationsCount: (userId) => {
        return get().orders
          .filter(order => order.customerId === userId)
          .reduce((count, order) => {
            return count + order.notifications.filter(n => !n.isRead).length;
          }, 0);
      },

      getDriverInfo: (driverId) => {
        if (!driverId) return null;
        
        return {
          name: 'John Doe',
          phone: '331-814-9954',
          profilePicture: undefined
        };
      }
    }),
    {
      name: 'order-store',
      version: 1
    }
  )
);

function getStatusMessage(status: Order['status'], period: number, driverName: string): string {
  const dateStr = format(new Date(), 'MMMM do');
  switch (status) {
    case 'on_the_way_there':
      return `${driverName} is on the way to the restaurant for Period ${period} (${dateStr})`;
    case 'at_restaurant':
      return `${driverName} has arrived at the restaurant for Period ${period} (${dateStr})`;
    case 'on_way_back':
      return `${driverName} is on the way back with your Period ${period} (${dateStr}) order`;
    case 'at_npac':
      return `${driverName} has arrived at NPAC with your Period ${period} (${dateStr}) order`;
    case 'delivered':
      return `${driverName} has delivered your Period ${period} (${dateStr}) order`;
    default:
      return `Order status updated for Period ${period} (${dateStr})`;
  }
}

function getNotificationMessage(type: OrderNotification['type'], period: number): string {
  const dateStr = format(new Date(), 'MMMM do');
  switch (type) {
    case 'new_order':
      return `New order received for Period ${period} (${dateStr})`;
    case 'status_update':
      return `Your order status has been updated for Period ${period} (${dateStr})`;
    case 'driver_assigned':
      return `A driver has been assigned to your Period ${period} (${dateStr}) order`;
    case 'order_cancelled':
      return `Your order for Period ${period} (${dateStr}) has been cancelled`;
    case 'order_delivered':
      return `Your order for Period ${period} (${dateStr}) has been delivered`;
    default:
      return `Order update for Period ${period} (${dateStr})`;
  }
}