'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { formatCurrency } from '@/lib/utils';

interface OffsetCalculatorProps {
  onOffset: (amount: number) => void;
  currentBalance: number;
}

const OffsetCalculator: React.FC<OffsetCalculatorProps> = ({ onOffset, currentBalance }) => {
  const [mode, setMode] = useState<'offset' | 'buy'>('offset');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [calculatedOffset, setCalculatedOffset] = useState(0);
  const [buyAmount, setBuyAmount] = useState('');

  const CREDIT_PRICE = 50000; // 50,000 VNĐ per kg CO₂

  const activities = [
    { id: 'flight-short', label: 'Bay ngắn (< 1500km)', co2: 150, icon: '✈️' },
    { id: 'flight-medium', label: 'Bay trung (1500-4000km)', co2: 500, icon: '🛫' },
    { id: 'flight-long', label: 'Bay dài (> 4000km)', co2: 1200, icon: '🌏' },
    { id: 'car-month', label: 'Xe hơi (1 tháng)', co2: 200, icon: '🚗' },
    { id: 'home-month', label: 'Điện nhà (1 tháng)', co2: 300, icon: '🏠' },
    { id: 'custom', label: 'Tùy chỉnh', co2: 0, icon: '⚙️' },
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

  const handleBuyCredits = () => {
    const amount = parseFloat(buyAmount);
    if (amount > 0) {
      const totalCost = amount * CREDIT_PRICE;
      if (window.confirm(`Mua ${amount} kg CO₂ credits với giá ${formatCurrency(totalCost)}?`)) {
        alert('Chức năng mua credits sẽ được tích hợp sau!\n\nBạn đã chọn mua: ' + amount + ' kg CO₂');
        setBuyAmount('');
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Quản lý Credits</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('buy')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'buy'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              💰 Mua
            </button>
            <button
              onClick={() => setMode('offset')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'offset'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🌱 Bù trừ
            </button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        {mode === 'buy' ? (
          <div className="space-y-4">
            {/* Buy Credits Form */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💎</span>
                <h4 className="font-semibold text-gray-900">Mua Carbon Credits</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Mua credits để bù trừ dấu chân carbon hoặc hỗ trợ các dự án xanh
              </p>
              
              <div className="space-y-3">
                <Input
                  type="number"
                  label="Số lượng (kg CO₂)"
                  placeholder="Nhập số kg CO₂"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                />
                
                {buyAmount && parseFloat(buyAmount) > 0 && (
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Số lượng:</span>
                      <span className="font-semibold">{parseFloat(buyAmount).toLocaleString()} kg CO₂</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Đơn giá:</span>
                      <span className="font-semibold">{formatCurrency(CREDIT_PRICE)}/kg</span>
                    </div>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">Tổng cộng:</span>
                      <span className="text-xl font-bold text-primary-600">
                        {formatCurrency(parseFloat(buyAmount) * CREDIT_PRICE)}
                      </span>
                    </div>
                  </div>
                )}
                
                <Button
                  onClick={handleBuyCredits}
                  disabled={!buyAmount || parseFloat(buyAmount) <= 0}
                  className="w-full"
                  size="lg"
                >
                  💳 Mua ngay {buyAmount && parseFloat(buyAmount) > 0 && `(${parseFloat(buyAmount).toLocaleString()} kg)`}
                </Button>
              </div>
            </div>

            {/* Quick Buy Options */}
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-3">🎯 Gói nhanh</h5>
              <div className="grid grid-cols-2 gap-3">
                {[100, 250, 500, 1000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setBuyAmount(amount.toString())}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all group"
                  >
                    <div className="text-2xl font-bold text-gray-900 group-hover:text-primary-600">
                      {amount}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">kg CO₂</div>
                    <div className="text-sm font-semibold text-primary-600 mt-2">
                      {formatCurrency(amount * CREDIT_PRICE)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center bg-gray-50 p-3 rounded-lg">
              💡 Credits được sử dụng để bù trừ carbon và hỗ trợ các dự án môi trường
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Current Balance Display */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Số dư khả dụng</div>
                  <div className="text-3xl font-bold text-green-600 mt-1">
                    {currentBalance.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">kg CO₂ credits</div>
                </div>
                <div className="text-5xl">💳</div>
              </div>
            </div>

            {/* Activity Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                🎯 Chọn hoạt động cần bù trừ
              </label>
              <div className="grid grid-cols-1 gap-2">
                {activities.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => handleActivitySelect(activity.id)}
                    className={`p-4 border-2 rounded-xl text-left transition-all group ${
                      selectedActivity === activity.id
                        ? 'border-green-600 bg-green-50 shadow-md'
                        : 'border-gray-200 hover:border-green-400 hover:bg-green-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{activity.icon}</span>
                        <div>
                          <div className="font-medium text-sm text-gray-900">{activity.label}</div>
                          {activity.co2 > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              ~{activity.co2.toLocaleString()} kg CO₂
                            </div>
                          )}
                        </div>
                      </div>
                      {selectedActivity === activity.id && (
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
            </div>
          </div>

            </div>

            {/* Custom Amount Input */}
            {selectedActivity === 'custom' && (
              <Input
                type="number"
                label="Số lượng CO₂ tùy chỉnh (kg)"
                placeholder="Nhập số kg CO₂"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
              />
            )}

            {/* Calculated Result */}
            {calculatedOffset > 0 && (
              <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-green-800 font-medium">
                      Lượng carbon cần bù trừ
                    </div>
                    <div className="text-4xl font-bold text-green-900 mt-2">
                      {calculatedOffset.toLocaleString()} kg CO₂
                    </div>
                  </div>
                  <div className="text-6xl">🌱</div>
                </div>
                <div className="bg-white rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tương đương trồng</span>
                    <span className="font-bold text-green-700">{Math.ceil(calculatedOffset / 20)} cây xanh</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 rounded-lg p-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>Bù trừ này sẽ hỗ trợ các dự án năng lượng tái tạo và trồng cây xanh</span>
                </div>
              </div>
            )}

            {/* Offset Button */}
            <Button
              onClick={handleOffset}
              disabled={calculatedOffset === 0 || calculatedOffset > currentBalance}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              size="lg"
            >
              {calculatedOffset > currentBalance ? (
                <>⚠️ Không đủ credits</>
              ) : (
                <>🌱 Bù trừ {calculatedOffset > 0 && `${calculatedOffset.toLocaleString()} kg CO₂`}</>
              )}
            </Button>

            {calculatedOffset > currentBalance && (
              <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-lg border border-red-200">
                ⚠️ Bạn cần thêm {(calculatedOffset - currentBalance).toLocaleString()} kg credits. Hãy mua thêm!
              </div>
            )}

            {/* Info */}
            <div className="text-xs text-gray-500 text-center bg-gray-50 p-3 rounded-lg">
              💡 Credits sẽ được trừ khỏi số dư của bạn. Kiếm credits bằng cách hoàn thành thử thách và mua sản phẩm xanh.
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default OffsetCalculator;
