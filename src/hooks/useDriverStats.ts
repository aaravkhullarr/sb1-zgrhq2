import { useEffect, useState } from 'react';
import { useOrders } from './useOrders';
import { useAuth } from './useAuth';
import { restaurants } from '../data/restaurants';

interface DriverStats {
  totalDeliveries: number;
  totalEarnings: number;
  averageDeliveryTime: string;
  mostFrequentRestaurant: string;
  deliveriesByDay: { [key: string]: number };
  deliveriesByRestaurant: { [key: string]: number };
}

export function useDriverStats() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const [stats, setStats] = useState<DriverStats>({
    totalDeliveries: 0,
    totalEarnings: 0,
    averageDeliveryTime: '0 mins',
    mostFrequentRestaurant: '',
    deliveriesByDay: {},
    deliveriesByRestaurant: {}
  });

  useEffect(() => {
    if (!user) return;

    const driverOrders = orders.filter(order => 
      order.driverId === user.id && order.status === 'delivered'
    );

    // Calculate stats
    const deliveriesByRestaurant = driverOrders.reduce((acc, order) => {
      acc[order.restaurantId] = (acc[order.restaurantId] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const deliveriesByDay = driverOrders.reduce((acc, order) => {
      const day = new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long' });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const mostFrequentRestaurantId = Object.entries(deliveriesByRestaurant)
      .sort(([, a], [, b]) => b - a)[0]?.[0];

    const mostFrequentRestaurant = restaurants.find(
      r => r.id === Number(mostFrequentRestaurantId)
    )?.name || '';

    setStats({
      totalDeliveries: driverOrders.length,
      totalEarnings: driverOrders.length * 3, // $3 per delivery
      averageDeliveryTime: '18 mins', // This would be calculated from actual delivery times
      mostFrequentRestaurant,
      deliveriesByDay,
      deliveriesByRestaurant
    });
  }, [user, orders]);

  return stats;
}