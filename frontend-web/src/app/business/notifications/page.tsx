'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Badge from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';

type NotificationType = 'order' | 'review' | 'stock' | 'system' | 'esg';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  priority: 'low' | 'medium' | 'high';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Đơn hàng mới #ORD-2024-006',
    message: 'Bạn có đơn hàng mới từ Nguyễn Văn A với tổng giá trị 850.000đ. Vui lòng xác nhận đơn hàng.',
    createdAt: '2024-01-15T14:30:00',
    read: false,
    actionUrl: '/business/orders',
    actionLabel: 'Xem đơn hàng',
    priority: 'high',
  },
  {
    id: '2',
    type: 'review',
    title: 'Đánh giá mới 5⭐',
    message: 'Trần Thị B đã để lại đánh giá 5 sao cho sản phẩm "Áo Thun Cotton Organic". Hãy phản hồi để tăng độ tin cậy!',
    createdAt: '2024-01-15T13:45:00',
    read: false,
    actionUrl: '/business/reviews',
    actionLabel: 'Xem đánh giá',
    priority: 'medium',
  },
  {
    id: '3',
    type: 'stock',
    title: '⚠️ Cảnh báo tồn kho thấp',
    message: 'Sản phẩm "Túi Tote Vải Canvas" chỉ còn 5 sản phẩm trong kho. Vui lòng nhập thêm hàng.',
    createdAt: '2024-01-15T10:20:00',
    read: false,
    actionUrl: '/business/products',
    actionLabel: 'Quản lý kho',
    priority: 'high',
  },
  {
    id: '4',
    type: 'order',
    title: 'Đơn hàng #ORD-2024-005 đã được giao',
    message: 'Đơn hàng của Lê Văn C đã được giao thành công. Khách hàng đã xác nhận nhận hàng.',
    createdAt: '2024-01-15T09:15:00',
    read: true,
    actionUrl: '/business/orders',
    actionLabel: 'Xem chi tiết',
    priority: 'low',
  },
  {
    id: '5',
    type: 'esg',
    title: '📊 Báo cáo ESG tháng 12',
    message: 'Điểm ESG của bạn đã tăng 3 điểm so với tháng trước. Xem báo cáo chi tiết để biết thêm.',
    createdAt: '2024-01-14T16:00:00',
    read: true,
    actionUrl: '/esg',
    actionLabel: 'Xem báo cáo',
    priority: 'medium',
  },
  {
    id: '6',
    type: 'review',
    title: 'Đánh giá 3⭐ cần chú ý',
    message: 'Phạm Thị D đã để lại đánh giá 3 sao cho "Bình Nước Inox". Hãy phản hồi để cải thiện dịch vụ.',
    createdAt: '2024-01-14T14:30:00',
    read: true,
    actionUrl: '/business/reviews',
    actionLabel: 'Phản hồi ngay',
    priority: 'high',
  },
  {
    id: '7',
    type: 'system',
    title: '🎉 Chào mừng tính năng mới',
    message: 'Hệ thống phân tích nâng cao đã được ra mắt! Khám phá các biểu đồ và báo cáo chi tiết.',
    createdAt: '2024-01-14T09:00:00',
    read: true,
    actionUrl: '/business/analytics',
    actionLabel: 'Khám phá',
    priority: 'low',
  },
  {
    id: '8',
    type: 'order',
    title: 'Đơn hàng #ORD-2024-004 cần xử lý',
    message: 'Đơn hàng đã được xác nhận 2 ngày trước nhưng chưa được đóng gói. Vui lòng kiểm tra.',
    createdAt: '2024-01-13T15:20:00',
    read: true,
    actionUrl: '/business/orders',
    actionLabel: 'Xử lý ngay',
    priority: 'medium',
  },
];

