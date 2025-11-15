'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: '',
  });

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await updateUser(formData);
      setIsEditing(false);
      alert('Cập nhật hồ sơ thành công!');
    } catch (error) {
      alert('Cập nhật thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Điểm tích lũy', value: user.points?.toLocaleString() || '0', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
    { label: 'Carbon Credits', value: `${user.carbonBalance?.toLocaleString() || '0'} kg`, icon: '🌱', color: 'from-green-500 to-emerald-500' },
    { label: 'Thử thách hoàn thành', value: '12', icon: '🎯', color: 'from-blue-500 to-purple-500' },
    { label: 'Đơn hàng', value: '8', icon: '📦', color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hồ sơ của tôi</h1>
          <p className="text-gray-600 mt-2">Quản lý thông tin cá nhân và hoạt động của bạn</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardBody>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                    {user.userType === 'business' ? '🏢 Doanh nghiệp' : '👤 Người tiêu dùng'}
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? '❌ Hủy' : '✏️ Chỉnh sửa hồ sơ'}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-red-600 hover:bg-red-50"
                      onClick={async () => {
                        if (confirm('Bạn có chắc muốn đăng xuất?')) {
                          await logout();
                          router.push('/');
                        }
                      }}
                    >
                      Đăng xuất
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Quick Links */}
            <Card className="mt-6">
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Liên kết nhanh</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  <button
                    onClick={() => router.push('/carbon-wallet')}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-3"
                  >
                    <span className="text-2xl">💳</span>
                    <div>
                      <div className="font-medium text-sm">Ví Carbon</div>
                      <div className="text-xs text-gray-500">Quản lý carbon credits</div>
                    </div>
                  </button>
                  <button
                    onClick={() => router.push('/challenges')}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-3"
                  >
                    <span className="text-2xl">🎯</span>
                    <div>
                      <div className="font-medium text-sm">Thử thách</div>
                      <div className="text-xs text-gray-500">Tham gia thử thách xanh</div>
                    </div>
                  </button>
                  <button
                    onClick={() => router.push('/marketplace')}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-3"
                  >
                    <span className="text-2xl">🛒</span>
                    <div>
                      <div className="font-medium text-sm">Chợ xanh</div>
                      <div className="text-xs text-gray-500">Mua sắm sản phẩm bền vững</div>
                    </div>
                  </button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-2xl mb-3`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Profile Information */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Thông tin cá nhân</h3>
              </CardHeader>
              <CardBody>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      label="Họ và tên"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={loading}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={loading}
                    />
                    <Input
                      label="Số điện thoại"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={loading}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giới thiệu
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Viết vài dòng về bạn..."
                        disabled={loading}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? <LoadingSpinner size="sm" /> : '💾 Lưu thay đổi'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        disabled={loading}
                      >
                        Hủy
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    {user.userType === 'business' && user.companyName && (
                      <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">🏢</span>
                          <h4 className="font-semibold text-gray-900">Thông tin doanh nghiệp</h4>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-gray-500">Tên công ty</label>
                            <div className="text-gray-900 font-medium mt-1">{user.companyName}</div>
                          </div>
                          {user.taxCode && (
                            <div>
                              <label className="text-sm text-gray-500">Mã số thuế</label>
                              <div className="text-gray-900 font-medium mt-1">{user.taxCode}</div>
                            </div>
                          )}
                          {user.businessAddress && (
                            <div>
                              <label className="text-sm text-gray-500">Địa chỉ</label>
                              <div className="text-gray-900 font-medium mt-1">{user.businessAddress}</div>
                            </div>
                          )}
                          {user.businessType && (
                            <div>
                              <label className="text-sm text-gray-500">Loại hình</label>
                              <div className="text-gray-900 font-medium mt-1">
                                {user.businessType === 'retail' && 'Bán lẻ'}
                                {user.businessType === 'wholesale' && 'Bán sỉ'}
                                {user.businessType === 'manufacturer' && 'Sản xuất'}
                                {user.businessType === 'service' && 'Dịch vụ'}
                                {user.businessType === 'other' && 'Khác'}
                              </div>
                            </div>
                          )}
                          {user.website && (
                            <div>
                              <label className="text-sm text-gray-500">Website</label>
                              <div className="text-gray-900 font-medium mt-1">
                                <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                                  {user.website}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <label className="text-sm text-gray-500">{user.userType === 'business' ? 'Người đại diện' : 'Họ và tên'}</label>
                      <div className="text-gray-900 font-medium mt-1">{user.name}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <div className="text-gray-900 font-medium mt-1">{user.email}</div>
                    </div>
                    {user.phone && (
                      <div>
                        <label className="text-sm text-gray-500">Số điện thoại</label>
                        <div className="text-gray-900 font-medium mt-1">{user.phone}</div>
                      </div>
                    )}
                    <div>
                      <label className="text-sm text-gray-500">Loại tài khoản</label>
                      <div className="text-gray-900 font-medium mt-1">
                        {user.userType === 'business' ? '🏢 Doanh nghiệp' : '👤 Người tiêu dùng'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Ngày tham gia</label>
                      <div className="text-gray-900 font-medium mt-1">
                        {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Hoạt động gần đây</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {[
                    { action: 'Hoàn thành thử thách', title: 'Zero Waste Week', time: '2 giờ trước', icon: '🎯', color: 'bg-green-100 text-green-600' },
                    { action: 'Mua sản phẩm', title: 'Organic Cotton T-Shirt', time: '1 ngày trước', icon: '🛒', color: 'bg-blue-100 text-blue-600' },
                    { action: 'Kiếm carbon credits', title: '+50 kg CO₂', time: '3 ngày trước', icon: '🌱', color: 'bg-emerald-100 text-emerald-600' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-900">{activity.action}</div>
                        <div className="text-sm text-gray-500">{activity.title}</div>
                      </div>
                      <div className="text-xs text-gray-400">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
