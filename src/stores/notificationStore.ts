import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OrderNotification } from '../types';

interface NotificationStore {
  notifications: OrderNotification[];
  addNotification: (notification: Omit<OrderNotification, 'id' | 'createdAt' | 'isRead'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  getUnreadCount: () => number;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],

      addNotification: (notification) => {
        const newNotification: OrderNotification = {
          ...notification,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          isRead: false,
        };

        set(state => ({
          notifications: [newNotification, ...state.notifications]
        }));
      },

      markAsRead: (notificationId) => {
        set(state => ({
          notifications: state.notifications.map(notification =>
            notification.id === notificationId
              ? { ...notification, isRead: true }
              : notification
          )
        }));
      },

      markAllAsRead: () => {
        set(state => ({
          notifications: state.notifications.map(notification => ({
            ...notification,
            isRead: true
          }))
        }));
      },

      getUnreadCount: () => {
        return get().notifications.filter(n => !n.isRead).length;
      },

      clearNotifications: () => {
        set({ notifications: [] });
      }
    }),
    {
      name: 'notifications-store'
    }
  )
);