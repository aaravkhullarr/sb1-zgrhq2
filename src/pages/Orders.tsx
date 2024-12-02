import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useOrderStore } from '../stores/orderStore';
import { Clock, MapPin, CheckCircle, XCircle, Phone } from 'lucide-react';
import { restaurants } from '../data/restaurants';

export function Orders() {
  const { user } = useAuth();
  const orderStore = useOrderStore();
  const [activeTab, setActiveTab] = useState<'current' | 'past'>('current');

  const userOrders = user ? orderStore.getOrdersByCustomerId(user.id) : [];
  
  const currentOrders = userOrders.filter(order => 
    !['delivered', 'cancelled'].includes(order.status)
  );
  
  const pastOrders = userOrders.filter(order => 
    ['delivered', 'cancelled'].includes(order.status)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'picked_up': return 'bg-purple-100 text-purple-800';
      case 'ready_for_pickup': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const renderOrders = (orders: typeof userOrders) => {
    if (orders.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">No orders to display</p>
          <p className="text-sm text-gray-500 mt-2">
            {activeTab === 'current' ? 'Your current orders will appear here' : 'Your past orders will appear here'}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {orders.map(order => {
          const restaurant = restaurants.find(r => r.id === order.restaurantId);
          const driver = orderStore.getDriverInfo(order.driverId);
          
          return (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={restaurant?.logo}
                    alt={`${restaurant?.name} logo`}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{restaurant?.name}</h3>
                    <p className="text-sm text-gray-600">Order #{order.orderNumber}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>

              {driver && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-800">Your Driver</p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      {driver.profilePicture ? (
                        <img 
                          src={driver.profilePicture} 
                          alt={driver.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-500 text-lg">
                            {driver.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{driver.name}</p>
                      <a 
                        href={`tel:${driver.phone}`}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Phone className="w-4 h-4" />
                        {driver.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Period {order.lunchPeriod}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Name on order: {order.orderName}</span>
                </div>
              </div>

              {order.notifications?.map(notification => (
                <div 
                  key={notification.id}
                  className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-lg"
                >
                  <p className="text-sm">{notification.message}</p>
                </div>
              ))}

              {order.status === 'delivered' && (
                <div className="mt-4 flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Delivered successfully</span>
                </div>
              )}

              {order.status === 'cancelled' && (
                <div className="mt-4 flex items-center text-red-600">
                  <XCircle className="w-5 h-5 mr-2" />
                  <span>Order cancelled</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-20">
      <h2 
        className="text-2xl font-bold mb-6 text-[#040084]"
        style={{ fontFamily: '"Cocomat Pro", sans-serif' }}
      >
        Your Orders
      </h2>

      <div className="flex gap-2 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('current')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'current'
              ? 'text-[#fd6600] border-b-2 border-[#fd6600]'
              : 'text-gray-500'
          }`}
        >
          Current Orders ({currentOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'past'
              ? 'text-[#fd6600] border-b-2 border-[#fd6600]'
              : 'text-gray-500'
          }`}
        >
          Past Orders ({pastOrders.length})
        </button>
      </div>

      {renderOrders(activeTab === 'current' ? currentOrders : pastOrders)}
    </div>
  );
}