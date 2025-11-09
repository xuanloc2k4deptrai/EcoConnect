# 📁 EcoConnect Project Structure

## 🌳 Cấu Trúc Thư Mục Tổng Thể

```
EcoConnect/
├── 📂 .github/                    # GitHub Actions CI/CD
│   └── workflows/
│       └── ci-cd.yml             # Pipeline tự động
│
├── 📂 backend-api/               # Node.js Backend API
│   ├── src/
│   │   ├── config/              # Database, Redis config
│   │   ├── controllers/         # Business logic
│   │   ├── middlewares/         # Auth, validation, error handling
│   │   ├── models/              # MongoDB schemas
│   │   ├── routes/              # API endpoints (9 routes)
│   │   └── utils/               # Helper functions
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── 📂 ai-service/                # Python AI/ML Service
│   ├── services/
│   │   └── logistics_service.py  # Route optimization
│   ├── main.py                   # FastAPI app
│   ├── models.py                 # Pydantic models
│   ├── requirements.txt
│   └── Dockerfile
│
├── 📂 blockchain/                # Solidity Smart Contracts
│   ├── contracts/
│   │   └── GreenProductPassport.sol  # ERC-721 NFT
│   ├── scripts/
│   │   ├── deploy.js            # Deployment script
│   │   └── interact.js          # Contract interaction
│   ├── hardhat.config.js
│   └── package.json
│
├── 📂 frontend-web/              # Next.js 14 Frontend ⭐
│   ├── src/
│   │   ├── app/                 # Next.js App Router
│   │   │   ├── marketplace/     # 🛒 Green Marketplace
│   │   │   ├── esg/             # 📊 ESG Dashboard
│   │   │   ├── carbon-wallet/   # 🌱 Carbon Wallet
│   │   │   ├── challenges/      # 🎯 Gamification
│   │   │   ├── profile/         # 👤 User Profile
│   │   │   ├── layout.tsx       # Root layout
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── providers.tsx    # Context providers
│   │   │   └── globals.css      # Global styles
│   │   │
│   │   ├── components/          # React Components
│   │   │   ├── ui/              # 🎨 UI Components (6 files)
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── layout/          # 🏗️ Layout Components
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   │
│   │   │   ├── marketplace/     # 🛍️ Marketplace Components
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── FilterBar.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── esg/             # 📈 ESG Components
│   │   │   │   ├── ESGScore.tsx
│   │   │   │   ├── MetricsCard.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── carbon/          # 🌍 Carbon Components
│   │   │   │   ├── TransactionHistory.tsx
│   │   │   │   ├── OffsetCalculator.tsx
│   │   │   │   ├── ImpactVisualization.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── gamification/    # 🎮 Gamification Components
│   │   │       ├── ChallengeCard.tsx
│   │   │       ├── LeaderBoard.tsx
│   │   │       ├── AchievementBadges.tsx
│   │   │       └── index.ts
│   │   │
│   │   ├── context/             # ⚛️ React Context
│   │   │   └── AuthContext.tsx   # Authentication
│   │   │
│   │   ├── hooks/               # 🎣 Custom Hooks
│   │   │   ├── useCommon.ts     # debounce, localStorage
│   │   │   ├── useProducts.ts   # Product data
│   │   │   └── useChallenges.ts # Challenge data
│   │   │
│   │   ├── lib/                 # 📚 Utilities
│   │   │   ├── api.ts           # API client (Axios)
│   │   │   └── utils.ts         # Helper functions
│   │   │
│   │   └── types/               # 📝 TypeScript Types
│   │       └── index.ts         # All type definitions
│   │
│   ├── Dockerfile
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   ├── README.md
│   └── SETUP.md
│
├── 📂 docs/                      # Documentation
│   ├── API.md                    # API documentation
│   ├── ARCHITECTURE.md           # System architecture
│   └── DEPLOYMENT.md             # Deployment guide
│
├── 📄 docker-compose.yml         # Multi-service orchestration
├── 📄 .env.example               # Environment variables template
├── 📄 .gitignore                 # Git ignore rules
├── 📄 package.json               # Root package.json
├── 📄 README.md                  # Main documentation
├── 📄 CONTRIBUTING.md            # Contribution guidelines
└── 📄 LICENSE                    # MIT License
```

## 📊 Thống Kê Dự Án

### Backend API
- **Files**: 25+ TypeScript files
- **Routes**: 9 API routes
- **Models**: 4 main models (User, Product, ESG, Challenge)
- **Middlewares**: 5 middlewares

### AI Service
- **Files**: 4 Python files
- **Services**: Logistics optimization, ESG analysis
- **Framework**: FastAPI

### Blockchain
- **Contracts**: 1 Solidity contract (ERC-721)
- **Scripts**: 2 deployment/interaction scripts
- **Network**: Polygon (Mumbai/Mainnet)

### Frontend Web ⭐
- **Total Files**: 44 files
- **Components**: 18 React components
- **Pages**: 5 main pages
- **Hooks**: 3 custom hooks
- **Context**: 1 Auth context
- **Types**: Complete TypeScript coverage

### Documentation
- **Guides**: 4 comprehensive docs
- **Total Words**: 10,000+ words

## 🎯 Các Module Chính

### 1️⃣ Green Marketplace (Marketplace)
- Product listing với filtering
- ESG scores & carbon footprint
- Blockchain verification
- Product details

### 2️⃣ ESG Dashboard
- Environmental metrics
- Social metrics
- Governance metrics
- Visual charts & insights

### 3️⃣ Carbon Wallet
- Balance tracking
- Transaction history
- Offset calculator
- Impact visualization

### 4️⃣ Gamification
- Challenge system
- Leaderboard
- Achievement badges
- Points & rewards

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/your-org/ecoconnect.git
cd EcoConnect

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start services
docker-compose up -d

# Frontend development
cd frontend-web
npm install
npm run dev
```

## 📦 Tech Stack Summary

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript, MongoDB, Redis |
| AI/ML | Python, FastAPI, scikit-learn, TensorFlow |
| Blockchain | Solidity, Hardhat, Polygon, IPFS |
| DevOps | Docker, Docker Compose, GitHub Actions |

## ✅ Status

- ✅ Backend API - Completed
- ✅ AI Service - Completed
- ✅ Blockchain - Completed
- ✅ Frontend - **Completed (44 files)**
- ✅ Documentation - Completed
- ✅ DevOps - Completed

## 🎉 Ready to Use!

Toàn bộ dự án đã được setup hoàn chỉnh và sẵn sàng để development!
