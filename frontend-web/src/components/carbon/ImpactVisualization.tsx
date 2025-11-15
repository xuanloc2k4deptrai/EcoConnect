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
              className={`${impact.bgColor} border-2 ${impact.borderColor} p-5 rounded-xl hover:shadow-lg transition-all group cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-5xl group-hover:scale-110 transition-transform">{impact.icon}</span>
                <div className="text-right">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${impact.color} bg-clip-text text-transparent`}>
                    {impact.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{impact.subtitle}</div>
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-700">{impact.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl border-2 border-green-200">
          <div className="text-center">
            <div className="text-3xl mb-3">🏆</div>
            <div className="text-xl font-bold text-gray-900 mb-2">
              Tiếp tục phát huy! 🌍
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              Hành động của bạn đang tạo ra sự khác biệt thực sự trong cuộc chiến chống biến đổi khí hậu.
              Bạn đã tích lũy <strong className="text-green-600">{totalEarned.toLocaleString()} kg</strong> credits
              qua các hoạt động xanh!
            </div>
          </div>
        </div>

        {/* Progress to Next Milestone */}
        <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <span className="font-semibold text-gray-900">Tiến độ đến 1 Tấn CO₂</span>
            </div>
            <span className="text-lg font-bold text-primary-600">
              {((totalOffset / 1000) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transition-all duration-500 relative overflow-hidden"
              style={{ width: `${Math.min((totalOffset / 1000) * 100, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
            {totalOffset >= 1000 ? (
              <>
                <span className="text-2xl">🎉</span>
                <span className="font-semibold text-green-600">
                  Mốc tiêu hoàn thành! Bạn đã bù trừ 1 tấn CO₂!
                </span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
                <span>
                  Chỉ còn <strong className="text-primary-600">{(1000 - totalOffset).toLocaleString()} kg</strong> nữa là đạt 1 tấn!
                </span>
              </>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ImpactVisualization;
