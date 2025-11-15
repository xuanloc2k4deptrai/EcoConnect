'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';

export const dynamic = 'force-dynamic';

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipping' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: {
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: {
      name: 'Nguyễn Văn An',
      email: 'nguyenvanan@email.com',
      phone: '0901234567',
      address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    },
    items: [
      {
        productName: 'Áo Thun Cotton Organic',
        quantity: 2,
        price: 350000,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100',
      },
      {
        productName: 'Túi Tote Vải Canvas',
        quantity: 1,
        price: 180000,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100',
      },
    ],
    total: 880000,
    status: 'pending',
    paymentMethod: 'COD',
    createdAt: '2024-01-15T10:30:00',
    updatedAt: '2024-01-15T10:30:00',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: {
      name: 'Trần Thị Bình',
      email: 'tranthibinh@email.com',
      phone: '0912345678',
      address: '456 Lê Lợi, Quận 3, TP.HCM',
    },
    items: [
      {
        productName: 'Bình Nước Inox 500ml',
        quantity: 3,
        price: 220000,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100',
      },
    ],
    total: 660000,
    status: 'processing',
    paymentMethod: 'Chuyển khoản',
    createdAt: '2024-01-15T09:15:00',
    updatedAt: '2024-01-15T11:20:00',
    trackingNumber: 'TRK-VN-12345',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: {
      name: 'Lê Văn Cường',
      email: 'levancuong@email.com',
      phone: '0923456789',
      address: '789 Trần Hưng Đạo, Quận 5, TP.HCM',
    },
    items: [
      {
        productName: 'Áo Thun Cotton Organic',
        quantity: 1,
        price: 350000,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100',
      },
    ],
    total: 350000,
    status: 'shipping',
    paymentMethod: 'Ví MoMo',
    createdAt: '2024-01-14T14:20:00',
    updatedAt: '2024-01-15T08:00:00',
    trackingNumber: 'TRK-VN-12346',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: {
      name: 'Phạm Thị Dung',
      email: 'phamthidung@email.com',
      phone: '0934567890',
      address: '321 Võ Văn Tần, Quận 3, TP.HCM',
    },
    items: [
      {
        productName: 'Túi Tote Vải Canvas',
        quantity: 2,
        price: 180000,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100',
      },
      {
        productName: 'Bình Nước Inox 500ml',
        quantity: 1,
        price: 220000,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100',
      },
    ],
    total: 580000,
    status: 'delivered',
    paymentMethod: 'Chuyển khoản',
    createdAt: '2024-01-13T16:45:00',
    updatedAt: '2024-01-14T17:30:00',
    trackingNumber: 'TRK-VN-12347',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    customer: {
      name: 'Hoàng Văn Em',
      email: 'hoangvanem@email.com',
      phone: '0945678901',
      address: '654 Nguyễn Trãi, Quận 1, TP.HCM',
    },
    items: [
      {
        productName: 'Áo Thun Cotton Organic',
        quantity: 5,
        price: 350000,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100',
      },
    ],
    total: 1750000,
    status: 'confirmed',
    paymentMethod: 'COD',
    createdAt: '2024-01-15T11:00:00',
    updatedAt: '2024-01-15T11:15:00',
  },
];

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isClient, setIsClient] = useState(false);

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

  const statusConfig: Record<OrderStatus | 'all', { label: string; color: string; bgColor: string }> = {
    all: { label: 'Tất cả', color: 'text-gray-700', bgColor: 'bg-gray-100' },
    pending: { label: 'Chờ xác nhận', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
    confirmed: { label: 'Đã xác nhận', color: 'text-blue-700', bgColor: 'bg-blue-100' },
    processing: { label: 'Đang xử lý', color: 'text-purple-700', bgColor: 'bg-purple-100' },
    shipping: { label: 'Đang giao', color: 'text-orange-700', bgColor: 'bg-orange-100' },
    delivered: { label: 'Đã giao', color: 'text-green-700', bgColor: 'bg-green-100' },
    cancelled: { label: 'Đã hủy', color: 'text-red-700', bgColor: 'bg-red-100' },
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [orders, selectedStatus, searchQuery]);

  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing' || o.status === 'confirmed').length,
      shipping: orders.filter(o => o.status === 'shipping').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      revenue: orders
        .filter(o => o.status === 'delivered')
        .reduce((sum, o) => sum + o.total, 0),
    };
  }, [orders]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      ));
      
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
      }
      
      alert(`Đã cập nhật trạng thái đơn hàng thành: ${statusConfig[newStatus].label}`);
    } catch (error) {
      console.error('Failed to update order:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) return;
    
    await handleStatusChange(orderId, 'cancelled');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý đơn hàng</h1>
          <p className="text-gray-600">Theo dõi và xử lý các đơn hàng</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Tổng đơn</div>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Chờ xác nhận</div>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.processing}</div>
              <div className="text-sm text-gray-600">Đang xử lý</div>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.shipping}</div>
              <div className="text-sm text-gray-600">Đang giao</div>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
              <div className="text-sm text-gray-600">Đã giao</div>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody className="text-center">
              <div className="text-xl font-bold text-blue-600">{formatCurrency(stats.revenue)}</div>
              <div className="text-sm text-gray-600">Doanh thu</div>
            </CardBody>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardBody>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <Input
                  placeholder="🔍 Tìm theo mã đơn, tên hoặc email khách hàng..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {(Object.keys(statusConfig) as Array<OrderStatus | 'all'>).map((status) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? 'primary' : 'outline'}
                    onClick={() => setSelectedStatus(status)}
                    className="whitespace-nowrap"
                  >
                    {statusConfig[status].label}
                    {status !== 'all' && (
                      <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                        {orders.filter(o => o.status === status).length}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardBody className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Không có đơn hàng</h3>
                <p className="text-gray-600">Chưa có đơn hàng nào phù hợp với bộ lọc.</p>
              </CardBody>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{order.orderNumber}</h3>
                          <p className="text-sm text-gray-600">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <Badge className={`${statusConfig[order.status].bgColor} ${statusConfig[order.status].color}`}>
                          {statusConfig[order.status].label}
                        </Badge>
                      </div>

                      {/* Customer */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900 mb-1">👤 {order.customer.name}</div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>📧 {order.customer.email}</div>
                          <div>📱 {order.customer.phone}</div>
                          <div>📍 {order.customer.address}</div>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <img 
                              src={item.image} 
                              alt={item.productName}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{item.productName}</div>
                              <div className="text-sm text-gray-600">
                                {formatCurrency(item.price)} × {item.quantity}
                              </div>
                            </div>
                            <div className="font-medium text-gray-900">
                              {formatCurrency(item.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <div>
                          <span className="text-gray-600">Thanh toán: </span>
                          <span className="font-medium">{order.paymentMethod}</span>
                        </div>
                        <div className="text-xl font-bold text-green-600">
                          {formatCurrency(order.total)}
                        </div>
                      </div>

                      {order.trackingNumber && (
                        <div className="mt-3 text-sm">
                          <span className="text-gray-600">Mã vận đơn: </span>
                          <span className="font-mono font-medium text-blue-600">{order.trackingNumber}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="lg:w-48 flex flex-col gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedOrder(order)}
                        className="w-full"
                      >
                        Chi tiết
                      </Button>

                      {order.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => handleStatusChange(order.id, 'confirmed')}
                            disabled={loading}
                            className="w-full"
                          >
                            ✓ Xác nhận
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleCancelOrder(order.id)}
                            disabled={loading}
                            className="w-full text-red-600 hover:bg-red-50"
                          >
                            ✕ Hủy
                          </Button>
                        </>
                      )}

                      {order.status === 'confirmed' && (
                        <Button
                          onClick={() => handleStatusChange(order.id, 'processing')}
                          disabled={loading}
                          className="w-full"
                        >
                          📦 Đóng gói
                        </Button>
                      )}

                      {order.status === 'processing' && (
                        <Button
                          onClick={() => handleStatusChange(order.id, 'shipping')}
                          disabled={loading}
                          className="w-full"
                        >
                          🚚 Giao hàng
                        </Button>
                      )}

                      {order.status === 'shipping' && (
                        <Button
                          onClick={() => handleStatusChange(order.id, 'delivered')}
                          disabled={loading}
                          className="w-full"
                        >
                          ✓ Hoàn thành
                        </Button>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedOrder(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedOrder.orderNumber}</h2>
                    <p className="text-sm text-gray-600 mt-1">Chi tiết đơn hàng</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                {/* Status Timeline */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Trạng thái đơn hàng</h3>
                  <div className="space-y-2">
                    {(['pending', 'confirmed', 'processing', 'shipping', 'delivered'] as OrderStatus[]).map((status, idx) => {
                      const isCompleted = ['pending', 'confirmed', 'processing', 'shipping', 'delivered'].indexOf(selectedOrder.status) >= idx;
                      const isCurrent = selectedOrder.status === status;
                      
                      return (
                        <div key={status} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                          } ${isCurrent ? 'ring-4 ring-green-200' : ''}`}>
                            {isCompleted ? '✓' : idx + 1}
                          </div>
                          <div className={`flex-1 ${isCurrent ? 'font-medium' : ''}`}>
                            {statusConfig[status].label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Thông tin khách hàng</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Tên:</strong> {selectedOrder.customer.name}</div>
                    <div><strong>Email:</strong> {selectedOrder.customer.email}</div>
                    <div><strong>SĐT:</strong> {selectedOrder.customer.phone}</div>
                    <div><strong>Địa chỉ:</strong> {selectedOrder.customer.address}</div>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Sản phẩm</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <div className="font-medium">{item.productName}</div>
                          <div className="text-sm text-gray-600">
                            {formatCurrency(item.price)} × {item.quantity} = {formatCurrency(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment */}
                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span>Phương thức thanh toán:</span>
                    <strong>{selectedOrder.paymentMethod}</strong>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-green-600">
                    <span>Tổng cộng:</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="text-xs text-gray-500 space-y-1">
                  <div>Tạo lúc: {formatDate(selectedOrder.createdAt)}</div>
                  <div>Cập nhật: {formatDate(selectedOrder.updatedAt)}</div>
                </div>
              </div>
            </CardBody>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
