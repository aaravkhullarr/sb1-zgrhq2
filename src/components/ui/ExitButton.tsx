import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function ExitButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleExit = () => {
    // Get the current path segments
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    // If we're at root level pages, go to role selection
    if (pathSegments.length === 1) {
      const rootPages = ['home', 'login', 'register', 'driver-auth'];
      if (rootPages.includes(pathSegments[0])) {
        return navigate('/role-selection');
      }
    }

    // If we're in a restaurant order page, go back to home
    if (pathSegments[0] === 'restaurant') {
      return navigate('/home');
    }

    // If we're in the admin section
    if (pathSegments[0] === 'admin') {
      if (pathSegments.length > 1) {
        return navigate('/admin'); // Go to admin dashboard
      }
      return navigate('/role-selection'); // From admin dashboard to role selection
    }

    // If we're in stats/orders/profile, go back to home
    if (['stats', 'orders', 'profile'].includes(pathSegments[0])) {
      return navigate('/home');
    }

    // If we're in the driver dashboard, go to role selection
    if (pathSegments[0] === 'driver') {
      return navigate('/role-selection');
    }

    // Default: go to role selection
    navigate('/role-selection');
  };

  return (
    <button
      onClick={handleExit}
      className="text-gray-600 hover:text-gray-900 transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
}