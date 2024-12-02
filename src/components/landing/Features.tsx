import React from 'react';
import { Clock, Users, MapPin, Shield, CreditCard, Phone } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'fast delivery',
    description: 'get your food delivered right to your lunch period',
    color: 'bg-orange-100'
  },
  {
    icon: Users,
    title: 'student drivers',
    description: 'trusted delivery by your fellow huskies',
    color: 'bg-blue-100'
  },
  {
    icon: MapPin,
    title: 'local restaurants',
    description: 'your favorite spots near campus',
    color: 'bg-green-100'
  },
  {
    icon: Shield,
    title: 'safe & secure',
    description: 'school-verified delivery system',
    color: 'bg-purple-100'
  },
  {
    icon: CreditCard,
    title: 'easy payments',
    description: 'simple and secure transaction process',
    color: 'bg-pink-100'
  },
  {
    icon: Phone,
    title: 'real-time updates',
    description: 'track your order every step of the way',
    color: 'bg-yellow-100'
  }
];

export function Features() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 
          className="text-4xl font-bold text-center mb-16 text-[#040084]"
          style={{ fontFamily: '"Cocomat Pro", sans-serif' }}
        >
          why choose huskieats?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group hover:-translate-y-2 transition-all duration-300 ease-in-out"
            >
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className={`w-16 h-16 mb-6 rounded-full ${feature.color} flex items-center justify-center group-hover:bg-[#fd6600] transition-colors duration-300`}>
                  <feature.icon className="w-8 h-8 text-[#fd6600] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#040084]">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}