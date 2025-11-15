'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { formatCurrency } from '@/lib/utils';

export default function BusinessDashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (!authLoading && user && user.userType !== 'business') {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && user.userType === 'business') {
      loadDashboardData();
    }
  }, [user, timeframe]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      setLoading(false);
    }
  };

  if (authLoading || !user || user.userType !== 'business') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Mock data
  const stats = {
    revenue: 125800000,
    revenueGrowth: 15.3,
    orders: 342,
    ordersGrowth: 8.7,
    products: 12,
    productsGrowth: 20,
    customers: 1205,
    customersGrowth: 12.5,
    avgOrderValue: 368000,
    conversionRate: 3.2,
    carbonOffset: 2450,
    esgScore: 85,
  };

  const recentOrders = [
    { id: '#ORD-2045', customer: 'Nguyễn Văn A', product: 'Áo Cotton Organic', amount: 350000, status: 'completed', date: '15/11/2024' },
    { id: '#ORD-2044', customer: 'Trần Thị B', product: 'Túi Vải Tái Chế', amount: 250000, status: 'shipping', date: '15/11/2024' },
    { id: '#ORD-2043', customer: 'Lê Văn C', product: 'Bình Nước Inox', amount: 450000, status: 'processing', date: '14/11/2024' },
    { id: '#ORD-2042', customer: 'Phạm Thị D', product: 'Áo Cotton Organic', amount: 350000, status: 'completed', date: '14/11/2024' },
  ];

  const topProducts = [
    { name: 'Áo Cotton Organic', sold: 320, revenue: 112000000, trend: 'up' },
    { name: 'Bình Nước Inox', sold: 234, revenue: 105300000, trend: 'up' },
    { name: 'Túi Vải Tái Chế', sold: 156, revenue: 39000000, trend: 'down' },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-700',
      shipping: 'bg-blue-100 text-blue-700',
      processing: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getStatusText = (status: string) => {
    const texts = {
      completed: 'Hoàn thành',
      shipping: 'Đang giao',
      processing: 'Đang xử lý',
      cancelled: 'Đã hủy',
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4">
                🏢 {user.companyName || 'Doanh nghiệp của bạn'}
              </div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-xl text-purple-100">
                Chào mừng trở lại, {user.name}!
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">{formatCurrency(stats.revenue)}</div>
              <div className="text-purple-100">Doanh thu tháng này</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Timeframe Selector */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tổng quan</h2>
            <p className="text-gray-600">Theo dõi hiệu suất kinh doanh của bạn</p>
          </div>
          <div className="flex gap-2">
            {(['week', 'month', 'year'] as const).map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(period)}
              >
                {period === 'week' ? '7 ngày' : period === 'month' ? '30 ngày' : 'Năm'}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue */}
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${stats.revenueGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {stats.revenueGrowth >= 0 ? '↑' : '↓'} {Math.abs(stats.revenueGrowth)}%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(stats.revenue)}</div>
              <div className="text-sm text-gray-600">Doanh thu</div>
            </CardBody>
          </Card>

          {/* Orders */}
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${stats.ordersGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {stats.ordersGrowth >= 0 ? '↑' : '↓'} {Math.abs(stats.ordersGrowth)}%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.orders}</div>
              <div className="text-sm text-gray-600">Đơn hàng</div>
            </CardBody>
          </Card>

          {/* Products */}
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${stats.productsGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {stats.productsGrowth >= 0 ? '↑' : '↓'} {Math.abs(stats.productsGrowth)}%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.products}</div>
              <div className="text-sm text-gray-600">Sản phẩm</div>
            </CardBody>
          </Card>

          {/* Customers */}
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${stats.customersGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {stats.customersGrowth >= 0 ? '↑' : '↓'} {Math.abs(stats.customersGrowth)}%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.customers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Khách hàng</div>
            </CardBody>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardBody>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{formatCurrency(stats.avgOrderValue)}</div>
                  <div className="text-sm text-gray-600">Giá trị đơn hàng TB</div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{stats.conversionRate}%</div>
                  <div className="text-sm text-gray-600">Tỷ lệ chuyển đổi</div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🌱</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{stats.carbonOffset} kg</div>
                  <div className="text-sm text-gray-600">Carbon Offset</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-gray-900">Đơn hàng gần đây</h3>
                <Button variant="outline" size="sm" onClick={() => router.push('/business/orders')}>
                  Xem tất cả
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-600">{order.customer} • {order.product}</div>
                      <div className="text-xs text-gray-500 mt-1">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 mb-1">{formatCurrency(order.amount)}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-gray-900">Sản phẩm bán chạy</h3>
                <Button variant="outline" size="sm" onClick={() => router.push('/business/products')}>
                  Quản lý
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">{product.name}</div>
                      <div className="text-sm text-gray-600">
                        {product.sold} đã bán • {formatCurrency(product.revenue)}
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${product.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.trend === 'up' ? '↑' : '↓'}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <h3 className="font-bold text-lg text-gray-900">Thao tác nhanh</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => router.push('/business/products/new')}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
              >
                <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                  <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="font-medium text-gray-900">Thêm sản phẩm</div>
              </button>

              <button
                onClick={() => router.push('/business/orders')}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-center group"
              >
                <div className="w-12 h-12 bg-green-100 group-hover:bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                  <svg className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="font-medium text-gray-900">Quản lý đơn hàng</div>
              </button>

              <button
                onClick={() => router.push('/business/analytics')}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-center group"
              >
                <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                  <svg className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="font-medium text-gray-900">Phân tích chi tiết</div>
              </button>

              <button
                onClick={() => router.push('/business/reviews')}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-yellow-500 hover:bg-yellow-50 transition-all text-center group"
              >
                <div className="w-12 h-12 bg-yellow-100 group-hover:bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                  <svg className="w-6 h-6 text-yellow-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="font-medium text-gray-900">Quản lý đánh giá</div>
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
