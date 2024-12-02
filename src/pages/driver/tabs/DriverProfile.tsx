import React, { useRef, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Camera } from 'lucide-react';
import { ImageCropper } from '../../../components/ui/ImageCropper';
import { ProfileSettings } from '../../../components/ui/ProfileSettings';

type SettingType = 'password' | 'phone' | 'lunch-period' | null;

export function DriverProfile() {
  const { user, updateProfilePicture } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeSetting, setActiveSetting] = useState<SettingType>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (croppedImage: string) => {
    setIsUploading(true);
    try {
      await updateProfilePicture(croppedImage);
    } finally {
      setIsUploading(false);
      setSelectedImage(null);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Profile Image */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <button
              onClick={handleCameraClick}
              className="absolute bottom-0 right-0 bg-[#fd6600] p-2 rounded-full cursor-pointer hover:bg-[#e4a74b] transition-colors"
              disabled={isUploading}
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
            <input 
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
              capture="user"
              disabled={isUploading}
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
        <button
          onClick={() => setActiveSetting('password')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
        >
          <span className="font-medium">Update Password</span>
          <span className="text-gray-400">→</span>
        </button>

        <button
          onClick={() => setActiveSetting('phone')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
        >
          <span className="font-medium">Update Phone Number</span>
          <span className="text-gray-400">→</span>
        </button>

        <button
          onClick={() => setActiveSetting('lunch-period')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
        >
          <span className="font-medium">Update Lunch Period</span>
          <span className="text-gray-400">→</span>
        </button>
      </div>

      {selectedImage && (
        <ImageCropper
          imageUrl={selectedImage}
          onCropComplete={handleCropComplete}
          onCancel={() => setSelectedImage(null)}
        />
      )}

      {activeSetting && (
        <ProfileSettings
          settingType={activeSetting}
          onClose={() => setActiveSetting(null)}
        />
      )}
    </div>
  );
}