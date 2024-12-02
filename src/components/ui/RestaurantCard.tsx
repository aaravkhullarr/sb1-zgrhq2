import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Lock } from 'lucide-react';
import { useRestaurantAvailabilityStore } from '../../stores/restaurantAvailabilityStore';

interface RestaurantCardProps {
  id: number;
  name: string;
  address: string;
  image: string;
  logo: string;
  rating: number;
  tags: string[];
}

export function RestaurantCard({ id, name, address, image, logo, rating, tags }: RestaurantCardProps) {
  const navigate = useNavigate();
  const drivers = useRestaurantAvailabilityStore(state => state.getDriversForRestaurant(id));
  const isAvailable = drivers.length > 0;

  const handleClick = () => {
    if (isAvailable) {
      navigate(`/restaurant/${id}/order`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg ${
        isAvailable ? 'cursor-pointer' : 'opacity-75 cursor-not-allowed'
      }`}
    >
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md">
          <img
            src={logo}
            alt={`${name} logo`}
            className="h-8 w-8 object-contain"
          />
        </div>
        <div className="absolute top-4 right-4">
          {isAvailable ? (
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              {drivers.length} {drivers.length === 1 ? 'Driver' : 'Drivers'} Available
            </span>
          ) : (
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Locked</span>
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-semibold">{name}</h4>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm">{rating}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="truncate">{address}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}