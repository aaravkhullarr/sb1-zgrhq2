import React, { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { Button } from './Button';
import { ImageCropper } from './ImageCropper';

interface ProfilePictureRequiredProps {
  onUpload: (file: string) => void;
}

export function ProfilePictureRequired({ onUpload }: ProfilePictureRequiredProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setSelectedImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    onUpload(croppedImage);
    setSelectedImage(null);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-[#040084] mb-2">
              Profile Picture Required
            </h3>
            <p className="text-gray-600 mb-2">
              Please upload a clear photo of your face to continue using huskieats.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              This helps identify you during deliveries.
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
              capture="user"
            />
            
            <Button 
              onClick={handleButtonClick}
              className="w-full"
            >
              Choose Photo or Take Picture
            </Button>
          </div>
        </div>
      </div>

      {selectedImage && (
        <ImageCropper
          imageUrl={selectedImage}
          onCropComplete={handleCropComplete}
          onCancel={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}