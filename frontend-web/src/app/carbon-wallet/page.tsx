'use client';

import React, { useState, useEffect } from 'react';
import TransactionHistory from '@/components/carbon/TransactionHistory';
import OffsetCalculator from '@/components/carbon/OffsetCalculator';
import ImpactVisualization from '@/components/carbon/ImpactVisualization';
import { Card, CardBody } from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { CarbonTransaction } from '@/types';
import { apiClient } from '@/lib/api';

export default function CarbonWalletPage() {
  const [balance, setBalance] = useState(0);
  const [totalOffset, setTotalOffset] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [transactions, setTransactions] = useState<CarbonTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Mock data for development
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockTransactions: CarbonTransaction[] = [
        {
          _id: '1',
          userId: 'user1',
          type: 'earn',
          amount: 50,
          source: 'Product Purchase',
          description: 'Mua sản phẩm xanh Organic Cotton T-Shirt',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '2',
          userId: 'user1',
          type: 'offset',
          amount: -100,
          source: 'Tree Planting',
          description: 'Trồng 10 cây xanh qua chương trình EcoForest',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '3',
          userId: 'user1',
          type: 'earn',
          amount: 30,
          source: 'Challenge Completed',
          description: 'Hoàn thành thử thách "Zero Waste Week"',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];

      setBalance(250);
      setTotalOffset(450);
      setTotalEarned(680);
      setTransactions(mockTransactions);
    } catch (error) {
      console.error('Failed to load carbon wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOffset = async (amount: number) => {
    try {
      await apiClient.offsetCarbon({ amount });
      loadData(); // Refresh data
      alert(`Successfully offset ${amount} kg CO₂!`);
    } catch (error) {
      alert('Failed to offset carbon. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-600 text-white py-16 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4">
              💰 Ví Carbon Credits
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Ví Carbon
            </h1>
            <p className="text-xl text-gray-100">
              Theo dõi, quản lý và bù trừ dấu chân carbon của bạn một cách dễ dàng
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium opacity-90">Số dư hiện tại</div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              {balance.toLocaleString()}
            </div>
            <div className="text-sm opacity-90">kg CO₂ credits</div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="text-xs opacity-75">Có sẵn để sử dụng</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium opacity-90">Tổng bù trừ</div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              {totalOffset.toLocaleString()}
            </div>
            <div className="text-sm opacity-90">kg CO₂ offset</div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="text-xs opacity-75">Tương đương {Math.round(totalOffset / 21)} cây xanh</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium opacity-90">Tổng tích lũy</div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              {totalEarned.toLocaleString()}
            </div>
            <div className="text-sm opacity-90">kg CO₂ earned</div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="text-xs opacity-75">Từ hành động xanh</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ImpactVisualization totalOffset={totalOffset} totalEarned={totalEarned} />
            <TransactionHistory transactions={transactions} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <OffsetCalculator onOffset={handleOffset} currentBalance={balance} />
          </div>
        </div>
      </div>
    </div>
  );
}