export default function NotificationsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | NotificationType>('all');
  const [isClient, setIsClient] = useState(false);

  // All hooks must be called before any conditional returns
  const typeConfig: Record<NotificationType, { label: string; icon: string; color: string }> = {
    order: { label: 'Đơn hàng', icon: '📦', color: 'text-blue-600 bg-blue-50' },
    review: { label: 'Đánh giá', icon: '⭐', color: 'text-yellow-600 bg-yellow-50' },
    stock: { label: 'Tồn kho', icon: '📊', color: 'text-orange-600 bg-orange-50' },
    system: { label: 'Hệ thống', icon: '⚙️', color: 'text-gray-600 bg-gray-50' },
    esg: { label: 'ESG', icon: '🌱', color: 'text-green-600 bg-green-50' },
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notif => {
      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'unread') return !notif.read;
      return notif.type === selectedFilter;
    });
  }, [notifications, selectedFilter]);

  const stats = useMemo(() => {
    return {
      total: notifications.length,
      unread: notifications.filter(n => !n.read).length,
      high: notifications.filter(n => n.priority === 'high' && !n.read).length,
      byType: Object.keys(typeConfig).reduce((acc, type) => {
        acc[type as NotificationType] = notifications.filter(n => n.type === type && !n.read).length;
        return acc;
      }, {} as Record<NotificationType, number>),
    };
  }, [notifications, typeConfig]);

  useEffect(() => {
    setIsClient(true);
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!isClient || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (user.userType !== 'business') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardBody>
            <div className="text-center">
              <div className="text-6xl mb-4">🚫</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Truy cập bị từ chối</h2>
              <p className="text-gray-600">Tính năng này chỉ dành cho doanh nghiệp.</p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  const priorityConfig = {
    low: { color: 'border-gray-300 bg-white', badge: '' },
    medium: { color: 'border-blue-300 bg-blue-50', badge: 'bg-blue-100 text-blue-700' },
    high: { color: 'border-red-300 bg-red-50', badge: 'bg-red-100 text-red-700' },
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const formatDate = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">🔔 Thông báo</h1>
              <p className="text-gray-600">Theo dõi các hoạt động và cập nhật quan trọng</p>
            </div>
            {stats.unread > 0 && (
              <Button
                variant="outline"
                onClick={handleMarkAllAsRead}
              >
                ✓ Đánh dấu tất cả đã đọc
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Tổng thông báo</div>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.unread}</div>
              <div className="text-sm text-gray-600">Chưa đọc</div>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-red-600">{stats.high}</div>
              <div className="text-sm text-gray-600">Ưu tiên cao</div>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.byType.order}</div>
              <div className="text-sm text-gray-600">Đơn hàng mới</div>
            </CardBody>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardBody>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={selectedFilter === 'all' ? 'primary' : 'outline'}
                onClick={() => setSelectedFilter('all')}
              >
                Tất cả
                {stats.total > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {stats.total}
                  </span>
                )}
              </Button>
              
              <Button
                variant={selectedFilter === 'unread' ? 'primary' : 'outline'}
                onClick={() => setSelectedFilter('unread')}
              >
                Chưa đọc
                {stats.unread > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {stats.unread}
                  </span>
                )}
              </Button>

              {(Object.keys(typeConfig) as NotificationType[]).map((type) => (
                <Button
                  key={type}
                  variant={selectedFilter === type ? 'primary' : 'outline'}
                  onClick={() => setSelectedFilter(type)}
                >
                  {typeConfig[type].icon} {typeConfig[type].label}
                  {stats.byType[type] > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                      {stats.byType[type]}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardBody className="text-center py-12">
                <div className="text-6xl mb-4">🔔</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Không có thông báo</h3>
                <p className="text-gray-600">Bạn đã xem hết tất cả thông báo.</p>
              </CardBody>
            </Card>
          ) : (
            filteredNotifications.map((notif) => (
              <Card 
                key={notif.id} 
                className={`hover:shadow-lg transition-shadow border-2 ${
                  notif.read 
                    ? 'border-gray-200' 
                    : priorityConfig[notif.priority].color
                }`}
              >
                <CardBody>
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${typeConfig[notif.type].color}`}>
                      {typeConfig[notif.type].icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className={`font-bold mb-1 ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notif.title}
                            {!notif.read && (
                              <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600 mb-1">
                            <Badge className={typeConfig[notif.type].color}>
                              {typeConfig[notif.type].label}
                            </Badge>
                            {notif.priority === 'high' && (
                              <Badge className="bg-red-100 text-red-700">Ưu tiên cao</Badge>
                            )}
                            <span>{formatDate(notif.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      <p className={`text-sm mb-4 ${!notif.read ? 'text-gray-700' : 'text-gray-600'}`}>
                        {notif.message}
                      </p>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        {notif.actionUrl && (
                          <Button
                            size="sm"
                            onClick={() => {
                              handleMarkAsRead(notif.id);
                              router.push(notif.actionUrl!);
                            }}
                          >
                            {notif.actionLabel || 'Xem chi tiết'}
                          </Button>
                        )}
                        
                        {!notif.read && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkAsRead(notif.id)}
                          >
                            ✓ Đánh dấu đã đọc
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(notif.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          🗑️ Xóa
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline">
              Tải thêm thông báo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
