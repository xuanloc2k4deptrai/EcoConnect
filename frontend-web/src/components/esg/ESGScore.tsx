'use client';

import React from 'react';
import { Card, CardHeader, CardBody } from '../ui/Card';

interface ScoreCircleProps {
  label: string;
  score: number;
  color: string;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ label, score, color }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="transform -rotate-90 w-32 h-32">
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-xs text-gray-500">/ 100</div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-sm font-medium text-gray-700">{label}</div>
    </div>
  );
};

interface ESGScoreProps {
  overall: number;
  environmental: number;
  social: number;
  governance: number;
}

const ESGScore: React.FC<ESGScoreProps> = ({
  overall,
  environmental,
  social,
  governance,
}) => {
  const getRating = (score: number) => {
    if (score >= 80) return { label: 'Xuất sắc', color: 'text-green-600', icon: '🏆' };
    if (score >= 60) return { label: 'Tốt', color: 'text-blue-600', icon: '⭐' };
    if (score >= 40) return { label: 'Trung bình', color: 'text-yellow-600', icon: '🟡' };
    return { label: 'Cần cải thiện', color: 'text-red-600', icon: '⚠️' };
  };

  const overallRating = getRating(overall);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">📊 Tổng quan điểm ESG</h3>
          <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 rounded-full border border-green-200">
            <span className="text-xl">{overallRating.icon}</span>
            <span className={`font-bold ${overallRating.color}`}>{overallRating.label}</span>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col md:flex-row items-center justify-around gap-8">
          {/* Overall Score - Larger */}
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="75"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="75"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 75}
                  strokeDashoffset={2 * Math.PI * 75 - (overall / 100) * 2 * Math.PI * 75}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">{overall}</div>
                  <div className="text-sm text-gray-500 font-medium mt-1">Tổng điểm</div>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <ScoreCircle label="Môi trường" score={environmental} color="#10b981" />
              <div className="mt-2 text-xs text-gray-500">Environmental</div>
            </div>
            <div className="text-center">
              <ScoreCircle label="Xã hội" score={social} color="#3b82f6" />
              <div className="mt-2 text-xs text-gray-500">Social</div>
            </div>
            <div className="text-center">
              <ScoreCircle label="Quản trị" score={governance} color="#8b5cf6" />
              <div className="mt-2 text-xs text-gray-500">Governance</div>
            </div>
          </div>
        </div>

        {/* Score Interpretation */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-xs font-medium text-gray-500 mb-3 text-center">📊 Thang đánh giá</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
              <div>
                <div className="text-sm font-semibold text-green-800">80-100</div>
                <div className="text-xs text-green-600">Xuất sắc</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div>
                <div className="text-sm font-semibold text-blue-800">60-79</div>
                <div className="text-xs text-blue-600">Tốt</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
              <div>
                <div className="text-sm font-semibold text-yellow-800">40-59</div>
                <div className="text-xs text-yellow-600">Trung bình</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-red-50 p-3 rounded-lg border border-red-200">
              <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
              <div>
                <div className="text-sm font-semibold text-red-800">0-39</div>
                <div className="text-xs text-red-600">Yếu</div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ESGScore;
