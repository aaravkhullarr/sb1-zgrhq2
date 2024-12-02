import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useOrderStore } from '../stores/orderStore';
import { Bell, Check, Phone } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { restaurants } from '../data/restaurants';

export function Notifications() {
  const { user } = useAuth();
  const orderStore = useOrderStore();

  if (!user) return null;

  const notifications = orderStore.getOrdersByCustomerId(user.id)
    .flatMap(order => order.notifications)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleMarkAsRead = (orderId: string, notificationId: string) => {
    orderStore.markNotificationAsRead(orderId, notificationId);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-20">
      <h2 
        className="text-2xl font-bold mb-6 text-[#040084]"
        style={{ fontFamily: '"Cocomat Pro", sans-serif' }}
      >
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No notifications yet</p>
          <p className="text-sm text-gray-500 mt-2">
            You'll be notified about your order status here
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
                      onClick={() => handleMarkAsRead(notification.orderId, notification.id)}
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