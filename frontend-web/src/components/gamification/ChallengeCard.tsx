import React from 'react';
import Link from 'next/link';
import { Card, CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Challenge } from '@/types';
import { formatDate } from '@/lib/utils';

interface ChallengeCardProps {
  challenge: Challenge;
  onEnroll?: (id: string) => void;
  isEnrolled?: boolean;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  onEnroll,
  isEnrolled = false,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'upcoming':
        return 'info';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  const progressPercentage = challenge.maxParticipants
    ? (challenge.participants / challenge.maxParticipants) * 100
    : 0;

  return (
    <Card hover className="h-full flex flex-col">
      <CardBody className="flex-grow">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-2">{challenge.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{challenge.description}</p>
          </div>
          {challenge.badge && (
            <div className="ml-2 text-4xl">{challenge.badge.image}</div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant={getStatusColor(challenge.status)} size="sm">
            {challenge.status.toUpperCase()}
          </Badge>
          <Badge variant={getDifficultyColor(challenge.difficulty)} size="sm">
            {challenge.difficulty.toUpperCase()}
          </Badge>
          <Badge variant="default" size="sm">
            {challenge.type}
          </Badge>
        </div>

        {/* Rewards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-3 rounded-lg border-2 border-yellow-200">
            <div className="text-xs text-yellow-700 mb-1 font-medium">⭐ Điểm</div>
            <div className="text-xl font-bold text-yellow-900">
              +{challenge.points}
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border-2 border-green-200">
            <div className="text-xs text-green-700 mb-1 font-medium">🌱 Credits</div>
            <div className="text-xl font-bold text-green-900">
              +{challenge.carbonCredits} kg
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
          <div className="text-xs text-blue-700 mb-1 font-medium">🎯 Mục tiêu</div>
          <div className="font-semibold text-blue-900">
            {challenge.requirements.target} {challenge.requirements.unit}
          </div>
        </div>

        {/* Participants Progress */}
        {challenge.maxParticipants && (
          <div className="mb-4">
            <div className="flex justify-between text-xs font-medium text-gray-600 mb-2">
              <span>👥 Người tham gia</span>
              <span className="text-primary-600">
                {challenge.participants.toLocaleString()} / {challenge.maxParticipants.toLocaleString()}
              </span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {!challenge.maxParticipants && (
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
            <span>👥</span>
            <span><strong>{challenge.participants.toLocaleString()}</strong> người đã tham gia</span>
          </div>
        )}

        {/* Duration */}
        <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
          <span>📅</span>
          <span>
            {formatDate(challenge.duration.startDate)} - {formatDate(challenge.duration.endDate)}
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          {isEnrolled ? (
            <Link href={`/challenges/${challenge._id}`}>
              <Button variant="outline" size="sm" className="w-full">
                📊 Xem tiến độ
              </Button>
            </Link>
          ) : challenge.status === 'active' ? (
            <Button
              onClick={() => onEnroll && onEnroll(challenge._id)}
              variant="primary"
              size="sm"
              className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
              disabled={
                challenge.maxParticipants
                  ? challenge.participants >= challenge.maxParticipants
                  : false
              }
            >
              {challenge.maxParticipants &&
              challenge.participants >= challenge.maxParticipants
                ? '✋ Đã đầy'
                : '🚀 Tham gia ngay'}
            </Button>
          ) : (
            <Badge variant={getStatusColor(challenge.status)} className="w-full justify-center py-2">
              {challenge.status === 'upcoming' ? '⏳ Sắp diễn ra' : '✅ Đã kết thúc'}
            </Badge>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default ChallengeCard;
