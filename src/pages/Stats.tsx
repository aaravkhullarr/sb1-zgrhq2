import React from 'react';
import { ShoppingBag, TrendingUp, Clock, MapPin } from 'lucide-react';

export function Stats() {
  // Mock data - replace with actual user stats
  const stats = {
    totalOrders: 12,
    favoriteRestaurant: "Chipotle",
    averageDeliveryTime: "18 mins",
    mostOrderedFrom: "Downtown Naperville"
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-20">
      <h2 
        className="text-2xl font-bold mb-6 text-[#040084]"
        style={{ fontFamily: '"Cocomat Pro", sans-serif' }}
      >
        Your Stats
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 mb-2">
            <ShoppingBag className="w-5 h-5 text-[#fd6600]" />
            <h3 className="font-semibold">Total Orders</h3>
          </div>
          <p className="text-2xl font-bold text-[#040084]">{stats.totalOrders}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[#fd6600]" />
            <h3 className="font-semibold">Favorite Restaurant</h3>
          </div>
          <p className="text-lg font-medium text-[#040084]">{stats.favoriteRestaurant}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="w-5 h-5 text-[#fd6600]" />
            <h3 className="font-semibold">Avg Delivery Time</h3>
          </div>
          <p className="text-lg font-medium text-[#040084]">{stats.averageDeliveryTime}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 mb-2">
            <MapPin className="w-5 h-5 text-[#fd6600]" />
            <h3 className="font-semibold">Most Ordered From</h3>
          </div>
          <p className="text-lg font-medium text-[#040084]">{stats.mostOrderedFrom}</p>
        </div>
      </div>
    </div>
  );
}