'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProductPassportPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [scanning, setScanning] = useState(false);
  const [nftInput, setNftInput] = useState('');
  const [showInputModal, setShowInputModal] = useState(false);
  const [searching, setSearching] = useState(false);

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

  // Mock product passport data
  const mockPassport = {
    id: 'NFT-001-2024',
    productName: 'Áo Cotton Organic Premium',
    manufacturer: 'Green Fashion Co.',
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
      {
        stage: 'Nguyên liệu',
        location: 'Đồng bằng sông Cửu Long, Việt Nam',
        date: '2024-08-01',
        description: 'Thu hoạch bông hữu cơ từ nông trại chứng nhận GOTS',
        verified: true,
      },
      {
        stage: 'Sản xuất',
        location: 'Nhà máy Green Fashion, TP.HCM',
        date: '2024-09-10',
        description: 'Dệt và nhuộm sử dụng 100% năng lượng tái tạo',
        verified: true,
      },
      {
        stage: 'Đóng gói',
        location: 'Kho Green Fashion, Bình Dương',
        date: '2024-10-01',
        description: 'Đóng gói với vật liệu tái chế 100%',
        verified: true,
      },
      {
        stage: 'Phân phối',
        location: 'EcoConnect Marketplace',
        date: '2024-10-15',
        description: 'Sẵn sàng giao hàng với phương án vận chuyển xanh',
        verified: true,
      },
    ],
    ipfsHash: 'QmX7Hy8Kq9r3vN2pL5tM8wB6cD1eF4gH9iJ0kL',
    smartContract: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  };

  const handleScanQR = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setSelectedProduct('NFT-001-2024');
    }, 2000);
  };

  const handleSearchNFT = () => {
    if (!nftInput.trim()) {
      alert('Vui lòng nhập mã NFT!');
      return;
    }
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setSelectedProduct(nftInput);
      setShowInputModal(false);
      setNftInput('');
    }, 1500);
  };

  const handleViewOnBlockchain = () => {
    const explorerUrl = `https://mumbai.polygonscan.com/address/${mockPassport.smartContract}`;
    window.open(explorerUrl, '_blank');
  };

  const handleDownloadPDF = () => {
    alert('Chức năng tải PDF sẽ được triển khai sau!\n\nBạn có thể tải hộ chiếu sản phẩm dưới dạng PDF để lưu trữ hoặc chia sẻ.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white py-16 mb-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4">
              🔐 Xác thực Blockchain NFT
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Hộ Chiếu Xanh
            </h1>
            <p className="text-xl text-gray-100 mb-6">
              Xác minh nguồn gốc và tính bền vững của sản phẩm qua công nghệ blockchain
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">1,250+</div>
                <div className="text-sm text-gray-200">Sản phẩm được mint</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-gray-200">Xác thực Blockchain</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-gray-200">Theo dõi minh bạch</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">NFT</div>
                <div className="text-sm text-gray-200">Polygon Network</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* QR Scanner Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">Quét mã QR sản phẩm</h2>
            <p className="text-gray-600 mb-6">
              Sử dụng camera để quét mã QR trên sản phẩm hoặc nhập mã NFT để xem hộ chiếu xanh
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleScanQR}
                disabled={scanning}
                className="px-8 py-4 text-lg shadow-lg hover:shadow-xl"
              >
                {scanning ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Đang quét...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Quét mã QR
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-4 text-lg"
                onClick={() => setShowInputModal(true)}
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Nhập mã NFT
              </Button>
            </div>
          </div>
        </div>

        {/* NFT Input Modal */}
        {showInputModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">🔍 Tìm kiếm NFT</h3>
                <button
                  onClick={() => setShowInputModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nhập mã NFT Token ID hoặc Product ID
                </label>
                <input
                  type="text"
                  value={nftInput}
                  onChange={(e) => setNftInput(e.target.value)}
                  placeholder="VD: NFT-001-2024 hoặc 0x7f8c...3d2a"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchNFT()}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Mã NFT có thể tìm thấy trên nhãn sản phẩm hoặc trong email xác nhận
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowInputModal(false)}
                  className="flex-1"
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleSearchNFT}
                  disabled={searching || !nftInput.trim()}
                  className="flex-1"
                >
                  {searching ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span className="ml-2">Đang tìm...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Tìm kiếm
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <div className="font-semibold mb-2">💡 Gợi ý:</div>
                  <ul className="space-y-1 text-xs">
                    <li>• Thử với: <code className="bg-gray-100 px-2 py-1 rounded">NFT-001-2024</code></li>
                    <li>• Hoặc: <code className="bg-gray-100 px-2 py-1 rounded">NFT-002-2024</code></li>
                    <li>• Mỗi sản phẩm có một NFT duy nhất trên blockchain</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Passport Details */}
        {selectedProduct && (
          <div className="space-y-6">
            {/* Product Overview */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{mockPassport.productName}</h2>
                    <p className="text-purple-100">NFT Token ID: {mockPassport.nftTokenId}</p>
                  </div>
                  <div className="text-right">
                    {mockPassport.blockchainVerified && (
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">Đã xác thực</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Nhà sản xuất</div>
                    <div className="font-semibold">{mockPassport.manufacturer}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Ngày mint NFT</div>
                    <div className="font-semibold">{new Date(mockPassport.mintedDate).toLocaleDateString('vi-VN')}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Dấu chân Carbon</div>
                    <div className="font-semibold text-green-600">{mockPassport.carbonFootprint.total} kg CO₂</div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">🏆 Chứng nhận</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockPassport.certifications.map((cert) => (
                      <span key={cert} className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        ✓ {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Blockchain Info */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    🔗 Thông tin Blockchain
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-gray-600 mb-1">Smart Contract:</div>
                      <code className="font-mono text-purple-600 text-xs break-all">{mockPassport.smartContract}</code>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-gray-600 mb-1">IPFS Hash:</div>
                      <code className="font-mono text-purple-600 text-xs break-all">{mockPassport.ipfsHash}</code>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-gray-600 mb-1">Network:</div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Polygon Mumbai Testnet</span>
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-semibold">TESTNET</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleViewOnBlockchain}
                      className="flex-1"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Xem trên PolygonScan
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleDownloadPDF}
                      className="flex-1"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Tải PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Traceability Timeline */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">📍</span>
                <span>Chuỗi truy xuất nguồn gốc</span>
              </h2>
              
              <div className="relative">
                {mockPassport.traceability.map((stage, index) => (
                  <div key={index} className="flex gap-6 mb-8 last:mb-0">
                    {/* Timeline line */}
                    <div className="relative flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                        stage.verified ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gray-400'
                      }`}>
                        {stage.verified ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      {index < mockPassport.traceability.length - 1 && (
                        <div className="w-1 flex-1 bg-gradient-to-b from-green-500 to-green-300 my-2"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{stage.stage}</h3>
                          {stage.verified && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                              Đã xác thực
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{stage.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{stage.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{new Date(stage.date).toLocaleDateString('vi-VN')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carbon Footprint Breakdown */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">🌍</span>
                <span>Phân tích Dấu chân Carbon</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                  <div className="text-3xl mb-2">🏭</div>
                  <div className="text-sm text-blue-700 mb-1">Sản xuất</div>
                  <div className="text-2xl font-bold text-blue-900">{mockPassport.carbonFootprint.manufacturing}</div>
                  <div className="text-xs text-blue-600">kg CO₂</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                  <div className="text-3xl mb-2">🚚</div>
                  <div className="text-sm text-green-700 mb-1">Vận chuyển</div>
                  <div className="text-2xl font-bold text-green-900">{mockPassport.carbonFootprint.transportation}</div>
                  <div className="text-xs text-green-600">kg CO₂</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-2 border-yellow-200">
                  <div className="text-3xl mb-2">📦</div>
                  <div className="text-sm text-yellow-700 mb-1">Đóng gói</div>
                  <div className="text-2xl font-bold text-yellow-900">{mockPassport.carbonFootprint.packaging}</div>
                  <div className="text-xs text-yellow-600">kg CO₂</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                  <div className="text-3xl mb-2">🌱</div>
                  <div className="text-sm text-purple-700 mb-1">Tổng cộng</div>
                  <div className="text-2xl font-bold text-purple-900">{mockPassport.carbonFootprint.total}</div>
                  <div className="text-xs text-purple-600">kg CO₂</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-green-900">Sản phẩm Carbon Neutral</div>
                    <div className="text-sm text-green-700">Tất cả lượng phát thải đã được bù trừ thông qua các dự án trồng cây và năng lượng tái tạo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
