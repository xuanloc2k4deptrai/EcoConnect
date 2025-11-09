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
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">ESG Score Overview</h3>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col md:flex-row items-center justify-around gap-8">
          {/* Overall Score - Larger */}
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40">
              <svg className="transform -rotate-90 w-40 h-40">
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  stroke="url(#gradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 60}
                  strokeDashoffset={2 * Math.PI * 60 - (overall / 100) * 2 * Math.PI * 60}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600">{overall}</div>
                  <div className="text-sm text-gray-500">Overall</div>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Scores */}
          <div className="grid grid-cols-3 gap-6">
            <ScoreCircle label="Environmental" score={environmental} color="#10b981" />
            <ScoreCircle label="Social" score={social} color="#3b82f6" />
            <ScoreCircle label="Governance" score={governance} color="#8b5cf6" />
          </div>
        </div>

        {/* Score Interpretation */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">80-100: Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">60-79: Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">40-59: Fair</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">0-39: Poor</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ESGScore;
