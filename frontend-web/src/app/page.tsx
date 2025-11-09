/**
 * EcoConnect Web - Home Page
 */

import Image from 'next/image';
import Link from 'next/link';
import { FaLeaf, FaRecycle, FaChartLine, FaTrophy } from 'react-icons/fa';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CarbonImpact from '@/components/home/CarbonImpact';
import ActiveChallenges from '@/components/home/ActiveChallenges';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 text-white overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-accent-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-secondary-400 opacity-20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                🌱 Nền tảng xanh hàng đầu Việt Nam
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                Kết nối với <br />
                <span className="text-accent-300 inline-block animate-pulse">Tương lai Xanh</span>
              </h1>
              <p className="text-xl text-gray-100 leading-relaxed">
                Nền tảng thương mại điện tử dành riêng cho sản phẩm bền vững, 
                kết nối doanh nghiệp xanh và người tiêu dùng có trách nhiệm.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/marketplace"
                  className="group bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-accent-300 hover:text-white transition-all shadow-lg hover:shadow-xl hover:scale-105 transform text-center"
                >
                  <span className="flex items-center justify-center gap-2">
                    Khám phá sản phẩm
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
                <Link 
                  href="/about"
                  className="border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-all hover:scale-105 transform text-center backdrop-blur-sm"
                >
                  Tìm hiểu thêm
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all hover:scale-105 transform">
                  <div className="text-3xl md:text-4xl font-bold mb-1">10K+</div>
                  <div className="text-sm text-gray-200">Sản phẩm xanh</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all hover:scale-105 transform">
                  <div className="text-3xl md:text-4xl font-bold mb-1">500+</div>
                  <div className="text-sm text-gray-200">Doanh nghiệp</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all hover:scale-105 transform">
                  <div className="text-3xl md:text-4xl font-bold mb-1">50 tấn</div>
                  <div className="text-sm text-gray-200">CO₂ tiết kiệm</div>
                </div>
              </div>
            </div>
            
            <div className="relative h-96 animate-slide-up hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-400/20 to-secondary-400/20 rounded-3xl blur-3xl"></div>
              <div className="relative h-full flex items-center justify-center">
                <div className="w-full h-full relative">
                  {/* Placeholder for hero image/illustration */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border-2 border-white/20">
                    <div className="text-center">
                      <FaLeaf className="w-32 h-32 mx-auto mb-4 text-accent-300 animate-bounce-slow" />
                      <p className="text-white/80 text-lg">Hero Illustration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Tính năng</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-4">
            Giải pháp <span className="text-primary-600">toàn diện</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Mọi công cụ bạn cần để bắt đầu hành trình xanh và tạo ra tác động tích cực
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FaLeaf className="text-4xl" />}
            title="Sản phẩm xanh"
            description="Chỉ dành cho sản phẩm thân thiện với môi trường được xác thực bởi blockchain"
            color="primary"
          />
          <FeatureCard
            icon={<FaChartLine className="text-4xl" />}
            title="ESG Dashboard"
            description="Theo dõi và báo cáo chỉ số bền vững của doanh nghiệp theo tiêu chuẩn quốc tế"
            color="secondary"
          />
          <FeatureCard
            icon={<FaRecycle className="text-4xl" />}
            title="Ví Carbon"
            description="Tích điểm và nhận thưởng từ hành vi tiêu dùng xanh của bạn"
            color="accent"
          />
          <FeatureCard
            icon={<FaTrophy className="text-4xl" />}
            title="Thử thách xanh"
            description="Tham gia cộng đồng và thay đổi thói quen hàng ngày cùng nghìn người khác"
            color="primary"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-display font-bold">
              Sản phẩm nổi bật
            </h2>
            <Link 
              href="/marketplace"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Xem tất cả →
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Carbon Impact */}
      <section className="container mx-auto px-4">
        <CarbonImpact />
      </section>

      {/* Active Challenges */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            Thử thách đang diễn ra
          </h2>
          <ActiveChallenges />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600 text-white py-24 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-400 opacity-20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold mb-6">
              🚀 Miễn phí 30 ngày dùng thử
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Bắt đầu hành trình <br />
              <span className="text-accent-300">xanh của bạn</span> ngay hôm nay
            </h2>
            <p className="text-xl mb-10 text-gray-100 leading-relaxed">
              Tham gia cùng hàng nghìn người đang tạo ra sự thay đổi tích cực cho hành tinh
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/register"
                className="group bg-white text-primary-600 px-12 py-5 rounded-xl font-bold text-lg hover:bg-accent-300 hover:text-white transition-all shadow-2xl hover:shadow-accent-400/50 hover:scale-105 transform"
              >
                <span className="flex items-center gap-2">
                  Đăng ký ngay
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link 
                href="/contact"
                className="border-2 border-white px-12 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-primary-600 transition-all hover:scale-105 transform backdrop-blur-sm"
              >
                Liên hệ tư vấn
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Không cần thẻ tín dụng</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Hủy bất cứ lúc nào</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'primary' | 'secondary' | 'accent';
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white',
    secondary: 'bg-secondary-100 text-secondary-600 group-hover:bg-secondary-600 group-hover:text-white',
    accent: 'bg-accent-100 text-accent-600 group-hover:bg-accent-600 group-hover:text-white',
  };

  const borderClasses = {
    primary: 'border-primary-200 group-hover:border-primary-600',
    secondary: 'border-secondary-200 group-hover:border-secondary-600',
    accent: 'border-accent-200 group-hover:border-accent-600',
  };

  return (
    <div className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 ${borderClasses[color]} hover:-translate-y-2`}>
      <div className={`w-16 h-16 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-md`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      
      {/* Arrow indicator */}
      <div className="mt-4 flex items-center text-sm font-semibold text-gray-400 group-hover:text-primary-600 transition-colors">
        <span className="mr-2">Tìm hiểu thêm</span>
        <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
