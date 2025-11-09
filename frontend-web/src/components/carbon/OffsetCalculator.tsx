'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface OffsetCalculatorProps {
  onOffset: (amount: number) => void;
}

const OffsetCalculator: React.FC<OffsetCalculatorProps> = ({ onOffset }) => {
  const [selectedActivity, setSelectedActivity] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [calculatedOffset, setCalculatedOffset] = useState(0);

  const activities = [
    { id: 'flight-short', label: 'Short Flight (< 1500km)', co2: 150 },
    { id: 'flight-medium', label: 'Medium Flight (1500-4000km)', co2: 500 },
    { id: 'flight-long', label: 'Long Flight (> 4000km)', co2: 1200 },
    { id: 'car-month', label: 'Car Usage (1 month)', co2: 200 },
    { id: 'home-month', label: 'Home Energy (1 month)', co2: 300 },
    { id: 'custom', label: 'Custom Amount', co2: 0 },
  ];

  const handleActivitySelect = (activityId: string) => {
    setSelectedActivity(activityId);
    const activity = activities.find((a) => a.id === activityId);
    if (activity && activityId !== 'custom') {
      setCalculatedOffset(activity.co2);
      setCustomAmount('');
    } else {
      setCalculatedOffset(0);
    }
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const amount = parseFloat(value);
    if (!isNaN(amount) && amount > 0) {
      setCalculatedOffset(amount);
    } else {
      setCalculatedOffset(0);
    }
  };

  const handleOffset = () => {
    if (calculatedOffset > 0) {
      onOffset(calculatedOffset);
      setSelectedActivity('');
      setCustomAmount('');
      setCalculatedOffset(0);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Carbon Offset Calculator</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {/* Activity Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Activity
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {activities.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => handleActivitySelect(activity.id)}
                  className={`p-3 border-2 rounded-lg text-left transition-colors ${
                    selectedActivity === activity.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="font-medium text-sm">{activity.label}</div>
                  {activity.co2 > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      ~{activity.co2} kg CO₂
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount Input */}
          {selectedActivity === 'custom' && (
            <Input
              type="number"
              label="Custom CO₂ Amount (kg)"
              placeholder="Enter amount in kg"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
            />
          )}

          {/* Calculated Result */}
          {calculatedOffset > 0 && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-green-800 font-medium">
                    Carbon to Offset
                  </div>
                  <div className="text-3xl font-bold text-green-900 mt-1">
                    {calculatedOffset.toLocaleString()} kg CO₂
                  </div>
                </div>
                <div className="text-4xl">🌱</div>
              </div>
              <div className="mt-3 text-sm text-green-700">
                Offsetting this amount will help plant approximately{' '}
                <strong>{Math.ceil(calculatedOffset / 20)}</strong> trees or support renewable
                energy projects.
              </div>
            </div>
          )}

          {/* Offset Button */}
          <Button
            onClick={handleOffset}
            disabled={calculatedOffset === 0}
            className="w-full"
            size="lg"
          >
            Offset {calculatedOffset > 0 && `${calculatedOffset} kg CO₂`}
          </Button>

          {/* Info */}
          <div className="text-xs text-gray-500 text-center">
            Carbon credits will be deducted from your balance. You can earn credits by
            completing challenges and purchasing eco-friendly products.
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default OffsetCalculator;
