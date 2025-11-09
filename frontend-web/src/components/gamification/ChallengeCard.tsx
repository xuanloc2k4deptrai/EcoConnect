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
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <div className="text-xs text-yellow-800 mb-1">Points</div>
            <div className="text-xl font-bold text-yellow-900">
              +{challenge.points}
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="text-xs text-green-800 mb-1">Carbon Credits</div>
            <div className="text-xl font-bold text-green-900">
              +{challenge.carbonCredits} kg
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Goal</div>
          <div className="font-semibold text-gray-900">
            {challenge.requirements.target} {challenge.requirements.unit}
          </div>
        </div>

        {/* Participants Progress */}
        {challenge.maxParticipants && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Participants</span>
              <span>
                {challenge.participants} / {challenge.maxParticipants}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Duration */}
        <div className="text-xs text-gray-500 mb-4">
          {formatDate(challenge.duration.startDate)} -{' '}
          {formatDate(challenge.duration.endDate)}
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          {isEnrolled ? (
            <Link href={`/challenges/${challenge._id}`}>
              <Button variant="outline" size="sm" className="w-full">
                View Progress
              </Button>
            </Link>
          ) : challenge.status === 'active' ? (
            <Button
              onClick={() => onEnroll && onEnroll(challenge._id)}
              variant="primary"
              size="sm"
              className="w-full"
              disabled={
                challenge.maxParticipants
                  ? challenge.participants >= challenge.maxParticipants
                  : false
              }
            >
              {challenge.maxParticipants &&
              challenge.participants >= challenge.maxParticipants
                ? 'Full'
                : 'Enroll Now'}
            </Button>
          ) : (
            <Badge variant={getStatusColor(challenge.status)} className="w-full justify-center">
              {challenge.status === 'upcoming' ? 'Coming Soon' : 'Ended'}
            </Badge>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default ChallengeCard;
