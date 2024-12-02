import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, ExternalLink, UtensilsCrossed, ShieldCheck } from 'lucide-react';

export function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'driver' | 'customer' | 'admin') => {
    switch (role) {
      case 'driver':
        navigate('/driver-auth');
        break;
      case 'admin':
        navigate('/admin/login');
        break;
      default:
        navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9e7cf]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-12">
          <img 
            src="/huskie-icon.png" 
            alt="HuskieEats Mascot" 
            className="h-24 w-auto mb-8"
          />
          <h2 className="text-3xl font-bold text-center text-[#040084]">
            How Will You Be Using HuskieEats Today?
          </h2>
        </div>

        {/* Role Selection Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <button
            onClick={() => handleRoleSelect('customer')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <UtensilsCrossed className="w-16 h-16 text-[#fd6600] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-[#040084]">I'm an Eater</h3>
            <p className="text-gray-600">Get Your Favorite Food Delivered Right to Your Lunch Period</p>
          </button>

          <button
            onClick={() => handleRoleSelect('driver')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Car className="w-16 h-16 text-[#fd6600] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-[#040084]">I'm a Driver</h3>
            <p className="text-gray-600">Make Money Delivering Food During Your Free Periods</p>
          </button>

          <button
            onClick={() => handleRoleSelect('admin')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ShieldCheck className="w-16 h-16 text-[#fd6600] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-[#040084]">I'm an Admin</h3>
            <p className="text-gray-600">Manage Users, Orders, and Driver Assignments</p>
          </button>
        </div>

        {/* Post-it Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Eater Post-it */}
          <div className="relative bg-yellow-50 p-8 rounded-lg shadow-md transform rotate-1 hover:rotate-0 transition-transform duration-300"
               style={{
                 backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, #e5e5e5 28px)',
                 backgroundPosition: '0 5px'
               }}>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-yellow-200/50 rounded"></div>
            <h3 className="text-xl font-bold mb-6 inline-flex items-center gap-2">
              <span className="relative inline-block">
                Why Eat? <span className="text-2xl">🍽️</span>
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-[#e4a74b]/30"></span>
              </span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </span>
                <span><strong>Guaranteed Delivery</strong> to Your Lunch Period</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </span>
                <span><strong>Fixed $3 Delivery Fee</strong> - No Hidden Charges</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </span>
                <span><strong>Trusted Student Drivers</strong> You Know From School</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </span>
                <span><strong>School-Verified System</strong> for Safety and Reliability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </span>
                <span><strong>Real-Time Tracking</strong> of Your Order's Status</span>
              </li>
            </ul>
          </div>

          {/* Driver Post-it */}
          <div className="relative bg-blue-50 p-8 rounded-lg shadow-md transform -rotate-1 hover:rotate-0 transition-transform duration-300"
               style={{
                 backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, #e5e5e5 28px)',
                 backgroundPosition: '0 5px'
               }}>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-blue-200/50 rounded"></div>
            <h3 className="text-xl font-bold mb-6 inline-flex items-center gap-2">
              <span className="relative inline-block">
                Why Drive? <span className="text-2xl">🚗</span>
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-[#e4a74b]/30"></span>
              </span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </span>
                <span><strong>Earn $15-20 Per Delivery</strong> During Your Free Periods</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </span>
                <span><strong>One Trip, One Order</strong> - No Multiple Stops</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </span>
                <span><strong>Flexible Schedule</strong> - Work When You Want</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </span>
                <span><strong>Weekly Payments</strong> Directly to Your Account</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </span>
                <span><strong>School-Approved Program</strong> With Verified Status</span>
              </li>
            </ul>

            <div className="flex justify-center mt-8">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdNINtzojmuiyFqKhqjBW1t0mwjVnyFwVRlQRwTGXWLFFdw9g/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#fd6600] text-white rounded-full hover:bg-[#e4a74b] transition-colors shadow-md hover:shadow-lg"
              >
                Apply to Be a Driver <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}