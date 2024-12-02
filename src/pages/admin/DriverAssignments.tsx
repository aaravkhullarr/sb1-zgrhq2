import React, { useState } from 'react';
import { useRestaurantAvailabilityStore } from '../../stores/restaurantAvailabilityStore';
import { restaurants } from '../../data/restaurants';
import { Button } from '../../components/ui/Button';
import { MapPin, Plus, X } from 'lucide-react';

export function DriverAssignments() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const [driverName, setDriverName] = useState('');
  const [driverId, setDriverId] = useState('');
  const { assignDriver, removeDriver, getDriversForRestaurant } = useRestaurantAvailabilityStore();

  const handleAssignDriver = (restaurantId: number) => {
    if (!driverName || !driverId) return;
    
    assignDriver(driverId, restaurantId, driverName);
    setDriverName('');
    setDriverId('');
    setSelectedRestaurant(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#040084] mb-8">Driver Assignments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map(restaurant => {
          const assignedDrivers = getDriversForRestaurant(restaurant.id);
          
          return (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <img
                    src={restaurant.logo}
                    alt={restaurant.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold">{restaurant.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {restaurant.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Assigned Drivers</h4>
                  {assignedDrivers.length > 0 ? (
                    <div className="space-y-2">
                      {assignedDrivers.map((driver, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span>{driver}</span>
                          <button
                            onClick={() => removeDriver(driverId, restaurant.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No drivers assigned</p>
                  )}
                </div>

                {selectedRestaurant === restaurant.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Driver ID"
                      value={driverId}
                      onChange={(e) => setDriverId(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Driver Name"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAssignDriver(restaurant.id)}
                        className="flex-1"
                      >
                        Assign
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setSelectedRestaurant(null)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setSelectedRestaurant(restaurant.id)}
                    variant="secondary"
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Assign Driver
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}