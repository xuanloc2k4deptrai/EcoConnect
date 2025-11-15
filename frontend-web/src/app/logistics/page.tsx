'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function LogisticsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [selectedRoute, setSelectedRoute] = useState<'optimized' | 'fastest' | 'greenest'>('optimized');
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcWeight, setCalcWeight] = useState('');
  const [calcDistance, setCalcDistance] = useState('');
  const [calcVehicle, setCalcVehicle] = useState('electric');
  const [carbonResult, setCarbonResult] = useState<number | null>(null);
  const [showCustomRoute, setShowCustomRoute] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (!authLoading && user && user.userType !== 'business') {
      router.push('/');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user || user.userType !== 'business') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {authLoading ? (
          <LoadingSpinner size="lg" />
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Truy cập bị từ chối</h2>
            <p className="text-gray-600 mb-6">Tính năng này chỉ dành cho tài khoản doanh nghiệp.</p>
            <Button onClick={() => router.push('/')}>Về trang chủ</Button>
          </div>
        )}
      </div>
    );
  }

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

  const handleCalculateCarbon = () => {
    const weight = parseFloat(calcWeight);
    const distance = parseFloat(calcDistance);
    
    if (!weight || !distance || weight <= 0 || distance <= 0) {
      alert('Vui lòng nhập đầy đủ thông tin hợp lệ!');
      return;
    }

    // Carbon emission factors (kg CO2 per km per ton)
    const factors: Record<string, number> = {
      electric: 0.0,
      hybrid: 0.12,
      diesel: 0.27,
      gas: 0.25,
    };

    const emissionFactor = factors[calcVehicle] || 0.25;
    const totalEmission = (weight / 1000) * distance * emissionFactor;
    setCarbonResult(totalEmission);
  };

  const handlePlanCustomRoute = () => {
    if (!customStart.trim() || !customEnd.trim()) {
      alert('Vui lòng nhập điểm đi và điểm đến!');
      return;
    }
    alert(`Đang tối ưu hóa tuyến đường:\n\nTừ: ${customStart}\nĐến: ${customEnd}\n\nChức năng này sẽ tích hợp Google Maps API để tính toán tuyến đường tối ưu!`);
  };

  const handleExportPlan = () => {
    alert('Chức năng xuất kế hoạch sẽ được triển khai sau!\n\nBạn có thể xuất:\n- PDF route plan\n- Excel shipment list\n- JSON data export');
  };

  const handleTrackShipment = (id: string) => {
    alert(`Tracking shipment ${id}\n\nChức năng theo dõi real-time sẽ hiển thị:\n- Vị trí hiện tại trên bản đồ\n- ETA cập nhật\n- Lịch sử di chuyển\n- Thông tin tài xế`);
  };

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
            {/* Custom Route Planner */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <span className="text-3xl">📍</span>
                  <span>Lập kế hoạch tùy chỉnh</span>
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportPlan}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Xuất kế hoạch
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📍 Điểm đi
                  </label>
                  <input
                    type="text"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    placeholder="VD: Kho trung tâm TP.HCM"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🎯 Điểm đến
                  </label>
                  <input
                    type="text"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    placeholder="VD: Quận Thủ Đức, TP.HCM"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>
              </div>

              <Button
                onClick={handlePlanCustomRoute}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Tối ưu hóa bằng AI
              </Button>
            </div>

            {/* Route Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">🗺️</span>
                <span>Tuyến đường được đề xuất</span>
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
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-gray-500">🚗 {shipment.vehicle}</span>
                      <span className="text-green-600 font-semibold">-{shipment.carbonSaved} kg CO₂</span>
                    </div>
                    <button
                      onClick={() => handleTrackShipment(shipment.id)}
                      className="w-full mt-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded transition-colors"
                    >
                      📍 Theo dõi real-time
                    </button>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                Xem tất cả đơn hàng
              </Button>
            </div>

            {/* Carbon Calculator */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🧮</span>
                <span>Carbon Calculator</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ⚖️ Trọng lượng (kg)
                  </label>
                  <input
                    type="number"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(e.target.value)}
                    placeholder="VD: 50"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📏 Khoảng cách (km)
                  </label>
                  <input
                    type="number"
                    value={calcDistance}
                    onChange={(e) => setCalcDistance(e.target.value)}
                    placeholder="VD: 45"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🚗 Loại xe
                  </label>
                  <select
                    value={calcVehicle}
                    onChange={(e) => setCalcVehicle(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  >
                    <option value="electric">⚡ Xe điện (0% CO₂)</option>
                    <option value="hybrid">🔋 Xe hybrid</option>
                    <option value="diesel">⛽ Xe diesel</option>
                    <option value="gas">⛽ Xe xăng</option>
                  </select>
                </div>

                <Button
                  onClick={handleCalculateCarbon}
                  className="w-full bg-green-600"
                  disabled={!calcWeight || !calcDistance}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Tính phát thải CO₂
                </Button>

                {carbonResult !== null && (
                  <div className="mt-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🌱</span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Tổng phát thải dự kiến</div>
                        <div className="text-3xl font-bold text-green-600">
                          {carbonResult.toFixed(2)} kg CO₂
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
