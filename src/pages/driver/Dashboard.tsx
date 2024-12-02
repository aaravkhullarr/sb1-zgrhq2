import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Package, Home, Settings, Bell } from 'lucide-react';
import { TimeDisplay } from '../../components/home/TimeDisplay';
import { DriverHome } from './tabs/DriverHome';
import { DriverDeliveries } from './tabs/DriverDeliveries';
import { DriverSettings } from './tabs/DriverSettings';
import { DriverNotifications } from './tabs/DriverNotifications';
import { useNotificationStore } from '../../stores/notificationStore';
import { ProfilePictureRequired } from '../../components/ui/ProfilePictureRequired';

export function DriverDashboard() {
  const { user, updateProfilePicture } = useAuth();
  const [activeTab, setActiveTab] = React.useState('home');
  const { getUnreadCount } = useNotificationStore();
  const unreadCount = getUnreadCount();

  if (!user) return null;

  const handleProfilePictureUpload = async (pictureData: string) => {
    await updateProfilePicture(pictureData);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 
                className="text-2xl font-bold text-[#040084]"
                style={{ fontFamily: '"Cocomat Pro", sans-serif' }}
              >
                Welcome, {user.firstName}
              </h2>
              <TimeDisplay />
            </div>
            <DriverHome />
          </>
        );
      case 'deliveries':
        return <DriverDeliveries />;
      case 'notifications':
        return <DriverNotifications />;
      case 'settings':
        return <DriverSettings />;
      default:
        return <DriverHome />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-20">
      {!user.profilePicture && (
        <ProfilePictureRequired onUpload={handleProfilePictureUpload} />
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#040084] border-t border-[#040084]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around py-3">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center ${
                activeTab === 'home' ? 'text-[#fd6600]' : 'text-white'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button
              onClick={() => setActiveTab('deliveries')}
              className={`flex flex-col items-center ${
                activeTab === 'deliveries' ? 'text-[#fd6600]' : 'text-white'
              }`}
            >
              <Package className="w-6 h-6" />
              <span className="text-xs mt-1">Deliveries</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex flex-col items-center relative ${
                activeTab === 'notifications' ? 'text-[#fd6600]' : 'text-white'
              }`}
            >
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  {unreadCount}
                </span>
              )}
              <span className="text-xs mt-1">Alerts</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex flex-col items-center ${
                activeTab === 'settings' ? 'text-[#fd6600]' : 'text-white'
              }`}
            >
              <Settings className="w-6 h-6" />
              <span className="text-xs mt-1">Settings</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}