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

  const categoryColors = {
    environmental: 'bg-green-500',
    social: 'bg-blue-500',
    governance: 'bg-purple-500',
  };

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">{title}</div>
            <div className="text-3xl font-bold text-gray-900">
              {value.toLocaleString()}
              {unit && <span className="text-lg text-gray-500 ml-1">{unit}</span>}
            </div>
            {target && (
              <div className="text-sm text-gray-500 mt-1">
                Target: {target.toLocaleString()}
                {unit}
              </div>
            )}
          </div>
          <div className="text-4xl">{icon}</div>
        </div>

        {/* Progress Bar */}
        {target && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${categoryColors[category]} transition-all duration-300`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Score Badge (if no target) */}
        {!target && score <= 100 && (
          <div className="mt-4">
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getESGBgColor(score)} ${getESGColor(score)}`}>
              {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Improvement'}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default MetricsCard;
