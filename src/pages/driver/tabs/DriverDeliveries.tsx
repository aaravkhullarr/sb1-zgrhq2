import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useDriverStore } from '../../../hooks/useDriverStore';
import { useOrderStore } from '../../../stores/orderStore';
import { useAuth } from '../../../hooks/useAuth';
import { restaurants } from '../../../data/restaurants';
import { TimeDisplay } from '../../../components/home/TimeDisplay';
import { OrderCard } from '../components/OrderCard';

export function DriverDeliveries() {
  const { user } = useAuth();
  const { getSelectionsForDate } = useDriverStore();
  const orderStore = useOrderStore();
  const [activeTab, setActiveTab] = useState<'current' | 'past'>('current');
  
  if (!user) return null;

  // Get today's selected restaurants
  const today = new Date().toISOString().split('T')[0];
  const selectedRestaurantIds = getSelectionsForDate(today);
  const selectedRestaurants = restaurants.filter(r => selectedRestaurantIds.includes(r.id));

  // Get all orders for selected restaurants
  const restaurantOrders = selectedRestaurants.map(restaurant => {
    const allOrders = orderStore.getOrdersByRestaurantId(restaurant.id);
    const currentOrders = allOrders.filter(order => 
      !['delivered', 'cancelled'].includes(order.status) &&
      (order.driverId === user.id || !order.driverId)
    );
    const pastOrders = allOrders.filter(order => 
      ['delivered', 'cancelled'].includes(order.status) &&
      order.driverId === user.id
    );
    
    return {
      restaurant,
      orders: activeTab === 'current' ? currentOrders : pastOrders
    };
  }).filter(group => group.orders.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#040084]">
          {activeTab === 'current' ? "Today's Deliveries" : 'Past Deliveries'}
        </h2>
        <TimeDisplay />
      </div>

      {/* Pickup Instructions */}
      <div className="bg-[#040084] text-white p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5" />
          <p>Meet with the eaters at the NPAC (doors 8 & 9) entrance to drop off orders & receive payment.</p>
        </div>
      </div>

      {/* Selected Restaurants */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">Your Selected Restaurants</h3>
        <div className="flex flex-wrap gap-4">
          {selectedRestaurants.map(restaurant => (
            <div key={restaurant.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
              <img
                src={restaurant.logo}
                alt={restaurant.name}
                className="w-8 h-8 object-contain"
              />
              <span className="text-sm font-medium">{restaurant.name}</span>
            </div>
          ))}
          {selectedRestaurants.length === 0 && (
            <p className="text-gray-500">No restaurants selected for today</p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('current')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'current'
              ? 'text-[#fd6600] border-b-2 border-[#fd6600]'
              : 'text-gray-500'
          }`}
        >
          Current Orders
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'past'
              ? 'text-[#fd6600] border-b-2 border-[#fd6600]'
              : 'text-gray-500'
          }`}
        >
          Past Orders
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {restaurantOrders.map(({ restaurant, orders }) => (
          <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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

            {/* Orders */}
            <div className="divide-y divide-gray-200">
              {orders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        ))}

        {restaurantOrders.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No {activeTab} orders</p>
            {activeTab === 'current' && (
              <p className="text-sm">Orders will appear here when customers place them</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}