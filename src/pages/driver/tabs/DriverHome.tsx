import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useDriverStore } from '../../../hooks/useDriverStore';
import { useRestaurantAvailabilityStore } from '../../../stores/restaurantAvailabilityStore';
import { restaurants } from '../../../data/restaurants';
import { MapPin, AlertCircle, DollarSign, Clock } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Dialog } from '../../../components/ui/Dialog';
import { isAfter2PM, canModifySelection, getTomorrowDate } from '../../../utils/timeUtils';

export function DriverHome() {
  const { user } = useAuth();
  const { 
    getSelectionsForDate, 
    addSelection, 
    removeSelection,
    earnings 
  } = useDriverStore();
  const { assignDriver, removeDriver } = useRestaurantAvailabilityStore();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<number | null>(null);

  const tomorrow = getTomorrowDate();
  const selectedRestaurants = getSelectionsForDate(tomorrow);

  const handleSelect = (restaurantId: number) => {
    if (!isAfter2PM()) {
      return;
    }
    setPendingSelection(restaurantId);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (pendingSelection && user && canModifySelection()) {
      if (selectedRestaurants.includes(pendingSelection)) {
        removeSelection(pendingSelection);
        removeDriver(user.id, pendingSelection);
      } else {
        addSelection(pendingSelection);
        assignDriver(
          user.id, 
          pendingSelection,
          'John Doe' // Always use John Doe as the driver name
        );
      }
      setShowConfirmation(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Earnings Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Today's Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-6 h-6 text-[#fd6600]" />
            <div>
              <p className="text-sm text-gray-600">Today's Earnings</p>
              <p className="text-xl font-bold">${earnings.today.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-[#fd6600]" />
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-xl font-bold">${earnings.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Selection */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Tomorrow's Restaurants</h2>
          {!isAfter2PM() ? (
            <span className="text-sm text-red-600">
              Available after 2:00 PM
            </span>
          ) : !canModifySelection() ? (
            <span className="text-sm text-red-600">
              Selections locked for tomorrow
            </span>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {restaurants.map(restaurant => (
            <button
              key={restaurant.id}
              onClick={() => handleSelect(restaurant.id)}
              disabled={!isAfter2PM() || !canModifySelection()}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedRestaurants.includes(restaurant.id)
                  ? 'border-[#fd6600] bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${(!isAfter2PM() || !canModifySelection()) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h3 className="font-semibold">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {restaurant.address}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title={selectedRestaurants.includes(pendingSelection || -1) 
          ? "Remove Restaurant Selection"
          : "Confirm Restaurant Selection"}
      >
        <div className="space-y-4">
          <p>
            {selectedRestaurants.includes(pendingSelection || -1)
              ? "Are you sure you want to remove this restaurant from your selections?"
              : "Would you like to add this restaurant to your selections for tomorrow?"}
          </p>
          <div className="flex justify-end gap-3">
            <Button
              onClick={() => setShowConfirmation(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}