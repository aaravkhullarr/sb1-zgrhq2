import React from 'react';
import { Order } from '../../../types';
import { OrderCard } from './OrderCard';

interface OrdersListProps {
  orders: Order[];
}

export function OrdersList({ orders }: OrdersListProps) {
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const activeOrders = orders.filter(order => ['accepted', 'picked_up'].includes(order.status));
  const completedOrders = orders.filter(order => order.status === 'delivered');

  return (
    <div className="space-y-8">
      {pendingOrders.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">New Orders</h2>
          <div className="grid gap-4">
            {pendingOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </section>
      )}

      {activeOrders.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Active Orders</h2>
          <div className="grid gap-4">
            {activeOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </section>
      )}

      {completedOrders.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Completed Orders</h2>
          <div className="grid gap-4">
            {completedOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}