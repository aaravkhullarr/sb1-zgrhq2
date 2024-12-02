import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useOrderStore } from '../stores/orderStore';
import { restaurants } from '../data/restaurants';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MapPin } from 'lucide-react';

export function RestaurantOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const orderStore = useOrderStore();
  const [orderNumber, setOrderNumber] = useState('');
  const [orderName, setOrderName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const restaurant = restaurants.find(r => r.id === Number(id));

  if (!restaurant || !user) {
    return <div>Restaurant not found or user not logged in</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await orderStore.addOrder({
        customerId: user.id,
        customerName: `${user.firstName} ${user.lastName}`,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        orderNumber,
        orderName,
        status: 'pending',
        lunchPeriod: user.lunchPeriod
      });
      
      navigate('/orders');
    } catch (err) {
      setError('Failed to submit order. Please try again.');
      console.error('Failed to submit order:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <img
            src={restaurant.logo}
            alt={`${restaurant.name} logo`}
            className="w-16 h-16 object-contain mr-4"
          />
          <h2 className="text-2xl font-bold text-[#040084]">{restaurant.name}</h2>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Order Instructions:</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>Open the {restaurant.name} app or website</li>
            <li>Place your order for pickup at: 
              <div className="flex items-center mt-2 ml-6 text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {restaurant.address}
              </div>
            </li>
            <li>Copy your order number and name</li>
            <li>Enter the details below</li>
          </ol>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Order Number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Enter your order number"
            required
          />

          <Input
            label="Order Name"
            value={orderName}
            onChange={(e) => setOrderName(e.target.value)}
            placeholder="Enter the name on your order"
            required
          />

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">Pickup Location</h4>
            <p className="text-blue-600">
              Meet your driver at the NPAC entrance (doors 8 & 9) to pick up your order. You will pay them $3 there
            </p>
          </div>

          <Button
            type="submit"
            fullWidth
            loading={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Order'}
          </Button>
        </form>
      </div>
    </div>
  );
}