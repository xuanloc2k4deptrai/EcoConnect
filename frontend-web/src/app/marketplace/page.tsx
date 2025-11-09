'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/marketplace/ProductCard';
import FilterBar from '@/components/marketplace/FilterBar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Product, FilterOptions } from '@/types';
import { apiClient } from '@/lib/api';

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'newest',
    sortOrder: 'desc',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    loadProducts();
  }, [filters, pagination.page, searchQuery]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      
      // Mock data for development (since backend is not running)
      const mockProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
        _id: `product-${i + 1}`,
        name: `Eco Product ${i + 1}`,
        description: 'Sản phẩm xanh thân thiện với môi trường, được xác thực bởi blockchain',
        category: ['Fashion', 'Lifestyle', 'Electronics'][i % 3],
        price: 20 + (i * 5),
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30'],
        seller: {
          id: `seller-${i + 1}`,
          name: `Green Shop ${i + 1}`,
          rating: 4.5 + (i % 5) / 10
        },
        esgScore: {
          overall: 80 + (i % 20),
          environmental: 85 + (i % 15),
          social: 80 + (i % 10),
          governance: 75 + (i % 15)
        },
        carbonFootprint: {
          manufacturing: 1 + (i % 3),
          transportation: 0.5,
          packaging: 0.3,
          total: 2 + (i % 4)
        },
        certifications: ['Organic', 'Fair Trade', 'Carbon Neutral'].slice(0, (i % 3) + 1),
        blockchainVerified: i % 2 === 0,
        stock: 50 + (i * 10),
        sold: i * 20,
        rating: 4 + (i % 10) / 10,
        reviews: 10 + (i * 5),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProducts(mockProducts);
      setPagination({
        page: pagination.page,
        limit: pagination.limit,
        total: 36,
        pages: 3
      });
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination({ ...pagination, page: 1 });
    loadProducts();
  };

  const handleResetFilters = () => {
    setFilters({ sortBy: 'newest', sortOrder: 'desc' });
    setSearchQuery('');
    setPagination({ ...pagination, page: 1 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4">
              🌿 100% Sản phẩm xác thực bởi Blockchain
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Green Marketplace
            </h1>
            <p className="text-xl text-gray-100">
              Khám phá hàng nghìn sản phẩm bền vững được xác thực bởi công nghệ blockchain
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <Input
                placeholder="Tìm kiếm sản phẩm xanh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-12 pr-32 py-4 text-lg rounded-xl shadow-lg border-2 border-gray-200 focus:border-primary-500"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                <Button 
                  onClick={handleSearch}
                  className="rounded-lg px-6 py-2 shadow-md"
                >
                  <span className="hidden sm:inline">Tìm kiếm</span>
                  <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Sắp xếp:</span>
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-') as [
                  FilterOptions['sortBy'],
                  FilterOptions['sortOrder']
                ];
                setFilters({ ...filters, sortBy, sortOrder });
              }}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 font-medium text-gray-700"
            >
              <option value="newest-desc">🆕 Mới nhất</option>
              <option value="price-asc">💰 Giá: Thấp đến Cao</option>
              <option value="price-desc">💰 Giá: Cao đến Thấp</option>
              <option value="esg-desc">🌿 ESG: Cao nhất</option>
              <option value="rating-desc">⭐ Đánh giá: Cao nhất</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-lg">
            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-primary-700">
              {pagination.total} sản phẩm
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64 bg-white rounded-2xl shadow-md">
                <LoadingSpinner size="lg" />
                <p className="text-gray-500 mt-4">Đang tải sản phẩm...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-md">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
                  <p className="text-gray-600 mb-6">Thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                  <Button onClick={handleResetFilters} variant="outline" className="shadow-md">
                    Đặt lại bộ lọc
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10 bg-white rounded-xl shadow-md p-6">
                    <Button
                      onClick={() =>
                        setPagination({ ...pagination, page: pagination.page - 1 })
                      }
                      disabled={pagination.page === 1}
                      variant="outline"
                      size="sm"
                      className="px-4 font-medium"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Trước
                    </Button>
                    <div className="flex gap-2">
                      {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                        let page;
                        if (pagination.pages <= 5) {
                          page = i + 1;
                        } else if (pagination.page <= 3) {
                          page = i + 1;
                        } else if (pagination.page >= pagination.pages - 2) {
                          page = pagination.pages - 4 + i;
                        } else {
                          page = pagination.page - 2 + i;
                        }
                        return (
                          <Button
                            key={page}
                            onClick={() => setPagination({ ...pagination, page })}
                            variant={page === pagination.page ? 'primary' : 'outline'}
                            size="sm"
                            className={`min-w-[40px] font-semibold ${
                              page === pagination.page ? 'shadow-lg scale-110' : ''
                            }`}
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>
                    <Button
                      onClick={() =>
                        setPagination({ ...pagination, page: pagination.page + 1 })
                      }
                      disabled={pagination.page === pagination.pages}
                      variant="outline"
                      size="sm"
                      className="px-4 font-medium"
                    >
                      Sau
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
