import React from 'react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import { CarbonTransaction } from '@/types';
import { formatDate } from '@/lib/utils';

interface TransactionHistoryProps {
  transactions: CarbonTransaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earn':
        return '⬆️';
      case 'spend':
        return '⬇️';
      case 'offset':
        return '🌱';
      default:
        return '💰';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earn':
        return 'text-green-600';
      case 'spend':
        return 'text-red-600';
      case 'offset':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getVariant = (type: string): 'success' | 'error' | 'info' | 'default' => {
    switch (type) {
      case 'earn':
        return 'success';
      case 'spend':
        return 'error';
      case 'offset':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Transaction History</h3>
      </CardHeader>
      <CardBody>
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No transactions yet</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-3xl">{getTransactionIcon(transaction.type)}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {transaction.description}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {transaction.source} • {formatDate(transaction.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={getVariant(transaction.type)} size="sm">
                    {transaction.type.toUpperCase()}
                  </Badge>
                  <div className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                    {transaction.type === 'earn' ? '+' : '-'}
                    {transaction.amount.toLocaleString()} kg
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default TransactionHistory;
