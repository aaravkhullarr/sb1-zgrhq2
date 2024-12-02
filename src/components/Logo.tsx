import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Logo() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div 
      onClick={handleLogoClick}
      className="cursor-pointer flex items-center h-12"
    >
      <img 
        src="/huskie-icon.png" 
        alt="huskieats mascot" 
        className="h-full w-auto"
      />
      <span 
        className="ml-2 text-[#040084] text-2xl"
        style={{ fontFamily: '"Cocomat Pro", sans-serif' }}
      >
        eats.
      </span>
    </div>
  );
}