/**
 * Carbon Impact Component - Shows user's carbon offset impact
 */

'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { FaTree, FaCar, FaHome } from 'react-icons/fa';

export default function CarbonImpact() {
  const impacts = [
    {
      icon: <FaTree className="w-8 h-8 text-green-600" />,
      value: '125',
      label: 'Trees Planted Equivalent',
      description: 'Your carbon offset equals planting 125 trees'
    },
    {
      icon: <FaCar className="w-8 h-8 text-blue-600" />,
      value: '2,500 km',
      label: 'Car Miles Offset',
      description: 'Equivalent to not driving a car for 2,500 km'
    },
    {
      icon: <FaHome className="w-8 h-8 text-orange-600" />,
      value: '3 months',
      label: 'Home Energy Saved',
      description: 'Equal to 3 months of household energy'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Environmental Impact</h2>
          <p className="text-gray-600">See the real-world impact of your eco-friendly choices</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impacts.map((impact, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {impact.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{impact.value}</h3>
              <p className="font-semibold text-gray-700 mb-2">{impact.label}</p>
              <p className="text-sm text-gray-600">{impact.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
