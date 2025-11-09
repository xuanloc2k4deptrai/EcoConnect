# EcoConnect Frontend

Frontend web application cho nền tảng EcoConnect - Green Ecosystem Platform.

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **API Client**: Axios
- **Icons & Images**: Next/Image, Emoji icons

## 📁 Cấu Trúc Thư Mục

```
src/
├── app/                      # Next.js App Router pages
│   ├── marketplace/          # Trang marketplace
│   ├── esg/                  # ESG Dashboard
│   ├── carbon-wallet/        # Carbon Wallet
│   ├── challenges/           # Gamification challenges
│   ├── profile/              # User profile
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   └── LoadingSpinner.tsx
│   ├── layout/               # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── marketplace/          # Marketplace components
│   │   ├── ProductCard.tsx
│   │   └── FilterBar.tsx
│   ├── esg/                  # ESG components
│   │   ├── ESGScore.tsx
│   │   └── MetricsCard.tsx
│   ├── carbon/               # Carbon wallet components
│   │   ├── TransactionHistory.tsx
│   │   ├── OffsetCalculator.tsx
│   │   └── ImpactVisualization.tsx
│   └── gamification/         # Gamification components
│       ├── ChallengeCard.tsx
│       ├── LeaderBoard.tsx
│       └── AchievementBadges.tsx
├── context/                  # React Context
│   └── AuthContext.tsx       # Authentication context
├── hooks/                    # Custom React hooks
│   ├── useCommon.ts          # Common hooks (debounce, localStorage)
│   ├── useProducts.ts        # Product hooks
│   └── useChallenges.ts      # Challenge hooks
├── lib/                      # Utility libraries
│   ├── api.ts                # API client
│   └── utils.ts              # Helper functions
└── types/                    # TypeScript types
    └── index.ts              # Common types
```

## 🎯 Các Tính Năng Chính

### 1. Green Marketplace
- Danh sách sản phẩm với filtering và pagination
- Chi tiết sản phẩm với ESG scores
- Blockchain verification badge
- Carbon footprint tracking

### 2. ESG Dashboard
- Overview scores (Environmental, Social, Governance)
- Circular progress charts
- Detailed metrics cards
- Performance insights

### 3. Carbon Wallet
- Balance tracking
- Transaction history
- Carbon offset calculator
- Environmental impact visualization

### 4. Gamification
- Challenge cards với rewards
- Leaderboard với rankings
- Achievement badges
- Progress tracking

## 🚀 Development

### Prerequisites
```bash
Node.js 18+
npm hoặc yarn
```

### Installation
```bash
cd frontend-web
npm install
```

### Development Server
```bash
npm run dev
```
Mở [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 🔧 Environment Variables

Tạo file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000
```

## 🎨 Component Usage Examples

### Button Component
```tsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

### Card Component
```tsx
import { Card, CardHeader, CardBody } from '@/components/ui/Card';

<Card>
  <CardHeader>
    <h3>Title</h3>
  </CardHeader>
  <CardBody>
    Content here
  </CardBody>
</Card>
```

### Using Hooks
```tsx
import { useProducts } from '@/hooks/useProducts';

const { products, loading, error } = useProducts({ category: 'Electronics' });
```

## 🔐 Authentication

Sử dụng `AuthContext` để quản lý authentication:

```tsx
import { useAuth } from '@/context/AuthContext';

const { user, login, logout } = useAuth();
```

## 📊 State Management

- **Local State**: React useState
- **Global State**: React Context API
- **Form State**: Controlled components
- **Server State**: Custom hooks với API calls

## 🎨 Styling Guidelines

### Tailwind CSS Classes
- Spacing: `p-4`, `m-2`, `gap-4`
- Colors: `text-primary-600`, `bg-green-50`
- Layout: `flex`, `grid`, `container`
- Responsive: `md:flex-row`, `lg:grid-cols-3`

### Color Palette
- Primary: `primary-{50-900}`
- Secondary: `secondary-{50-900}`
- Success: `green-{50-900}`
- Warning: `yellow-{50-900}`
- Error: `red-{50-900}`

## 📱 Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Tất cả components đều responsive với Tailwind breakpoints.

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## 📦 Build Output

```bash
npm run build
# Output: .next/ directory
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t ecoconnect-frontend .
docker run -p 3000:3000 ecoconnect-frontend
```

## 🤝 Contributing

1. Tạo feature branch
2. Commit changes với conventional commits
3. Tạo Pull Request
4. Review và merge

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.
