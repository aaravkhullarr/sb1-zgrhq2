import React from 'react';
import { Users, Package, Car, Store, DollarSign } from 'lucide-react';
import { useOrderStore } from '../../stores/orderStore';
import { useAdminStats } from '../../hooks/useAdminStats';

export function AdminOverview() {
  const orderStore = useOrderStore();
  const adminStats = useAdminStats();

  const stats = {
    totalUsers: adminStats.totalUsers,
    totalOrders: orderStore.orders.length,
    totalDrivers: adminStats.totalDrivers,
    activeDrivers: adminStats.activeDrivers,
    totalRevenue: orderStore.orders.length * 3 // $3 per delivery
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: Package,
      color: 'bg-green-500'
    },
    {
      title: 'Total Drivers',
      value: stats.totalDrivers,
      icon: Car,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Drivers',
      value: stats.activeDrivers,
      icon: Store,
      color: 'bg-orange-500'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue}`,
      icon: DollarSign,
      color: 'bg-emerald-500'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#040084]">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to the HuskieEats admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
            <h3 className="text-gray-600 font-medium">{stat.title}</h3>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Restaurant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderStore.orders.slice(0, 5).map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{order.orderNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{order.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{order.restaurantName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}