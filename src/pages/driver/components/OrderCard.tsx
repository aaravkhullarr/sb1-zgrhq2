import React from 'react';
import { Clock, Phone } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useOrderStore } from '../../../stores/orderStore';
import { useAuth } from '../../../hooks/useAuth';
import type { Order } from '../../../types';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const { user } = useAuth();
  const { updateOrderStatus } = useOrderStore();

  const handleStatusUpdate = async (newStatus: Order['status']) => {
    if (!user) return;
    await updateOrderStatus(
      order.id, 
      newStatus, 
      `${user.firstName} ${user.lastName}`
    );
  };

  return (
    <div className="p-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
          {order.customerProfilePicture ? (
            <img 
              src={order.customerProfilePicture} 
              alt={order.customerName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500 text-xl">
                {order.customerName.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-lg">{order.customerName}</h4>
              <div className="flex items-center text-gray-600 gap-2">
                <Phone className="w-4 h-4" />
                <a href={`tel:${order.customerPhone}`} className="hover:text-[#fd6600]">
                  {order.customerPhone}
                </a>
              </div>
              <p className="text-sm text-gray-600">Period {order.lunchPeriod}</p>
            </div>
            <span className="px-2 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              $3.00
            </span>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>Order #{order.orderNumber}</span>
            </div>
            <div>
              <p>Name on order: {order.orderName}</p>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            {order.status === 'pending' && (
              <Button onClick={() => handleStatusUpdate('on_the_way_there')}>
                On the way there
              </Button>
            )}
            {order.status === 'on_the_way_there' && (
              <Button onClick={() => handleStatusUpdate('at_restaurant')}>
                At the restaurant
              </Button>
            )}
            {order.status === 'at_restaurant' && (
              <Button onClick={() => handleStatusUpdate('on_way_back')}>
                On the way back
              </Button>
            )}
            {order.status === 'on_way_back' && (
              <Button onClick={() => handleStatusUpdate('at_npac')}>
                At the NPAC
              </Button>
            )}
            {order.status === 'at_npac' && (
              <Button onClick={() => handleStatusUpdate('delivered')}>
                Completed
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}