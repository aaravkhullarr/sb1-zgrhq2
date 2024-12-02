import React from 'react';
import { Check, X } from 'lucide-react';

export function ComparisonSection() {
  const comparisons = [
    {
      feature: 'Delivery Time',
      huskieats: 'Guaranteed delivery to your lunch period',
      ubereats: 'Unpredictable delivery times',
      icon: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?auto=format&fit=crop&w=300&h=200'
    },
    {
      feature: 'Delivery Fee',
      huskieats: 'Fixed $3 fee, no surprises',
      ubereats: 'Variable fees + service charges',
      icon: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=300&h=200'
    },
    {
      feature: 'Drivers',
      huskieats: 'Fellow students you know and trust',
      ubereats: 'Unknown drivers',
      icon: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&h=200'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#040084]">
          uber eats isn't the ideal food delivery app for high schoolers
        </h2>

        <div className="grid gap-12">
          {comparisons.map((item, index) => (
            <div 
              key={item.feature}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 0 ? '' : 'md:flex-row-reverse'
              }`}
            >
              <div className="relative">
                <img
                  src={item.icon}
                  alt={item.feature}
                  className="rounded-lg shadow-xl w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#040084]/10 to-[#fd6600]/10 rounded-lg"></div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#040084] mb-4">{item.feature}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#fd6600]">huskieats</p>
                      <p className="text-gray-600">{item.huskieats}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                      <X className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-400">uber eats</p>
                      <p className="text-gray-600">{item.ubereats}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}