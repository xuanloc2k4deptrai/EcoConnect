# 🚀 Frontend Setup Guide

## Các Bước Setup

### 1. Cài Đặt Dependencies

```bash
cd frontend-web
npm install
```

**Dependencies chính:**
- next@14.0.0
- react@18.2.0
- typescript@5.2.0
- tailwindcss@3.3.0
- axios@1.5.0

### 2. Cấu Hình Environment Variables

Tạo file `.env.local`:

```env
# API URLs
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000

# Optional
NEXT_PUBLIC_ENABLE_MOCK_DATA=true
```

### 3. Chạy Development Server

```bash
npm run dev
```

Truy cập: http://localhost:3000

### 4. Build cho Production

```bash
npm run build
npm start
```

## 📦 Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

## 🎨 Cấu Trúc Components

### UI Components (src/components/ui/)
Các component cơ bản tái sử dụng:
- `Button` - Nút bấm với nhiều variants
- `Card` - Container cho content
- `Input` - Input field với validation
- `Badge` - Label badges
- `Modal` - Dialog/popup
- `LoadingSpinner` - Loading indicator

### Feature Components

#### Marketplace (src/components/marketplace/)
- `ProductCard` - Hiển thị sản phẩm
- `FilterBar` - Bộ lọc sản phẩm

#### ESG (src/components/esg/)
- `ESGScore` - Circular progress scores
- `MetricsCard` - Metrics với progress bars

#### Carbon Wallet (src/components/carbon/)
- `TransactionHistory` - Lịch sử giao dịch
- `OffsetCalculator` - Tính toán carbon offset
- `ImpactVisualization` - Visualize impact

#### Gamification (src/components/gamification/)
- `ChallengeCard` - Challenge cards
- `LeaderBoard` - Bảng xếp hạng
- `AchievementBadges` - Badges collection

## 🔧 Troubleshooting

### Lỗi TypeScript
Nếu gặp lỗi "Cannot find module", cài đặt types:
```bash
npm install --save-dev @types/react @types/node
```

### Lỗi Tailwind CSS
Nếu styles không apply, rebuild:
```bash
rm -rf .next
npm run dev
```

### Port đã được sử dụng
Đổi port trong package.json:
```json
"dev": "next dev -p 3001"
```

## 📁 File Paths

Tất cả imports sử dụng alias `@/`:

```tsx
import { Button } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/types';
import { apiClient } from '@/lib/api';
```

Cấu hình trong `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 🎯 Các Trang Chính

| Route | Component | Mô tả |
|-------|-----------|-------|
| `/` | `app/page.tsx` | Trang chủ |
| `/marketplace` | `app/marketplace/page.tsx` | Marketplace |
| `/esg` | `app/esg/page.tsx` | ESG Dashboard |
| `/carbon-wallet` | `app/carbon-wallet/page.tsx` | Carbon Wallet |
| `/challenges` | `app/challenges/page.tsx` | Challenges |

## 🔐 Authentication Flow

1. User login qua `AuthContext`
2. Token lưu trong localStorage
3. API requests tự động thêm token vào header
4. Protected routes kiểm tra authentication

```tsx
const { user, login, logout } = useAuth();

if (!user) {
  return <LoginPage />;
}
```

## 📊 Data Fetching

Sử dụng custom hooks:

```tsx
// Products
const { products, loading, error } = useProducts(filters);

// Challenges
const { challenges, enrollChallenge } = useChallenges();
```

## 🎨 Theming

Colors được định nghĩa trong `tailwind.config.js`:

```js
colors: {
  primary: { ... },
  secondary: { ... },
  accent: { ... }
}
```

Sử dụng:
```tsx
<div className="bg-primary-600 text-white">
```

## 📱 Responsive Design

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code lên GitHub
2. Import project vào Vercel
3. Cấu hình environment variables
4. Deploy!

### Docker
```bash
docker build -t ecoconnect-frontend .
docker run -p 3000:3000 ecoconnect-frontend
```

### Manual
```bash
npm run build
npm start
```

## ✅ Checklist trước khi chạy

- [ ] Node.js 18+ đã cài đặt
- [ ] npm install thành công
- [ ] .env.local đã tạo
- [ ] Backend API đang chạy (port 4000)
- [ ] Port 3000 available

## 🆘 Support

Nếu gặp vấn đề:
1. Check console logs
2. Check Network tab trong DevTools
3. Verify API endpoints
4. Check environment variables

## 🎉 Next Steps

1. Chạy backend API
2. Test các trang chính
3. Integrate với real data
4. Add more features
5. Write tests
6. Deploy to production
