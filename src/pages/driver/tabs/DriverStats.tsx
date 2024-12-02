import React from 'react';
import { ShoppingBag, TrendingUp, Clock, MapPin } from 'lucide-react';
import { useDriverStats } from '../../../hooks/useDriverStats';

export function DriverStats() {
  const stats = useDriverStats();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 mb-2">
            <ShoppingBag className="w-5 h-5 text-[#fd6600]" />
            <h3 className="font-semibold">Total Deliveries</h3>
          </div>
          <p className="text-2xl font-bold text-[#040084]">{stats.totalDeliveries}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[#fd6600]" />
            <h3 className="font-semibold">Total Earnings</h3>
          </div>
          <p className="text-2xl font-bold text-[#040084]">${stats.totalEarnings}</p>
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
            <h3 className="font-semibold">Most Frequent</h3>
          </div>
          <p className="text-lg font-medium text-[#040084]">{stats.mostFrequentRestaurant || 'N/A'}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Deliveries by Day</h3>
        <div className="space-y-2">
          {Object.entries(stats.deliveriesByDay).map(([day, count]) => (
            <div key={day} className="flex justify-between items-center">
              <span className="text-gray-600">{day}</span>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#fd6600]" 
                    style={{ 
                      width: `${(count / Math.max(...Object.values(stats.deliveriesByDay))) * 100}%` 
                    }}
                  />
                </div>
              </div>
              <span className="font-medium">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}