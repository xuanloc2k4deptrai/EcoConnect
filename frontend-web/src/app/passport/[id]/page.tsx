'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function PassportViewPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [passport, setPassport] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPassportData();
  }, [params.id]);

  const loadPassportData = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock passport data based on ID
      const mockPassports: Record<string, any> = {
        'NFT-001-2024': {
          id: 'NFT-001-2024',
          productName: 'Áo Cotton Organic Premium',
          manufacturer: 'Green Fashion Co.',
          manufacturerAddress: '123 Đường Xanh, Quận 1, TP.HCM',
          nftTokenId: '0x7f8c...3d2a',
          blockchainVerified: true,
          mintedDate: '2024-10-15',
          certifications: ['GOTS', 'Fair Trade', 'Carbon Neutral', 'Organic'],
          carbonFootprint: {
            manufacturing: 2.5,
            transportation: 0.8,
            packaging: 0.3,
            total: 3.6,
          },
          traceability: [
            { stage: 'Nguyên liệu', location: 'Nông trại Cotton Organic - Đà Lạt', date: '2024-08-01', verified: true },
            { stage: 'Sản xuất', location: 'Xưởng Green Fashion - TP.HCM', date: '2024-09-10', verified: true },
            { stage: 'Đóng gói', location: 'Kho trung tâm - Bình Dương', date: '2024-09-25', verified: true },
            { stage: 'Phân phối', location: 'Hệ thống EcoConnect', date: '2024-10-01', verified: true },
          ],
          materials: [
            { name: 'Cotton hữu cơ', percentage: 95, origin: 'Đà Lạt, Việt Nam' },
            { name: 'Spandex tái chế', percentage: 5, origin: 'Đài Loan' },
          ],
          sustainabilityScore: 92,
        },
        'NFT-002-2024': {
          id: 'NFT-002-2024',
          productName: 'Bình Nước Inox Tái Chế',
          manufacturer: 'EcoWare Solutions',
          manufacturerAddress: '456 Green Street, Quận 3, TP.HCM',
          nftTokenId: '0x9a2b...4e1f',
          blockchainVerified: true,
          mintedDate: '2024-10-20',
          certifications: ['Recycled Material', 'BPA Free', 'Food Safe'],
          carbonFootprint: {
            manufacturing: 1.2,
            transportation: 0.4,
            packaging: 0.2,
            total: 1.8,
          },
          traceability: [
            { stage: 'Thu gom Inox cũ', location: 'Trung tâm tái chế - Hà Nội', date: '2024-08-15', verified: true },
            { stage: 'Tái chế kim loại', location: 'Nhà máy EcoWare - Bắc Ninh', date: '2024-09-01', verified: true },
            { stage: 'Gia công thành phẩm', location: 'Xưởng sản xuất - TP.HCM', date: '2024-09-20', verified: true },
            { stage: 'Kiểm định chất lượng', location: 'Phòng lab EcoWare', date: '2024-10-05', verified: true },
          ],
          materials: [
            { name: 'Inox 304 tái chế', percentage: 100, origin: 'Việt Nam' },
          ],
          sustainabilityScore: 88,
        },
        'NFT-003-2024': {
          id: 'NFT-003-2024',
          productName: 'Túi Vải Canvas Hữu Cơ',
          manufacturer: 'Natural Bags Co.',
          manufacturerAddress: '789 Eco Avenue, Quận 7, TP.HCM',
          nftTokenId: '0x3c5d...7b9a',
          blockchainVerified: true,
          mintedDate: '2024-10-25',
          certifications: ['Organic Cotton', 'Fair Trade', 'Zero Waste'],
          carbonFootprint: {
            manufacturing: 0.8,
            transportation: 0.3,
            packaging: 0.1,
            total: 1.2,
          },
          traceability: [
            { stage: 'Thu hoạch vải hữu cơ', location: 'Nông trại Organic - Lâm Đồng', date: '2024-09-01', verified: true },
            { stage: 'Dệt vải', location: 'Xưởng dệt truyền thống - Hội An', date: '2024-09-15', verified: true },
            { stage: 'May túi', location: 'Xưởng Natural Bags - TP.HCM', date: '2024-10-10', verified: true },
          ],
          materials: [
            { name: 'Canvas cotton hữu cơ', percentage: 100, origin: 'Lâm Đồng, Việt Nam' },
          ],
          sustainabilityScore: 95,
        },
      };

      const data = mockPassports[params.id as string];
      
      if (data) {
        setPassport(data);
      } else {
        setError('Không tìm thấy thông tin hộ chiếu xanh');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !passport) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{error}</h2>
            <p className="text-gray-600 mb-8">Vui lòng kiểm tra lại mã sản phẩm hoặc thử quét lại QR code.</p>
            <Button onClick={() => router.push('/scan')}>Quét lại</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={() => router.push('/scan')}
            variant="secondary"
            className="mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại
          </Button>
        </div>

        {/* Product Header */}
        <Card className="mb-6">
          <CardBody>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">🌿</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{passport.productName}</h1>
                    <p className="text-gray-600">{passport.manufacturer}</p>
                  </div>
                  {passport.blockchainVerified && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Đã xác thực
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {passport.certifications.map((cert: string) => (
                    <span key={cert} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* NFT Info */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Thông tin NFT</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Token ID</div>
                <div className="font-mono text-sm bg-gray-50 px-3 py-2 rounded">{passport.nftTokenId}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Ngày tạo</div>
                <div className="font-medium">{new Date(passport.mintedDate).toLocaleDateString('vi-VN')}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Mã sản phẩm</div>
                <div className="font-medium">{passport.id}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Điểm bền vững</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${passport.sustainabilityScore}%` }}
                    />
                  </div>
                  <span className="font-bold text-green-600">{passport.sustainabilityScore}/100</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Carbon Footprint */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Dấu chân Carbon</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">🏭</div>
                <div className="text-sm text-gray-600 mb-1">Sản xuất</div>
                <div className="font-bold text-gray-900">{passport.carbonFootprint.manufacturing} kg</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">🚚</div>
                <div className="text-sm text-gray-600 mb-1">Vận chuyển</div>
                <div className="font-bold text-gray-900">{passport.carbonFootprint.transportation} kg</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">📦</div>
                <div className="text-sm text-gray-600 mb-1">Đóng gói</div>
                <div className="font-bold text-gray-900">{passport.carbonFootprint.packaging} kg</div>
              </div>
              <div className="text-center p-4 bg-green-100 rounded-lg">
                <div className="text-2xl mb-1">🌍</div>
                <div className="text-sm text-green-700 mb-1">Tổng cộng</div>
                <div className="font-bold text-green-900">{passport.carbonFootprint.total} kg CO₂</div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-800">
                  Sản phẩm này tạo ra ít carbon hơn <strong>45%</strong> so với sản phẩm thông thường cùng loại.
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Traceability */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Chuỗi cung ứng</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {passport.traceability.map((item: any, index: number) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.verified ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {item.verified ? (
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <div className="w-3 h-3 bg-gray-400 rounded-full" />
                      )}
                    </div>
                    {index < passport.traceability.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 my-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{item.stage}</h3>
                      {item.verified && (
                        <span className="text-xs text-green-600 font-medium">✓ Đã xác thực</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{item.location}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(item.date).toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Materials */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Thành phần nguyên liệu</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {passport.materials.map((material: any, index: number) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-900">{material.name}</span>
                      <span className="font-bold text-gray-900">{material.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${material.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Nguồn gốc: {material.origin}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Manufacturer Info */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Thông tin nhà sản xuất</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">{passport.manufacturer}</div>
                  <div className="text-sm text-gray-600">{passport.manufacturerAddress}</div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <Button onClick={() => router.push('/marketplace')} className="flex-1">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Mua sản phẩm này
          </Button>
          <Button variant="secondary" onClick={() => router.push('/scan')}>
            Quét sản phẩm khác
          </Button>
        </div>
      </div>
    </div>
  );
}
