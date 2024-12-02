import React from 'react';
import { useNotificationStore } from '../../../stores/notificationStore';
import { Bell, Check } from 'lucide-react';
import { restaurants } from '../../../data/restaurants';
import { formatDistanceToNow } from 'date-fns';

export function DriverNotifications() {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead,
    getUnreadCount 
  } = useNotificationStore();

  const unreadCount = getUnreadCount();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#040084]">Notifications</h2>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-[#fd6600] hover:text-[#e4a74b] text-sm font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No notifications yet</p>
          <p className="text-sm text-gray-500 mt-2">
            You'll be notified when you receive new orders
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map(notification => {
            const restaurant = restaurants.find(r => r.id === notification.restaurantId);
            
            return (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-md p-4 transition-colors ${
                  !notification.isRead ? 'border-l-4 border-[#fd6600]' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {restaurant && (
                      <img
                        src={restaurant.logo}
                        alt={restaurant.name}
                        className="w-10 h-10 object-contain"
                      />
                    )}
                    <div>
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-[#fd6600] hover:text-[#e4a74b]"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}