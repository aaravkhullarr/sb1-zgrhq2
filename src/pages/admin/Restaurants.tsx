import React, { useState } from 'react';
import { Store, MapPin, Clock, Edit, Trash2, Search, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function AdminRestaurants() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual data from your backend
  const restaurants = [
    { 
      id: 1, 
      name: 'Chipotle', 
      location: 'Washington St', 
      status: 'active',
      availableDrivers: 3
    },
    { 
      id: 2, 
      name: 'Panera Bread', 
      location: 'Freedom Dr', 
      status: 'inactive',
      availableDrivers: 0
    },
  ];

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#040084]">Restaurant Management</h1>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Add Restaurant
        </Button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fd6600] focus:border-[#fd6600]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Store className="w-6 h-6 text-[#fd6600] mr-2" />
                  <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  restaurant.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {restaurant.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{restaurant.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{restaurant.availableDrivers} drivers available</span>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button className="p-2 text-[#fd6600] hover:bg-orange-50 rounded-lg transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}