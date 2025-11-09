'use client';

import React, { useState } from 'react';
import ChallengeCard from '@/components/gamification/ChallengeCard';
import LeaderBoard from '@/components/gamification/LeaderBoard';
import AchievementBadges from '@/components/gamification/AchievementBadges';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Badge } from '@/types';

export default function ChallengesPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming'>('active');
  const [loading, setLoading] = useState(false);
  
  // Mock challenges data
  const mockChallenges: any[] = [
    {
      _id: '1',
      title: 'Zero Waste Week',
      description: 'Giảm rác thải xuống 0 trong 7 ngày liên tiếp',
      type: 'weekly',
      category: 'Waste Reduction',
      difficulty: 'medium',
      points: 500,
      carbonCredits: 50,
      requirements: {
        type: 'waste_reduction',
        target: 0,
        unit: 'kg'
      },
      duration: {
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      participants: 1243,
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      title: 'Green Commute Challenge',
      description: 'Sử dụng phương tiện xanh trong 30 ngày',
      type: 'monthly',
      category: 'Transportation',
      difficulty: 'easy',
      points: 300,
      carbonCredits: 30,
      requirements: {
        type: 'green_commute',
        target: 30,
        unit: 'days'
      },
      duration: {
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      participants: 2567,
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: '3',
      title: 'Plant a Tree',
      description: 'Trồng ít nhất 5 cây xanh trong tháng này',
      type: 'monthly',
      category: 'Reforestation',
      difficulty: 'easy',
      points: 400,
      carbonCredits: 100,
      requirements: {
        type: 'tree_planting',
        target: 5,
        unit: 'trees'
      },
      duration: {
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      participants: 3421,
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: '4',
      title: 'Plastic Free July',
      description: 'Tránh sử dụng nhựa một lần trong cả tháng 7',
      type: 'monthly',
      category: 'Plastic Reduction',
      difficulty: 'hard',
      points: 800,
      carbonCredits: 80,
      requirements: {
        type: 'plastic_free',
        target: 30,
        unit: 'days'
      },
      duration: {
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      participants: 892,
      status: 'active',
      createdAt: new Date().toISOString()
    }
  ];
  
  const challenges = mockChallenges;

  // Mock data for leaderboard and badges
  const leaderboardData = [
    { rank: 1, userId: '1', name: 'Alice Green', points: 15420, carbonOffset: 2500, badges: 24 },
    { rank: 2, userId: '2', name: 'Bob Eco', points: 12350, carbonOffset: 2100, badges: 19 },
    { rank: 3, userId: '3', name: 'Charlie Nature', points: 10890, carbonOffset: 1800, badges: 16 },
    { rank: 4, userId: '4', name: 'Diana Earth', points: 9750, carbonOffset: 1600, badges: 14 },
    { rank: 5, userId: '5', name: 'Eve Forest', points: 8920, carbonOffset: 1450, badges: 13 },
  ];

  const userBadges: Badge[] = [
    {
      id: '1',
      name: 'Eco Warrior',
      description: 'Complete 10 environmental challenges',
      image: '🌍',
      category: 'environmental',
      rarity: 'epic',
      earnedAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Carbon Crusher',
      description: 'Offset 1000kg of CO₂',
      image: '💪',
      category: 'carbon',
      rarity: 'rare',
      earnedAt: '2024-02-20',
    },
    {
      id: '3',
      name: 'Green Shopper',
      description: 'Purchase 20 eco-friendly products',
      image: '🛒',
      category: 'marketplace',
      rarity: 'common',
      earnedAt: '2024-03-10',
    },
  ];

  const handleEnroll = async (challengeId: string) => {
    try {
      // Mock enrollment
      alert('Đăng ký thử thách thành công! 🎉');
    } catch (error: any) {
      alert(error.message);
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 text-white py-16 mb-8 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4">
              🏆 Cộng đồng xanh toàn cầu
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Thử thách Xanh
            </h1>
            <p className="text-xl text-gray-100 mb-6">
              Tham gia thử thách, tích điểm thưởng và tạo ra sự khác biệt cho hành tinh
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">45</div>
                <div className="text-sm text-gray-200">Thử thách</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">12K+</div>
                <div className="text-sm text-gray-200">Người tham gia</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">250K</div>
                <div className="text-sm text-gray-200">Điểm</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">50 tấn</div>
                <div className="text-sm text-gray-200">CO₂ tiết kiệm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md p-2 mb-8 inline-flex gap-2">
          {[
            { key: 'all', label: '📋 Tất cả', icon: '📋' },
            { key: 'active', label: '🔥 Đang diễn ra', icon: '🔥' },
            { key: 'upcoming', label: '📅 Sắp tới', icon: '📅' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                filter === tab.key
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg scale-105'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Challenges */}
          <div className="lg:col-span-2 space-y-8">
            {/* Challenges Grid */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span>🎯</span>
                    Thử thách có sẵn
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">{challenges.length} thử thách đang chờ bạn</p>
                </div>
                <div className="text-sm text-gray-500">
                  Lọc: <span className="font-semibold text-primary-600">{filter}</span>
                </div>
              </div>
              
              {challenges.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">😔</span>
                  </div>
                  <p className="text-gray-600 font-medium">Không có thử thách nào</p>
                  <p className="text-gray-500 text-sm mt-1">Hãy quay lại sau!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {challenges.map((challenge) => (
                    <ChallengeCard
                      key={challenge._id}
                      challenge={challenge}
                      onEnroll={handleEnroll}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Achievement Badges */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                <span>🏅</span>
                Huy hiệu của bạn
              </h2>
              <AchievementBadges badges={userBadges} />
            </div>
          </div>

          {/* Sidebar - Leaderboard */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                <span>👑</span>
                Bảng xếp hạng
              </h2>
              <LeaderBoard entries={leaderboardData} currentUserId="4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
