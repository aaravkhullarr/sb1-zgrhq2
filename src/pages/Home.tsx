import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Search } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { TimeDisplay } from '../components/home/TimeDisplay';
import { LunchPeriodCountdown } from '../components/home/LunchPeriodCountdown';
import { RestaurantCard } from '../components/ui/RestaurantCard';
import { WelcomeMessage } from '../components/ui/WelcomeMessage';
import { ProfilePictureRequired } from '../components/ui/ProfilePictureRequired';

const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'fast-food', name: 'Fast Food', icon: '🍔' },
  { id: 'mexican', name: 'Mexican', icon: '🌮' },
  { id: 'chicken', name: 'Chicken', icon: '🍗' },
  { id: 'desserts', name: 'Desserts', icon: '🍪' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
];

export function Home() {
  const { user, showWelcomeMessage, setShowWelcomeMessage, updateProfilePicture } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleProfilePictureUpload = async (pictureData: string) => {
    await updateProfilePicture(pictureData);
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-20">
      {showWelcomeMessage && (
        <WelcomeMessage onClose={() => setShowWelcomeMessage(false)} />
      )}

      {user && !user.profilePicture && (
        <ProfilePictureRequired onUpload={handleProfilePictureUpload} />
      )}
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 
            className="text-2xl font-bold text-[#040084]"
            style={{ fontFamily: '"Cocomat Pro", sans-serif' }}
          >
            Hey {user?.firstName}, welcome back
          </h2>
          <TimeDisplay />
        </div>
        
        <LunchPeriodCountdown targetPeriod={user?.lunchPeriod || 4} />
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for a restaurant or food"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-[#fd6600] focus:ring-2 focus:ring-[#fd6600] focus:ring-opacity-50"
        />
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center min-w-[80px] p-3 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#fd6600] text-white shadow-md'
                  : 'bg-white text-gray-600 shadow-sm hover:shadow-md'
              }`}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {selectedCategory === 'all' ? 'All Restaurants' : `${categories.find(c => c.id === selectedCategory)?.name} Restaurants`}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}