'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export const dynamic = 'force-dynamic';

type TimeFrame = 'week' | 'month' | 'quarter' | 'year';

export default function AnalyticsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('month');

  // Check authentication
  if (!user) {
    router.push('/login');
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

  // Mock data for charts
  const revenueData = timeFrame === 'week' 
    ? [
        { label: 'T2', value: 12.5, orders: 45 },
        { label: 'T3', value: 15.8, orders: 52 },
        { label: 'T4', value: 18.2, orders: 61 },
        { label: 'T5', value: 14.6, orders: 48 },
        { label: 'T6', value: 22.4, orders: 73 },
        { label: 'T7', value: 28.9, orders: 95 },
        { label: 'CN', value: 25.3, orders: 82 },
      ]
    : timeFrame === 'month'
    ? [
        { label: 'T1', value: 85.2, orders: 342 },
        { label: 'T2', value: 92.8, orders: 378 },
        { label: 'T3', value: 105.4, orders: 425 },
        { label: 'T4', value: 98.6, orders: 398 },
      ]
    : timeFrame === 'quarter'
    ? [
        { label: 'Q1', value: 245.8, orders: 1024 },
        { label: 'Q2', value: 278.4, orders: 1156 },
        { label: 'Q3', value: 312.6, orders: 1289 },
        { label: 'Q4', value: 295.2, orders: 1198 },
      ]
    : [
        { label: '2021', value: 856.4, orders: 3520 },
        { label: '2022', value: 1024.8, orders: 4235 },
        { label: '2023', value: 1245.6, orders: 5128 },
        { label: '2024', value: 1398.2, orders: 5782 },
      ];

  const categoryData = [
    { name: 'Fashion', value: 35, revenue: 43.8, color: 'bg-pink-500' },
    { name: 'Electronics', value: 20, revenue: 25.1, color: 'bg-blue-500' },
    { name: 'Home & Garden', value: 18, revenue: 22.6, color: 'bg-green-500' },
    { name: 'Beauty', value: 15, revenue: 18.8, color: 'bg-purple-500' },
    { name: 'Food', value: 12, revenue: 15.0, color: 'bg-orange-500' },
  ];

  const esgTrendData = [
    { month: 'T1', environmental: 78, social: 82, governance: 75 },
    { month: 'T2', environmental: 80, social: 83, governance: 77 },
    { month: 'T3', environmental: 82, social: 85, governance: 79 },
    { month: 'T4', environmental: 85, social: 87, governance: 80 },
    { month: 'T5', environmental: 86, social: 88, governance: 82 },
    { month: 'T6', environmental: 88, social: 89, governance: 83 },
  ];

  const topProducts = [
    { name: 'Áo Thun Cotton Organic', sold: 245, revenue: 85.75, growth: 15.3 },
    { name: 'Túi Tote Vải Canvas', sold: 198, revenue: 35.64, growth: 22.8 },
    { name: 'Bình Nước Inox 500ml', sold: 176, revenue: 38.72, growth: 8.5 },
    { name: 'Ống Hút Tre', sold: 152, revenue: 4.56, growth: 45.2 },
    { name: 'Khăn Mặt Cotton', sold: 134, revenue: 20.10, growth: -3.2 },
  ];

  const customerSegments = [
    { segment: 'Khách hàng mới', count: 458, percentage: 38, avgOrder: 385000 },
    { segment: 'Khách hàng trung thành', count: 512, percentage: 42, avgOrder: 520000 },
    { segment: 'Khách hàng VIP', count: 235, percentage: 20, avgOrder: 780000 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.value));
  const maxOrders = Math.max(...revenueData.map(d => d.orders));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount * 1000000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Phân tích & Báo cáo</h1>
          <p className="text-gray-600">Theo dõi hiệu suất kinh doanh và xu hướng</p>
        </div>

        {/* Time Frame Selector */}
        <div className="flex gap-2 mb-8">
          {(['week', 'month', 'quarter', 'year'] as TimeFrame[]).map((tf) => (
            <Button
              key={tf}
              variant={timeFrame === tf ? 'primary' : 'outline'}
              onClick={() => setTimeFrame(tf)}
            >
              {tf === 'week' ? '7 ngày' : tf === 'month' ? 'Tháng' : tf === 'quarter' ? 'Quý' : 'Năm'}
            </Button>
          ))}
        </div>

        {/* Revenue Chart */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900">Doanh thu & Đơn hàng</h2>
            <p className="text-sm text-gray-600">Biểu đồ theo dõi doanh thu và số lượng đơn hàng</p>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Bar Chart */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">💰 Doanh thu (triệu VNĐ)</h3>
                <div className="space-y-3">
                  {revenueData.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{item.label}</span>
                        <span className="font-bold text-green-600">{item.value}M</span>
                      </div>
                      <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg transition-all duration-500 flex items-center justify-end pr-2"
                          style={{ width: `${(item.value / maxRevenue) * 100}%` }}
                        >
                          {(item.value / maxRevenue) * 100 > 20 && (
                            <span className="text-white text-xs font-medium">{item.value}M</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600">Tổng doanh thu</div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(revenueData.reduce((sum, d) => sum + d.value, 0))}
                  </div>
                </div>
              </div>

              {/* Orders Bar Chart */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">📦 Số đơn hàng</h3>
                <div className="space-y-3">
                  {revenueData.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{item.label}</span>
                        <span className="font-bold text-blue-600">{item.orders}</span>
                      </div>
                      <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all duration-500 flex items-center justify-end pr-2"
                          style={{ width: `${(item.orders / maxOrders) * 100}%` }}
                        >
                          {(item.orders / maxOrders) * 100 > 20 && (
                            <span className="text-white text-xs font-medium">{item.orders}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600">Tổng đơn hàng</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {revenueData.reduce((sum, d) => sum + d.orders, 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Category Performance */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900">Hiệu suất theo Danh mục</h2>
            <p className="text-sm text-gray-600">Phân tích doanh số theo từng danh mục sản phẩm</p>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {categoryData.map((category, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{formatCurrency(category.revenue)}</div>
                      <div className="text-sm text-gray-600">{category.value}% tổng doanh thu</div>
                    </div>
                  </div>
                  <div className="h-6 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className={`h-full ${category.color} rounded-lg transition-all duration-500`}
                      style={{ width: `${category.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* ESG Trend */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Xu hướng ESG</h2>
              <p className="text-sm text-gray-600">Điểm ESG trung bình của sản phẩm theo thời gian</p>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {esgTrendData.map((data, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="font-medium text-gray-700">{data.month}</div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <div className="text-xs text-gray-600 mb-1">🌱 E: {data.environmental}</div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${data.environmental}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-600 mb-1">👥 S: {data.social}</div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${data.social}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-600 mb-1">⚖️ G: {data.governance}</div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${data.governance}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Điểm ESG tổng thể hiện tại</div>
                <div className="flex gap-4">
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-bold text-green-600">88</div>
                    <div className="text-xs text-gray-600">Environmental</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-bold text-blue-600">89</div>
                    <div className="text-xs text-gray-600">Social</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-bold text-purple-600">83</div>
                    <div className="text-xs text-gray-600">Governance</div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Sản phẩm bán chạy</h2>
              <p className="text-sm text-gray-600">Top sản phẩm theo doanh thu</p>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {topProducts.map((product, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{product.name}</div>
                      <div className="text-sm text-gray-600">
                        {product.sold} đã bán • {formatCurrency(product.revenue)}
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      product.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.growth >= 0 ? '↑' : '↓'} {Math.abs(product.growth)}%
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Customer Segments */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900">Phân khúc Khách hàng</h2>
            <p className="text-sm text-gray-600">Phân tích hành vi mua sắm theo nhóm khách hàng</p>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {customerSegments.map((segment, idx) => (
                <div key={idx} className="p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl">
                  <div className="text-4xl mb-3">
                    {idx === 0 ? '🆕' : idx === 1 ? '⭐' : '👑'}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{segment.segment}</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{segment.count}</div>
                      <div className="text-sm text-gray-600">khách hàng ({segment.percentage}%)</div>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="text-sm text-gray-600">Giá trị đơn trung bình</div>
                      <div className="font-bold text-green-600">{formatCurrency(segment.avgOrder / 1000000)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Export Actions */}
        <Card>
          <CardBody>
            <div className="flex flex-col md:flex-row gap-4">
              <Button variant="outline" className="flex-1">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Xuất báo cáo PDF
              </Button>
              <Button variant="outline" className="flex-1">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Xuất Excel
              </Button>
              <Button variant="outline" className="flex-1">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Gửi email báo cáo
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
