import React from 'react';
import { Card, CardHeader, CardBody } from '../ui/Card';

interface ImpactVisualizationProps {
  totalOffset: number;
  totalEarned: number;
}

const ImpactVisualization: React.FC<ImpactVisualizationProps> = ({
  totalOffset,
  totalEarned,
}) => {
  const treesPlanted = Math.floor(totalOffset / 20);
  const carsOffRoad = Math.floor(totalOffset / 4600);
  const homesMonths = Math.floor(totalOffset / 300);
  const milesNotDriven = Math.floor(totalOffset / 0.4);

  const impacts = [
    {
      icon: '🌳',
      value: treesPlanted,
      label: 'Trees Planted Equivalent',
      color: 'bg-green-100 text-green-800',
    },
    {
      icon: '🚗',
      value: carsOffRoad,
      label: 'Cars Off Road (1 year)',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      icon: '🏠',
      value: homesMonths,
      label: 'Home Months Powered',
      color: 'bg-purple-100 text-purple-800',
    },
    {
      icon: '🛣️',
      value: milesNotDriven.toLocaleString(),
      label: 'Miles Not Driven',
      color: 'bg-orange-100 text-orange-800',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Your Environmental Impact</h3>
      </CardHeader>
      <CardBody>
        <div className="mb-6 text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {totalOffset.toLocaleString()} kg CO₂
          </div>
          <div className="text-sm text-gray-600">Total Carbon Offset</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${impact.color}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{impact.icon}</span>
                <span className="text-2xl font-bold">{impact.value}</span>
              </div>
              <div className="text-sm font-medium">{impact.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 mb-1">
              Keep Up the Great Work! 🌍
            </div>
            <div className="text-sm text-gray-600">
              Your efforts are making a real difference in fighting climate change.
              You've earned <strong>{totalEarned.toLocaleString()} kg</strong> of carbon
              credits through eco-friendly actions!
            </div>
          </div>
        </div>

        {/* Progress to Next Milestone */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress to 1 Ton CO₂ Offset</span>
            <span>{((totalOffset / 1000) * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${Math.min((totalOffset / 1000) * 100, 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {totalOffset >= 1000
              ? '🎉 Milestone reached! You\'ve offset 1 ton of CO₂!'
              : `Only ${(1000 - totalOffset).toLocaleString()} kg more to reach 1 ton!`}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ImpactVisualization;
