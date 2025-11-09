import React from 'react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import Badge from '../ui/Badge';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  points: number;
  carbonOffset: number;
  badges: number;
}

interface LeaderBoardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

const LeaderBoard: React.FC<LeaderBoardProps> = ({ entries, currentUserId }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300';
      case 3:
        return 'bg-gradient-to-r from-orange-100 to-orange-200 border-orange-300';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">🏆 Leaderboard</h3>
          <Badge variant="info" size="sm">
            Top 10
          </Badge>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.userId}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${getRankColor(
                entry.rank
              )} ${
                entry.userId === currentUserId
                  ? 'ring-2 ring-primary-500 ring-offset-2'
                  : ''
              }`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-12 h-12 text-2xl font-bold">
                {getRankIcon(entry.rank)}
              </div>

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                {entry.avatar ? (
                  <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg font-bold text-gray-600">
                    {entry.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="font-semibold text-gray-900 flex items-center gap-2">
                  {entry.name}
                  {entry.userId === currentUserId && (
                    <Badge variant="success" size="sm">
                      You
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {entry.carbonOffset.toLocaleString()} kg CO₂ offset • {entry.badges} badges
                </div>
              </div>

              {/* Points */}
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">
                  {entry.points.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Message */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Complete more challenges and offset carbon to climb the
            leaderboard and earn exclusive badges!
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default LeaderBoard;
