'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function BusinessProductsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'draft'>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (!authLoading && user && user.userType !== 'business') {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && user.userType === 'business') {
      loadProducts();
    }
  }, [user, filter]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Mock data
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockProducts: Product[] = [
        {
          _id: 'prod-1',
          name: 'Áo Thun Cotton Organic',
          description: 'Áo thun cotton hữu cơ 100%, không thuốc nhuộm độc hại',
          category: 'Fashion',
          price: 350000,
          images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'],
          seller: { id: user!._id || '', name: user!.companyName || user!.name, rating: 4.8 },
          esgScore: { overall: 92, environmental: 95, social: 90, governance: 90 },
          carbonFootprint: { manufacturing: 2.5, transportation: 0.8, packaging: 0.3, total: 3.6 },
          certifications: ['Organic', 'Fair Trade'],
          blockchainVerified: true,
          passportId: 'NFT-001-2024',
          stock: 150,
          sold: 320,
          rating: 4.8,
          reviews: 89,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'prod-2',
          name: 'Túi Tote Vải Tái Chế',
          description: 'Túi vải làm từ 100% nhựa tái chế từ đại dương',
          category: 'Fashion',
          price: 250000,
          images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7'],
          seller: { id: user!._id || '', name: user!.companyName || user!.name, rating: 4.8 },
          esgScore: { overall: 88, environmental: 92, social: 85, governance: 87 },
          carbonFootprint: { manufacturing: 1.8, transportation: 0.5, packaging: 0.2, total: 2.5 },
          certifications: ['Fair Trade', 'Carbon Neutral'],
          blockchainVerified: false,
          stock: 200,
          sold: 156,
          rating: 4.6,
          reviews: 45,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'prod-3',
          name: 'Bình Nước Inox Premium',
          description: 'Bình giữ nhiệt inox 304, không BPA, giữ nhiệt 24h',
          category: 'Home & Garden',
          price: 450000,
          images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8'],
          seller: { id: user!._id || '', name: user!.companyName || user!.name, rating: 4.8 },
          esgScore: { overall: 85, environmental: 88, social: 83, governance: 84 },
          carbonFootprint: { manufacturing: 3.2, transportation: 0.6, packaging: 0.4, total: 4.2 },
          certifications: ['Carbon Neutral', 'B Corp'],
          blockchainVerified: true,
          passportId: 'NFT-002-2024',
          stock: 80,
          sold: 234,
          rating: 4.9,
          reviews: 112,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
      ];

      setProducts(mockProducts);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p._id !== productId));
    }
  };

  if (authLoading || !user || user.userType !== 'business') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4">
                🏢 Quản lý doanh nghiệp
              </div>
              <h1 className="text-4xl font-bold mb-2">Quản lý sản phẩm</h1>
              <p className="text-xl text-blue-100">
                Tạo và quản lý sản phẩm xanh của bạn
              </p>
            </div>
            <Button
              onClick={() => router.push('/business/products/new')}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Thêm sản phẩm mới
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardBody>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{products.length}</div>
                  <div className="text-sm text-gray-600">Tổng sản phẩm</div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.stock > 0).length}
                  </div>
                  <div className="text-sm text-gray-600">Còn hàng</div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔗</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.blockchainVerified).length}
                  </div>
                  <div className="text-sm text-gray-600">Blockchain</div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Đánh giá TB</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(['all', 'active', 'draft'] as const).map((tab) => (
            <Button
              key={tab}
              variant={filter === tab ? 'primary' : 'outline'}
              onClick={() => setFilter(tab)}
              size="sm"
            >
              {tab === 'all' ? '📋 Tất cả' : tab === 'active' ? '✅ Đang bán' : '📝 Nháp'}
            </Button>
          ))}
        </div>

        {/* Products List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : products.length === 0 ? (
          <Card>
            <CardBody>
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📦</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có sản phẩm nào</h3>
                <p className="text-gray-600 mb-6">Bắt đầu thêm sản phẩm xanh của bạn ngay hôm nay</p>
                <Button onClick={() => router.push('/business/products/new')}>
                  Thêm sản phẩm đầu tiên
                </Button>
              </div>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <Card key={product._id} hover>
                <CardBody>
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      {product.images[0] && (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                          <p className="text-gray-600 line-clamp-2">{product.description}</p>
                        </div>
                        {product.blockchainVerified && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Blockchain
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-5 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600">Giá bán</div>
                          <div className="font-bold text-blue-600">{formatCurrency(product.price)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Tồn kho</div>
                          <div className="font-bold text-gray-900">{product.stock}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Đã bán</div>
                          <div className="font-bold text-gray-900">{product.sold}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Đánh giá</div>
                          <div className="font-bold text-gray-900">⭐ {product.rating}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">ESG Score</div>
                          <div className="font-bold text-green-600">{product.esgScore.overall}/100</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/business/products/edit/${product._id}`)}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Sửa
                        </Button>
                        {product.passportId && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/passport/${product.passportId}`)}
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Hộ chiếu
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/marketplace`)}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Xem
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50 border-red-300"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
