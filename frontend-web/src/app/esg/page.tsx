'use client';

import React, { useState } from 'react';
import ESGScore from '@/components/esg/ESGScore';
import MetricsCard from '@/components/esg/MetricsCard';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ESGDashboardPage() {
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('month');

  // Mock ESG Data
  const esgData = {
    overall: 78,
    environmental: 85,
    social: 72,
    governance: 77,
  };

  const environmentalMetrics = [
    {
      title: 'Carbon Emissions',
      value: 1250,
      unit: 'tons',
      target: 1000,
      category: 'environmental' as const,
      icon: '🏭',
    },
    {
      title: 'Water Usage',
      value: 85000,
      unit: 'liters',
      target: 100000,
      category: 'environmental' as const,
      icon: '💧',
    },
    {
      title: 'Renewable Energy',
      value: 65,
      unit: '%',
      target: 80,
      category: 'environmental' as const,
      icon: '⚡',
    },
    {
      title: 'Waste Recycling',
      value: 72,
      unit: '%',
      target: 90,
      category: 'environmental' as const,
      icon: '♻️',
    },
  ];

  const socialMetrics = [
    {
      title: 'Employee Satisfaction',
      value: 8.2,
      unit: '/10',
      target: 9,
      category: 'social' as const,
      icon: '😊',
    },
    {
      title: 'Diversity Score',
      value: 68,
      unit: '%',
      target: 75,
      category: 'social' as const,
      icon: '👥',
    },
    {
      title: 'Training Hours',
      value: 4500,
      unit: 'hrs',
      target: 5000,
      category: 'social' as const,
      icon: '📚',
    },
    {
      title: 'Safety Incidents',
      value: 2,
      unit: 'cases',
      target: 0,
      category: 'social' as const,
      icon: '🛡️',
    },
  ];

  const governanceMetrics = [
    {
      title: 'Board Diversity',
      value: 45,
      unit: '%',
      target: 50,
      category: 'governance' as const,
      icon: '👔',
    },
    {
      title: 'Compliance Score',
      value: 92,
      unit: '%',
      target: 95,
      category: 'governance' as const,
      icon: '✅',
    },
    {
      title: 'Transparency Score',
      value: 88,
      unit: '%',
      target: 90,
      category: 'governance' as const,
      icon: '🔍',
    },
    {
      title: 'Ethics Training',
      value: 95,
      unit: '%',
      target: 100,
      category: 'governance' as const,
      icon: '⚖️',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-green-600 via-green-500 to-teal-600 text-white py-16 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4">
              📊 Real-time ESG Monitoring
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              ESG Performance Dashboard
            </h1>
            <p className="text-xl text-gray-100 mb-6">
              Theo dõi và đánh giá hiệu suất môi trường, xã hội và quản trị doanh nghiệp của bạn
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">{esgData.overall}</div>
                <div className="text-sm text-gray-200">Overall Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-green-300">{esgData.environmental}</div>
                <div className="text-sm text-gray-200">Environmental</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-blue-300">{esgData.social}</div>
                <div className="text-sm text-gray-200">Social</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-purple-300">{esgData.governance}</div>
                <div className="text-sm text-gray-200">Governance</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Timeframe Selector */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold text-gray-700">Timeframe:</span>
          </div>
          <div className="flex gap-2">
            {(['month', 'quarter', 'year'] as const).map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(period)}
                className="min-w-[80px]"
              >
                {period === 'month' ? '📅 Tháng' : period === 'quarter' ? '📆 Quý' : '📊 Năm'}
              </Button>
            ))}
          </div>
        </div>

        {/* ESG Score Overview */}
        <div className="mb-8">
          <ESGScore {...esgData} />
        </div>

        {/* Environmental Metrics */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-400 text-white rounded-t-xl p-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="text-3xl">🌱</span> 
              <span>Environmental Metrics</span>
            </h2>
            <p className="text-green-100 text-sm mt-1">Impact trên môi trường và tài nguyên thiên nhiên</p>
          </div>
          <div className="bg-white rounded-b-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {environmentalMetrics.map((metric, index) => (
                <MetricsCard key={index} {...metric} />
              ))}
            </div>
          </div>
        </div>

        {/* Social Metrics */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-t-xl p-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="text-3xl">👥</span>
              <span>Social Metrics</span>
            </h2>
            <p className="text-blue-100 text-sm mt-1">Tác động xã hội và phát triển nhân sự</p>
          </div>
          <div className="bg-white rounded-b-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {socialMetrics.map((metric, index) => (
                <MetricsCard key={index} {...metric} />
              ))}
            </div>
          </div>
        </div>

        {/* Governance Metrics */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-t-xl p-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="text-3xl">⚖️</span>
              <span>Governance Metrics</span>
            </h2>
            <p className="text-purple-100 text-sm mt-1">Quản trị doanh nghiệp và tuân thủ</p>
          </div>
          <div className="bg-white rounded-b-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {governanceMetrics.map((metric, index) => (
                <MetricsCard key={index} {...metric} />
              ))}
            </div>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <span className="text-3xl">💡</span>
              <span>AI-Powered Insights & Recommendations</span>
            </h3>
            <p className="text-amber-100 text-sm mt-1">Phân tích thông minh và đề xuất cải tiến</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg text-green-900 mb-2">Điểm mạnh nổi bật</div>
                    <div className="text-green-700 leading-relaxed">
                      Chỉ số môi trường <span className="font-semibold">85 điểm</span> vượt trung bình ngành. 
                      Duy trì phát triển năng lượng tái tạo và giảm phát thải carbon!
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Tăng 12% so với quý trước</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-xl hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg text-yellow-900 mb-2">Cơ hội cải thiện</div>
                    <div className="text-yellow-700 leading-relaxed">
                      Tăng cường các sáng kiến đa dạng hóa để đạt mục tiêu 75%. 
                      Tập trung vào tuyển dụng bao trùm và phát triển nhân tài nội bộ.
                    </div>
                    <div className="mt-3">
                      <button className="text-sm font-medium text-yellow-700 hover:text-yellow-900 flex items-center gap-2">
                        Xem kế hoạch hành động
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg text-blue-900 mb-2">So sánh ngành</div>
                    <div className="text-blue-700 leading-relaxed">
                      Hiệu suất quản trị cao hơn <span className="font-semibold">12%</span> so với trung bình ngành. 
                      Điểm minh bạch của bạn đặc biệt ấn tượng và được các nhà đầu tư đánh giá cao!
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-blue-500/20 rounded-lg p-2 text-center">
                        <div className="font-bold text-blue-900">Top 15%</div>
                        <div className="text-blue-700">Xếp hạng</div>
                      </div>
                      <div className="bg-blue-500/20 rounded-lg p-2 text-center">
                        <div className="font-bold text-blue-900">A+</div>
                        <div className="text-blue-700">Rating</div>
                      </div>
                      <div className="bg-blue-500/20 rounded-lg p-2 text-center">
                        <div className="font-bold text-blue-900">88/100</div>
                        <div className="text-blue-700">Điểm số</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
