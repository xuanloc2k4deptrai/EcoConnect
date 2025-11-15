import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import { CarbonTransaction } from '@/types';
import { formatDate } from '@/lib/utils';

interface TransactionHistoryProps {
  transactions: CarbonTransaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const [filter, setFilter] = useState<'all' | 'earn' | 'spend' | 'offset'>('all');

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earn':
        return '📈';
      case 'spend':
        return '💸';
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

  const getTransactionBg = (type: string) => {
    switch (type) {
      case 'earn':
        return 'bg-green-50 border-green-200';
      case 'spend':
        return 'bg-red-50 border-red-200';
      case 'offset':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'earn':
        return 'Tiến';
      case 'spend':
        return 'Chi';
      case 'offset':
        return 'Bù trừ';
      default:
        return type;
    }
  };

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">📊 Lịch sử giao dịch</h3>
          <div className="flex gap-2">
            {['all', 'earn', 'offset', 'spend'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as any)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filter === type
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'Tất cả' : getTypeLabel(type)}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardBody>
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💭</div>
            <p className="text-gray-500 font-medium">Chưa có giao dịch nào</p>
            <p className="text-sm text-gray-400 mt-2">Bắt đầu mua credits hoặc bù trừ carbon ngay!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className={`flex items-center justify-between p-4 border-2 rounded-xl hover:shadow-md transition-all group ${getTransactionBg(transaction.type)}`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">
                      {transaction.description}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {transaction.source}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(transaction.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={getVariant(transaction.type)} size="sm">
                    {getTypeLabel(transaction.type)}
                  </Badge>
                  <div className={`text-xl font-bold ${getTransactionColor(transaction.type)}`}>
                    {transaction.type === 'earn' ? '+' : '-'}
                    {Math.abs(transaction.amount).toLocaleString()}
                    <span className="text-sm ml-1">kg</span>
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
