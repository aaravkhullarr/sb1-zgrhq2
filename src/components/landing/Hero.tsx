import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f9e7cf]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(4,0,132,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}></div>
        
        {/* Animated Elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#fd6600] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-[#e4a74b] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float-delayed"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-24">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/huskie-icon.png" 
              alt="HuskieEats Mascot" 
              className="h-20 w-auto mx-auto drop-shadow-2xl"
            />
          </div>

          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#040084] leading-tight animate-fade-in"
            style={{ fontFamily: '"Cocomat Pro", sans-serif' }}
          >
            Your Favorite Foods,
            <br />
            Delivered by Fellow Students
          </h1>

          <p className="text-sm md:text-base mb-8 animate-fade-in">
            <span className="relative inline-block">
              <span className="relative z-10">The #1 Food Delivery App for High Schoolers Who Just Want</span>
              <span className="relative z-10 font-bold"> Good Food</span>
              <span className="absolute bottom-0 left-0 right-0 h-2 bg-[#e4a74b]/30 -rotate-1"></span>
            </span>
          </p>

          <div className="mb-8 animate-fade-in">
            <Button
              onClick={() => navigate('/role-selection')}
              className="px-8 py-3 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 bg-[#fd6600] hover:bg-[#e4a74b] text-base"
            >
              <span className="flex items-center justify-center gap-2">
                Start Ordering <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>

          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSdNINtzojmuiyFqKhqjBW1t0mwjVnyFwVRlQRwTGXWLFFdw9g/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#fd6600] hover:text-[#e4a74b] transition-colors animate-fade-in"
          >
            Apply to be a Driver <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}