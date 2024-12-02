import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useDriverDashboard } from '../../../hooks/useDriverDashboard';
import { useDriverStore } from '../../../hooks/useDriverStore';
import { TimeDisplay } from '../../../components/home/TimeDisplay';
import { restaurants } from '../../../data/restaurants';
import { OrderCard } from '../components/OrderCard';

type OrderFilter = 'available' | 'active' | 'completed';

export function DriverPickups() {
  const [filter, setFilter] = useState<OrderFilter>('available');
  const { availableOrders, activeOrders, completedOrders } = useDriverDashboard();
  const { getSelectionsForDate } = useDriverStore();
  
  // Get today's selected restaurants
  const today = new Date().toISOString().split('T')[0];
  const selectedRestaurantIds = getSelectionsForDate(today);
  const selectedRestaurants = restaurants.filter(r => selectedRestaurantIds.includes(r.id));

  // Group orders by restaurant
  const ordersByRestaurant = availableOrders.reduce((acc, order) => {
    if (!selectedRestaurantIds.includes(order.restaurantId)) return acc;
    
    if (!acc[order.restaurantId]) {
      acc[order.restaurantId] = {
        restaurant: restaurants.find(r => r.id === order.restaurantId)!,
        orders: []
      };
    }
    acc[order.restaurantId].orders.push(order);
    return acc;
  }, {} as { [key: number]: { restaurant: typeof restaurants[0], orders: typeof availableOrders } });

  const getFilteredOrders = () => {
    switch (filter) {
      case 'available':
        return ordersByRestaurant;
      case 'active':
        return groupOrdersByRestaurant(activeOrders);
      case 'completed':
        return groupOrdersByRestaurant(completedOrders);
      default:
        return {};
    }
  };

  function groupOrdersByRestaurant(orders: typeof availableOrders) {
    return orders.reduce((acc, order) => {
      if (!acc[order.restaurantId]) {
        acc[order.restaurantId] = {
          restaurant: restaurants.find(r => r.id === order.restaurantId)!,
          orders: []
        };
      }
      acc[order.restaurantId].orders.push(order);
      return acc;
    }, {} as { [key: number]: { restaurant: typeof restaurants[0], orders: typeof availableOrders } });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#040084]">Pickups</h2>
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

      {/* Filters */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setFilter('available')}
          className={`px-4 py-2 font-medium ${
            filter === 'available'
              ? 'text-[#fd6600] border-b-2 border-[#fd6600]'
              : 'text-gray-500'
          }`}
        >
          Available ({availableOrders.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 font-medium ${
            filter === 'active'
              ? 'text-[#fd6600] border-b-2 border-[#fd6600]'
              : 'text-gray-500'
          }`}
        >
          Active ({activeOrders.length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 font-medium ${
            filter === 'completed'
              ? 'text-[#fd6600] border-b-2 border-[#fd6600]'
              : 'text-gray-500'
          }`}
        >
          Completed ({completedOrders.length})
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-8">
        {Object.values(getFilteredOrders()).map(({ restaurant, orders }) => (
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

            {/* Orders List */}
            <div className="divide-y divide-gray-200">
              {orders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        ))}

        {Object.keys(getFilteredOrders()).length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No {filter} orders at the moment
          </div>
        )}
      </div>
    </div>
  );
}