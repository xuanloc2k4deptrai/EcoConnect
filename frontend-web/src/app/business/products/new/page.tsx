'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function NewProductPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    images: [''],
    certifications: [] as string[],
    // ESG Score
    esgEnvironmental: '85',
    esgSocial: '80',
    esgGovernance: '75',
    // Carbon Footprint
    carbonManufacturing: '',
    carbonTransportation: '',
    carbonPackaging: '',
    // Features
    recyclable: false,
    biodegradable: false,
    fairTrade: false,
    organic: false,
    carbonNeutral: false,
    // Blockchain
    createPassport: false,
  });

  const categories = [
    'Fashion',
    'Electronics',
    'Home & Garden',
    'Beauty & Personal Care',
    'Food & Beverage',
    'Sports & Outdoors',
    'Office Supplies',
    'Other'
  ];

  const certificationOptions = [
    'Organic',
    'Fair Trade',
    'Carbon Neutral',
    'FSC Certified',
    'B Corp',
    'Energy Star',
    'Cruelty Free',
    'Rainforest Alliance',
    'GOTS',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Calculate overall ESG score
      const esgOverall = Math.round(
        (parseInt(formData.esgEnvironmental) + 
         parseInt(formData.esgSocial) + 
         parseInt(formData.esgGovernance)) / 3
      );

      // Calculate total carbon
      const carbonTotal = 
        parseFloat(formData.carbonManufacturing || '0') +
        parseFloat(formData.carbonTransportation || '0') +
        parseFloat(formData.carbonPackaging || '0');

      console.log('Creating product:', {
        ...formData,
        esgOverall,
        carbonTotal,
        seller: user?.companyName || user?.name,
      });

      alert('Sản phẩm đã được tạo thành công!');
      router.push('/business/products');
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCertification = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="mb-4"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thêm sản phẩm mới</h1>
            <p className="text-gray-600">Điền thông tin chi tiết về sản phẩm xanh của bạn</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900">Thông tin cơ bản</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên sản phẩm <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="VD: Áo Thun Cotton Organic"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Mô tả chi tiết về sản phẩm..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Danh mục <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Chọn danh mục</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giá (VNĐ) <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="350000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tồn kho <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        required
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Hình ảnh <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      value={formData.images[0]}
                      onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Nhập URL hình ảnh từ Unsplash hoặc nguồn khác</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* ESG Score */}
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900">Điểm ESG</h2>
                <p className="text-sm text-gray-600">Đánh giá tác động môi trường, xã hội và quản trị</p>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🌱 Environmental (Môi trường): {formData.esgEnvironmental}/100
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.esgEnvironmental}
                      onChange={(e) => setFormData({ ...formData, esgEnvironmental: e.target.value })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      👥 Social (Xã hội): {formData.esgSocial}/100
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.esgSocial}
                      onChange={(e) => setFormData({ ...formData, esgSocial: e.target.value })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ⚖️ Governance (Quản trị): {formData.esgGovernance}/100
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.esgGovernance}
                      onChange={(e) => setFormData({ ...formData, esgGovernance: e.target.value })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-medium text-gray-900">Điểm ESG tổng thể:</div>
                    <div className="text-3xl font-bold text-green-600">
                      {Math.round((parseInt(formData.esgEnvironmental) + parseInt(formData.esgSocial) + parseInt(formData.esgGovernance)) / 3)}/100
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Carbon Footprint */}
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900">Dấu chân Carbon</h2>
                <p className="text-sm text-gray-600">Lượng CO₂ phát thải trong quá trình sản xuất và phân phối</p>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🏭 Sản xuất (kg CO₂)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.carbonManufacturing}
                      onChange={(e) => setFormData({ ...formData, carbonManufacturing: e.target.value })}
                      placeholder="2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🚚 Vận chuyển (kg CO₂)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.carbonTransportation}
                      onChange={(e) => setFormData({ ...formData, carbonTransportation: e.target.value })}
                      placeholder="0.8"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📦 Đóng gói (kg CO₂)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.carbonPackaging}
                      onChange={(e) => setFormData({ ...formData, carbonPackaging: e.target.value })}
                      placeholder="0.3"
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="font-medium text-gray-900">Tổng phát thải:</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {(parseFloat(formData.carbonManufacturing || '0') + 
                      parseFloat(formData.carbonTransportation || '0') + 
                      parseFloat(formData.carbonPackaging || '0')).toFixed(1)} kg CO₂
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Certifications */}
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900">Chứng nhận</h2>
                <p className="text-sm text-gray-600">Chọn các chứng nhận mà sản phẩm đã đạt được</p>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {certificationOptions.map((cert) => (
                    <button
                      key={cert}
                      type="button"
                      onClick={() => toggleCertification(cert)}
                      className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                        formData.certifications.includes(cert)
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {formData.certifications.includes(cert) && '✓ '}
                      {cert}
                    </button>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Features */}
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900">Tính năng xanh</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {[
                    { key: 'recyclable', label: '♻️ Có thể tái chế', desc: 'Sản phẩm có thể được tái chế sau sử dụng' },
                    { key: 'biodegradable', label: '🌱 Phân hủy sinh học', desc: 'Sản phẩm phân hủy tự nhiên' },
                    { key: 'fairTrade', label: '🤝 Fair Trade', desc: 'Sản xuất theo tiêu chuẩn thương mại công bằng' },
                    { key: 'organic', label: '🌿 Hữu cơ', desc: 'Làm từ nguyên liệu hữu cơ 100%' },
                    { key: 'carbonNeutral', label: '🌍 Carbon Neutral', desc: 'Bù trừ 100% lượng carbon phát thải' },
                  ].map((feature) => (
                    <label key={feature.key} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData[feature.key as keyof typeof formData] as boolean}
                        onChange={(e) => setFormData({ ...formData, [feature.key]: e.target.checked })}
                        className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{feature.label}</div>
                        <div className="text-sm text-gray-600">{feature.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Blockchain */}
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900">Blockchain & NFT</h2>
              </CardHeader>
              <CardBody>
                <label className="flex items-start gap-3 p-4 border-2 border-green-200 rounded-lg bg-green-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.createPassport}
                    onChange={(e) => setFormData({ ...formData, createPassport: e.target.checked })}
                    className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900 mb-1">🔗 Tạo Hộ chiếu xanh (NFT)</div>
                    <div className="text-sm text-gray-600">
                      Tạo NFT trên blockchain để xác thực nguồn gốc và tính bền vững của sản phẩm. 
                      Khách hàng có thể quét QR code để xem thông tin chi tiết.
                    </div>
                  </div>
                </label>
              </CardBody>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
                disabled={loading}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Tạo sản phẩm
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
