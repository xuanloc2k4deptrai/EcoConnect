import React from 'react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { getESGColor, getESGBgColor } from '@/lib/utils';

interface MetricsCardProps {
  title: string;
  value: number;
  unit?: string;
  target?: number;
  category: 'environmental' | 'social' | 'governance';
  icon?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  unit = '',
  target,
  category,
  icon = '📊',
}) => {
  const percentage = target ? Math.min((value / target) * 100, 100) : value;
  const score = typeof value === 'number' ? value : 0;
  const isOnTrack = target ? value >= target * 0.9 : score >= 70;

  const categoryColors = {
    environmental: 'bg-green-500',
    social: 'bg-blue-500',
    governance: 'bg-purple-500',
  };

  const categoryGradients = {
    environmental: 'from-green-500 to-emerald-600',
    social: 'from-blue-500 to-cyan-600',
    governance: 'from-purple-500 to-pink-600',
  };

  const getStatusBadge = () => {
    if (score >= 80) return { label: 'Xuất sắc', color: 'bg-green-100 text-green-700 border-green-300' };
    if (score >= 60) return { label: 'Tốt', color: 'bg-blue-100 text-blue-700 border-blue-300' };
    if (score >= 40) return { label: 'Trung bình', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' };
    return { label: 'Cần cải thiện', color: 'bg-red-100 text-red-700 border-red-300' };
  };

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-600 mb-2">{title}</div>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold text-gray-900">
                {value.toLocaleString()}
              </div>
              {unit && <span className="text-lg text-gray-500 font-medium">{unit}</span>}
            </div>
            {target && (
              <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <span>Mục tiêu: <strong>{target.toLocaleString()}{unit}</strong></span>
              </div>
            )}
          </div>
          <div className="text-5xl">{icon}</div>
        </div>

        {/* Progress Bar */}
        {target && (
          <div className="mt-4">
            <div className="flex justify-between text-xs font-medium text-gray-600 mb-2">
              <span>Tiến độ</span>
              <span className="font-bold text-gray-900">{percentage.toFixed(0)}%</span>
            </div>
            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full bg-gradient-to-r ${categoryGradients[category]} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Score Badge (if no target) */}
        {!target && score <= 100 && (
          <div className="mt-4">
            <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusBadge().color}`}>
              {getStatusBadge().label}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default MetricsCard;
