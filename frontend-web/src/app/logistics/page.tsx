'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function LogisticsPage() {
  const [selectedRoute, setSelectedRoute] = useState<'optimized' | 'fastest' | 'greenest'>('optimized');

  // Mock logistics data
  const routes = {
    optimized: {
      name: 'Tối ưu cân bằng',
      distance: 45.2,
      duration: '2h 15m',
      carbonEmission: 12.5,
      cost: 250000,
      savings: { carbon: 35, cost: 20 },
      waypoints: [
        { name: 'Kho trung tâm TP.HCM', time: '08:00', status: 'completed' },
        { name: 'Hub Bình Dương', time: '09:30', status: 'in-progress' },
        { name: 'Điểm giao Thủ Đức', time: '10:45', status: 'pending' },
      ],
    },
    fastest: {
      name: 'Nhanh nhất',
      distance: 52.8,
      duration: '1h 45m',
      carbonEmission: 18.2,
      cost: 320000,
      savings: { carbon: 0, cost: 0 },
      waypoints: [
        { name: 'Kho trung tâm TP.HCM', time: '08:00', status: 'completed' },
        { name: 'Cao tốc TPHCM-Long Thành', time: '08:45', status: 'in-progress' },
        { name: 'Điểm giao Thủ Đức', time: '09:45', status: 'pending' },
      ],
    },
    greenest: {
      name: 'Xanh nhất',
      distance: 48.5,
      duration: '2h 40m',
      carbonEmission: 8.3,
      cost: 280000,
      savings: { carbon: 55, cost: 12 },
      waypoints: [
        { name: 'Kho trung tâm TP.HCM', time: '08:00', status: 'completed' },
        { name: 'Hub EV Charging', time: '09:00', status: 'in-progress' },
        { name: 'Đường vòng xanh', time: '10:15', status: 'pending' },
        { name: 'Điểm giao Thủ Đức', time: '10:40', status: 'pending' },
      ],
    },
  };

  const currentRoute = routes[selectedRoute];

  // Mock shipments
  const mockShipments = [
    {
      id: 'SH-2024-001',
      customer: 'Nguyễn Văn Đức',
      destination: 'Quận Thủ Đức, TP.HCM',
      status: 'in-transit',
      estimatedArrival: '10:45',
      carbonSaved: 3.2,
      vehicle: 'Xe điện EV-01',
    },
    {
      id: 'SH-2024-002',
      customer: 'Trần Thị Thu Tâm',
      destination: 'Quận 9, TP.HCM',
      status: 'scheduled',
      estimatedArrival: '14:30',
      carbonSaved: 2.8,
      vehicle: 'Xe hybrid HY-02',
    },
    {
      id: 'SH-2024-003',
      customer: 'Lê Văn Minh',
      destination: 'Bình Dương',
      status: 'delivered',
      estimatedArrival: '08:15',
      carbonSaved: 4.1,
      vehicle: 'Xe điện EV-03',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-green-600 via-teal-600 to-cyan-600 text-white py-16 mb-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4">
              🤖 AI-Powered Optimization
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Logistics Xanh AI
            </h1>
            <p className="text-xl text-gray-100 mb-6">
              Tối ưu hóa tuyến đường vận chuyển với AI để giảm phát thải carbon và chi phí
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">-35%</div>
                <div className="text-sm text-gray-200">Giảm phát thải</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">-20%</div>
                <div className="text-sm text-gray-200">Tiết kiệm chi phí</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm text-gray-200">Đúng giờ</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-gray-200">Đơn/ngày</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Route Optimization */}
          <div className="lg:col-span-2 space-y-6">
            {/* Route Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">🗺️</span>
                <span>Tối ưu hóa tuyến đường</span>
              </h2>

              {/* Route Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {(Object.keys(routes) as Array<keyof typeof routes>).map((key) => {
                  const route = routes[key];
                  const isSelected = selectedRoute === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedRoute(key)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">
                          {key === 'optimized' ? '⚡' : key === 'fastest' ? '🚀' : '🌱'}
                        </span>
                        {isSelected && (
                          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className={`font-bold mb-2 ${isSelected ? 'text-green-900' : 'text-gray-900'}`}>
                        {route.name}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div>⏱️ {route.duration}</div>
                        <div>📏 {route.distance} km</div>
                        <div className="text-green-600 font-semibold">🌱 {route.carbonEmission} kg CO₂</div>
                      </div>
                      {route.savings.carbon > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200 text-xs">
                          <span className="text-green-600 font-semibold">
                            ↓ Tiết kiệm {route.savings.carbon}% carbon
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Route Details */}
              <div className="bg-gradient-to-br from-green-50 to-cyan-50 rounded-xl p-6 border-2 border-green-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Khoảng cách</div>
                    <div className="text-2xl font-bold text-gray-900">{currentRoute.distance} km</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Thời gian</div>
                    <div className="text-2xl font-bold text-gray-900">{currentRoute.duration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Phát thải CO₂</div>
                    <div className="text-2xl font-bold text-green-600">{currentRoute.carbonEmission} kg</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Chi phí</div>
                    <div className="text-2xl font-bold text-blue-600" suppressHydrationWarning>
                      {currentRoute.cost.toLocaleString('vi-VN')}₫
                    </div>
                  </div>
                </div>

                {currentRoute.savings.carbon > 0 && (
                  <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-green-900">Đề xuất của AI</div>
                      <div className="text-sm text-gray-700">
                        Tuyến đường này giúp tiết kiệm <span className="font-semibold text-green-600">{currentRoute.savings.carbon}% carbon</span> và{' '}
                        <span className="font-semibold text-blue-600">{currentRoute.savings.cost}% chi phí</span> so với tuyến thông thường
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Map Placeholder */}
              <div className="mt-6 bg-gray-100 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
                <div className="text-6xl mb-4">🗺️</div>
                <div className="text-gray-600 font-medium mb-2">Bản đồ tuyến đường</div>
                <div className="text-sm text-gray-500">Tích hợp Google Maps API sẽ hiển thị tuyến đường chi tiết tại đây</div>
              </div>

              {/* Waypoints */}
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">📍 Điểm dừng trên tuyến</h3>
                <div className="space-y-3">
                  {currentRoute.waypoints.map((waypoint, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        waypoint.status === 'completed' ? 'bg-green-500' :
                        waypoint.status === 'in-progress' ? 'bg-blue-500 animate-pulse' :
                        'bg-gray-400'
                      }`}>
                        {waypoint.status === 'completed' ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{waypoint.name}</div>
                        <div className="text-sm text-gray-500">Dự kiến: {waypoint.time}</div>
                      </div>
                      <div>
                        {waypoint.status === 'completed' && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            Hoàn thành
                          </span>
                        )}
                        {waypoint.status === 'in-progress' && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            Đang đi
                          </span>
                        )}
                        {waypoint.status === 'pending' && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                            Chờ
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">🤖</span>
                <span>Đề xuất từ AI</span>
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💡</div>
                    <div>
                      <div className="font-semibold text-blue-900 mb-1">Thời gian tối ưu</div>
                      <div className="text-sm text-blue-700">
                        Khởi hành lúc 08:00 sáng giúp tránh tắc đường và giảm 15% thời gian vận chuyển
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <div className="font-semibold text-green-900 mb-1">Xe điện khả dụng</div>
                      <div className="text-sm text-green-700">
                        3 xe điện EV đang sẵn sàng - giảm 100% phát thải so với xe xăng thông thường
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📦</div>
                    <div>
                      <div className="font-semibold text-yellow-900 mb-1">Gộp đơn hàng</div>
                      <div className="text-sm text-yellow-700">
                        Có thể gộp với 2 đơn hàng khác trên cùng tuyến để tiết kiệm 25% chi phí
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Active Shipments */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🚚</span>
                <span>Đơn hàng đang giao</span>
              </h2>

              <div className="space-y-4">
                {mockShipments.map((shipment) => (
                  <div key={shipment.id} className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm text-gray-600">{shipment.id}</span>
                      {shipment.status === 'in-transit' && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                          Đang giao
                        </span>
                      )}
                      {shipment.status === 'scheduled' && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                          Đã lên lịch
                        </span>
                      )}
                      {shipment.status === 'delivered' && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                          Đã giao
                        </span>
                      )}
                    </div>
                    <div className="font-semibold text-gray-900 mb-1">{shipment.customer}</div>
                    <div className="text-sm text-gray-600 mb-2">{shipment.destination}</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">🚗 {shipment.vehicle}</span>
                      <span className="text-green-600 font-semibold">-{shipment.carbonSaved} kg CO₂</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                Xem tất cả đơn hàng
              </Button>
            </div>

            {/* Carbon Savings */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                <span>Tiết kiệm Carbon</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold mb-1">125.4 kg</div>
                  <div className="text-green-100 text-sm">CO₂ tiết kiệm hôm nay</div>
                </div>

                <div className="pt-4 border-t border-green-400">
                  <div className="text-lg font-semibold mb-1">1,847 kg</div>
                  <div className="text-green-100 text-sm">Tổng tháng này</div>
                </div>

                <div className="pt-4 border-t border-green-400">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    <span>Tương đương 87 cây xanh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Fleet */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🚗</span>
                <span>Đội xe xanh</span>
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl">⚡</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Xe điện</div>
                    <div className="text-sm text-gray-600">12 xe hoạt động</div>
                  </div>
                  <div className="text-green-600 font-bold">100%</div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl">🔋</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Xe hybrid</div>
                    <div className="text-sm text-gray-600">8 xe hoạt động</div>
                  </div>
                  <div className="text-blue-600 font-bold">67%</div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl">🚲</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Xe đạp điện</div>
                    <div className="text-sm text-gray-600">20 xe hoạt động</div>
                  </div>
                  <div className="text-yellow-600 font-bold">100%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
