import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Package, User, Bell } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useOrderStore } from '../stores/orderStore';
import { Logo } from './Logo';
import { Button } from './ui/Button';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const orderStore = useOrderStore();

  const isActive = (path: string) => location.pathname === path;
  const isPublicPage = ['/', '/login', '/register'].includes(location.pathname);
  const isRoleSelection = location.pathname === '/role-selection';
  const isDriverAuth = location.pathname === '/driver-auth';
  const isDriverDashboard = location.pathname.startsWith('/driver/');
  const isLandingPage = location.pathname === '/';

  // Get unread notifications count for eater
  const unreadNotifications = user ? orderStore.getUnreadNotificationsCount(user.id) : 0;

  const handleBack = () => {
    if (isLandingPage) return;
    
    if (isDriverDashboard) {
      navigate('/role-selection');
      return;
    }

    if (location.pathname === '/role-selection') {
      navigate('/');
      return;
    }

    if (['/login', '/register', '/driver-auth'].includes(location.pathname)) {
      navigate('/role-selection');
      return;
    }

    if (location.pathname.startsWith('/restaurant/')) {
      navigate('/home');
      return;
    }

    navigate('/role-selection');
  };

  const showNavBar = user && !isPublicPage && !isRoleSelection && !isDriverAuth && !isDriverDashboard;

  return (
    <div className="min-h-screen bg-[#f9e7cf]">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <Logo />
            
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <span className="text-[#040084] font-bold tracking-wide whitespace-nowrap">
                DRIVEN TO DEVOUR
              </span>
            </div>
            
            {isLandingPage ? (
              <Button
                onClick={() => navigate('/role-selection')}
                size="sm"
                className="px-6"
              >
                Take Me There
              </Button>
            ) : (
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-900 transition-colors p-2"
                aria-label="Go back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>

      {showNavBar && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-around py-3">
              <button
                onClick={() => navigate('/home')}
                className={`flex flex-col items-center ${
                  isActive('/home') ? 'text-[#fd6600]' : 'text-gray-600'
                }`}
              >
                <Home className="w-6 h-6" />
                <span className="text-xs mt-1">Home</span>
              </button>
              <button
                onClick={() => navigate('/orders')}
                className={`flex flex-col items-center ${
                  isActive('/orders') ? 'text-[#fd6600]' : 'text-gray-600'
                }`}
              >
                <Package className="w-6 h-6" />
                <span className="text-xs mt-1">Orders</span>
              </button>
              <button
                onClick={() => navigate('/notifications')}
                className={`flex flex-col items-center relative ${
                  isActive('/notifications') ? 'text-[#fd6600]' : 'text-gray-600'
                }`}
              >
                <Bell className="w-6 h-6" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                    {unreadNotifications}
                  </span>
                )}
                <span className="text-xs mt-1">Alerts</span>
              </button>
              <button
                onClick={() => navigate('/profile')}
                className={`flex flex-col items-center ${
                  isActive('/profile') ? 'text-[#fd6600]' : 'text-gray-600'
                }`}
              >
                <User className="w-6 h-6" />
                <span className="text-xs mt-1">Profile</span>
              </button>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}