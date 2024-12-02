import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Store, Settings } from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();

  const modules = [
    {
      title: 'User Management',
      description: 'Manage student and driver accounts',
      icon: Users,
      path: '/admin/users',
      color: 'bg-blue-500',
    },
    {
      title: 'Restaurant Management',
      description: 'Manage restaurant list and availability',
      icon: Store,
      path: '/admin/restaurants',
      color: 'bg-[#fd6600]',
    },
    {
      title: 'System Settings',
      description: 'Configure system parameters',
      icon: Settings,
      path: '/admin/settings',
      color: 'bg-gray-700',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#040084]">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <button
            key={module.path}
            onClick={() => navigate(module.path)}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-left"
          >
            <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center mb-4`}>
              <module.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{module.title}</h2>
            <p className="text-gray-600">{module.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}