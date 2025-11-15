'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';

export const dynamic = 'force-dynamic';

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  customer: {
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  reply?: {
    content: string;
    createdAt: string;
  };
  status: 'new' | 'replied' | 'hidden';
}

const mockReviews: Review[] = [
  {
    id: '1',
    productId: 'p1',
    productName: 'Áo Thun Cotton Organic',
    productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100',
    customer: {
      name: 'Nguyễn Văn An',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    rating: 5,
    comment: 'Sản phẩm rất tốt, chất liệu cotton mềm mại, thoáng mát. Đóng gói cẩn thận, giao hàng nhanh. Sẽ ủng hộ shop dài dài!',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300',
    ],
    createdAt: '2024-01-15T10:30:00',
    status: 'new',
  },
  {
    id: '2',
    productId: 'p2',
    productName: 'Túi Tote Vải Canvas',
    productImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100',
    customer: {
      name: 'Trần Thị Bình',
    },
    rating: 4,
    comment: 'Túi đẹp, chất vải dày dặn. Tuy nhiên màu hơi nhạt hơn trong hình. Nhưng nhìn chung vẫn ok, đáng tiền.',
    createdAt: '2024-01-14T16:20:00',
    reply: {
      content: 'Cảm ơn bạn đã đánh giá! Về màu sắc, có thể do ánh sáng chụp ảnh khác nhau. Shop luôn cố gắng cải thiện chất lượng hình ảnh để bạn có trải nghiệm tốt nhất. Hy vọng bạn sẽ tiếp tục ủng hộ shop!',
      createdAt: '2024-01-14T17:00:00',
    },
    status: 'replied',
  },
  {
    id: '3',
    productId: 'p3',
    productName: 'Bình Nước Inox 500ml',
    productImage: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100',
    customer: {
      name: 'Lê Văn Cường',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    rating: 5,
    comment: 'Bình giữ nhiệt tốt, thiết kế đẹp, gọn nhẹ. Rất phù hợp để mang đi làm, đi chơi. Giá cả hợp lý. 5 sao!',
    createdAt: '2024-01-14T09:15:00',
    reply: {
      content: 'Cảm ơn bạn rất nhiều! Rất vui khi sản phẩm làm bạn hài lòng. Đừng quên ghé thăm shop để xem thêm các sản phẩm xanh khác nhé! 🌱',
      createdAt: '2024-01-14T10:30:00',
    },
    status: 'replied',
  },
  {
    id: '4',
    productId: 'p1',
    productName: 'Áo Thun Cotton Organic',
    productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100',
    customer: {
      name: 'Phạm Thị Dung',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    rating: 3,
    comment: 'Áo ổn nhưng size hơi nhỏ so với bảng size. Mình thường mặc M nhưng lần này phải đổi sang L mới vừa.',
    createdAt: '2024-01-13T14:45:00',
    status: 'new',
  },
  {
    id: '5',
    productId: 'p2',
    productName: 'Túi Tote Vải Canvas',
    productImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100',
    customer: {
      name: 'Hoàng Văn Em',
      avatar: 'https://i.pravatar.cc/150?img=7',
    },
    rating: 5,
    comment: 'Túi rất đẹp và tiện dụng. Đi chợ, đi học đều được. Chất vải bền, dễ giặt. Shop giao hàng nhanh nữa. Recommend!',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300',
    ],
    createdAt: '2024-01-13T11:20:00',
    status: 'new',
  },
];

export default function ReviewsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'new' | 'replied' | 'low-rating'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(false);

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

  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      const matchesFilter = 
        selectedFilter === 'all' ||
        (selectedFilter === 'new' && review.status === 'new') ||
        (selectedFilter === 'replied' && review.status === 'replied') ||
        (selectedFilter === 'low-rating' && review.rating <= 3);
      
      const matchesSearch = 
        review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });
  }, [reviews, selectedFilter, searchQuery]);

  const stats = useMemo(() => {
    const totalReviews = reviews.length;
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
    const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
      rating,
      count: reviews.filter(r => r.rating === rating).length,
      percentage: (reviews.filter(r => r.rating === rating).length / totalReviews) * 100,
    }));
    
    return {
      total: totalReviews,
      avgRating: avgRating.toFixed(1),
      newReviews: reviews.filter(r => r.status === 'new').length,
      needsAttention: reviews.filter(r => r.rating <= 3 && r.status === 'new').length,
      ratingDistribution,
    };
  }, [reviews]);

  const handleReply = async (reviewId: string) => {
    if (!replyContent.trim()) {
      alert('Vui lòng nhập nội dung phản hồi');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setReviews(prev => prev.map(review => 
        review.id === reviewId
          ? {
              ...review,
              reply: {
                content: replyContent,
                createdAt: new Date().toISOString(),
              },
              status: 'replied' as const,
            }
          : review
      ));
      
      setReplyingTo(null);
      setReplyContent('');
      alert('Đã gửi phản hồi thành công!');
    } catch (error) {
      console.error('Failed to reply:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleHideReview = async (reviewId: string) => {
    if (!confirm('Bạn có chắc chắn muốn ẩn đánh giá này?')) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setReviews(prev => prev.map(review => 
        review.id === reviewId ? { ...review, status: 'hidden' as const } : review
      ));
      
      alert('Đã ẩn đánh giá');
    } catch (error) {
      console.error('Failed to hide review:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
            ⭐
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">⭐ Quản lý Đánh giá</h1>
          <p className="text-gray-600">Theo dõi và phản hồi đánh giá từ khách hàng</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardBody className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">{stats.total}</div>
              <div className="text-sm text-gray-600">Tổng đánh giá</div>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-1">{stats.avgRating} ⭐</div>
              <div className="text-sm text-gray-600">Điểm trung bình</div>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-1">{stats.newReviews}</div>
              <div className="text-sm text-gray-600">Đánh giá mới</div>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-1">{stats.needsAttention}</div>
              <div className="text-sm text-gray-600">Cần chú ý</div>
            </CardBody>
          </Card>
        </div>

        {/* Rating Distribution */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900">Phân bố đánh giá</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {stats.ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-4">
                  <div className="w-16 flex items-center gap-1">
                    <span className="font-medium">{rating}</span>
                    <span className="text-yellow-400">⭐</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right">
                    <span className="font-medium">{count}</span>
                    <span className="text-gray-600 text-sm ml-1">({percentage.toFixed(0)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardBody>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="🔍 Tìm theo sản phẩm, khách hàng hoặc nội dung..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                {[
                  { value: 'all', label: 'Tất cả' },
                  { value: 'new', label: 'Mới' },
                  { value: 'replied', label: 'Đã trả lời' },
                  { value: 'low-rating', label: 'Đánh giá thấp' },
                ].map((filter) => (
                  <Button
                    key={filter.value}
                    variant={selectedFilter === filter.value ? 'primary' : 'outline'}
                    onClick={() => setSelectedFilter(filter.value as any)}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <Card>
              <CardBody className="text-center py-12">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Không có đánh giá</h3>
                <p className="text-gray-600">Chưa có đánh giá nào phù hợp với bộ lọc.</p>
              </CardBody>
            </Card>
          ) : (
            filteredReviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <img
                      src={review.productImage}
                      alt={review.productName}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />

                    {/* Review Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{review.productName}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              {review.customer.avatar ? (
                                <img
                                  src={review.customer.avatar}
                                  alt={review.customer.name}
                                  className="w-6 h-6 rounded-full"
                                />
                              ) : (
                                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                                  👤
                                </div>
                              )}
                              <span className="font-medium">{review.customer.name}</span>
                            </div>
                            <span>•</span>
                            <span>{formatDate(review.createdAt)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {renderStars(review.rating)}
                          {review.status === 'new' && (
                            <Badge className="bg-blue-100 text-blue-700">Mới</Badge>
                          )}
                        </div>
                      </div>

                      {/* Comment */}
                      <p className="text-gray-700 mb-3">{review.comment}</p>

                      {/* Images */}
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {review.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt="Review"
                              className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                            />
                          ))}
                        </div>
                      )}

                      {/* Reply */}
                      {review.reply ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 text-2xl">🏢</div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 mb-1">Phản hồi từ shop</div>
                              <p className="text-gray-700 mb-2">{review.reply.content}</p>
                              <div className="text-xs text-gray-500">{formatDate(review.reply.createdAt)}</div>
                            </div>
                          </div>
                        </div>
                      ) : replyingTo === review.id ? (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Nhập phản hồi của bạn..."
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-3"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleReply(review.id)}
                              disabled={loading}
                              className="flex-1"
                            >
                              {loading ? <LoadingSpinner size="sm" /> : 'Gửi phản hồi'}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyContent('');
                              }}
                              disabled={loading}
                            >
                              Hủy
                            </Button>
                          </div>
                        </div>
                      ) : null}

                      {/* Actions */}
                      {!review.reply && replyingTo !== review.id && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setReplyingTo(review.id)}
                            className="flex-1"
                          >
                            💬 Trả lời
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleHideReview(review.id)}
                            disabled={loading}
                            className="text-red-600 hover:bg-red-50"
                          >
                            🚫 Ẩn
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
