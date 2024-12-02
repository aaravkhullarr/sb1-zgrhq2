import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Users, Car, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { AdminOverview } from './Overview';
import { DriverAssignments } from './DriverAssignments';

export function AdminLayout() {
  const [activeTab, setActiveTab] = useState('overview');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview />;
      case 'drivers':
        return <DriverAssignments />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-[#040084] text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center px-6 py-3 text-sm ${
              activeTab === 'overview' ? 'bg-[#fd6600]' : 'hover:bg-blue-900'
            }`}
          >
            <Home className="w-5 h-5 mr-3" />
            Overview
          </button>
          
          <button
            onClick={() => setActiveTab('drivers')}
            className={`w-full flex items-center px-6 py-3 text-sm ${
              activeTab === 'drivers' ? 'bg-[#fd6600]' : 'hover:bg-blue-900'
            }`}
          >
            <Car className="w-5 h-5 mr-3" />
            Driver Assignments
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-0 left-0 right-0 p-6 flex items-center text-sm hover:bg-blue-900"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {renderContent()}
      </div>
    </div>
  );
}