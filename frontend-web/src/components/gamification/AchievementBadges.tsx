import React from 'react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import { Badge as BadgeType } from '@/types';

interface AchievementBadgesProps {
  badges: BadgeType[];
}

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ badges }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-purple-500 to-pink-500';
      case 'epic':
        return 'from-purple-400 to-indigo-500';
      case 'rare':
        return 'from-blue-400 to-cyan-500';
      case 'common':
        return 'from-gray-400 to-gray-500';
      default:
        return 'from-gray-300 to-gray-400';
    }
  };

  const getRarityBadgeVariant = (
    rarity: string
  ): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    switch (rarity) {
      case 'legendary':
        return 'error';
      case 'epic':
        return 'warning';
      case 'rare':
        return 'info';
      default:
        return 'success';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">🏅 Achievement Badges</h3>
          <Badge variant="default" size="sm">
            {badges.length} Earned
          </Badge>
        </div>
      </CardHeader>
      <CardBody>
        {badges.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-gray-600 mb-2">No badges earned yet</p>
            <p className="text-sm text-gray-500">
              Complete challenges to earn your first badge!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="group relative"
              >
                {/* Badge Card */}
                <div className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-all cursor-pointer transform hover:scale-105">
                  {/* Rarity Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(
                      badge.rarity
                    )} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity`}
                  />

                  {/* Badge Image */}
                  <div className="text-center mb-3">
                    <div className="text-5xl mb-2">{badge.image}</div>
                    <Badge variant={getRarityBadgeVariant(badge.rarity)} size="sm">
                      {badge.rarity}
                    </Badge>
                  </div>

                  {/* Badge Info */}
                  <div className="text-center">
                    <div className="font-semibold text-sm text-gray-900 mb-1">
                      {badge.name}
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-2">
                      {badge.description}
                    </div>
                    {badge.earnedAt && (
                      <div className="text-xs text-gray-400 mt-2">
                        Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tooltip on Hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {badge.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Categories Legend */}
        {badges.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm font-semibold text-gray-700 mb-3">Badge Rarities</div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Common</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Rare</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Epic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Legendary</span>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default AchievementBadges;
