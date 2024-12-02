import React, { useState } from 'react';
import { useDriverStore } from '../../../stores/driverStore';
import { restaurants } from '../../../data/restaurants';
import { Button } from '../../../components/ui/Button';
import { Dialog } from '../../../components/ui/Dialog';
import { MapPin, AlertCircle } from 'lucide-react';
import { isAfter2PM } from '../../../utils/timeUtils';

export function RestaurantSelection() {
  const { selectedRestaurant, selectRestaurant } = useDriverStore();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<number | null>(null);

  const handleSelect = (restaurantId: number) => {
    if (!isAfter2PM()) {
      return;
    }
    setPendingSelection(restaurantId);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (pendingSelection) {
      selectRestaurant(pendingSelection);
      setShowConfirmation(false);
    }
  };

  if (selectedRestaurant) {
    const restaurant = restaurants.find(r => r.id === selectedRestaurant);
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Selected Restaurant</h2>
        <div className="flex items-center">
          <img
            src={restaurant?.logo}
            alt={restaurant?.name}
            className="w-12 h-12 object-contain mr-4"
          />
          <div>
            <h3 className="font-semibold">{restaurant?.name}</h3>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {restaurant?.address}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#fd6600] mt-0.5" />
          <div>
            <h3 className="font-semibold text-[#fd6600]">Select Your Restaurant</h3>
            <p className="text-sm text-gray-600">
              Choose the restaurant you'll be picking up orders from. This selection is final and helps us coordinate deliveries efficiently.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map(restaurant => (
          <button
            key={restaurant.id}
            onClick={() => handleSelect(restaurant.id)}
            disabled={!isAfter2PM()}
            className={`p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-left ${
              !isAfter2PM() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex items-center mb-2">
              <img
                src={restaurant.logo}
                alt={restaurant.name}
                className="w-10 h-10 object-contain mr-3"
              />
              <h3 className="font-semibold">{restaurant.name}</h3>
            </div>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {restaurant.address}
            </p>
          </button>
        ))}
      </div>

      <Dialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Confirm Restaurant Selection"
      >
        <div className="space-y-4">
          <p>
            This selection is final and cannot be changed. Are you sure you want to select this restaurant?
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm Selection
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}