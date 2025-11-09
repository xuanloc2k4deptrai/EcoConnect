# 🌱 EcoConnect - Nền tảng Hệ sinh thái Xanh Toàn diện

## 📋 Tổng quan

EcoConnect là một nền tảng số toàn diện kết nối các nhà sản xuất bền vững, thương hiệu thân thiện môi trường và người tiêu dùng có trách nhiệm.

## 🎯 Các tính năng chính

1. **Chợ sản phẩm xanh (Green Marketplace)** - Sàn TMĐT cho sản phẩm xanh
2. **Hộ chiếu xanh Blockchain (Green Product Passport)** - NFT xác thực nguồn gốc
3. **Logistics xanh AI (AI-driven Green Logistics)** - Tối ưu hóa vận chuyển
4. **Bảng điều khiển ESG (ESG Dashboard)** - Báo cáo và phân tích ESG
5. **Ví Carbon (Carbon Wallet)** - Theo dõi và thưởng hành vi xanh
6. **Thử thách xanh (Green Challenge)** - Gamification cho cộng đồng

## 🏗️ Kiến trúc hệ thống

```
EcoConnect/
├── frontend-web/          # Next.js + React + Tailwind CSS
├── mobile-app/            # React Native
├── backend-api/           # Node.js + Express + MongoDB
├── ai-service/            # Python + FastAPI (AI/ML)
├── blockchain/            # Solidity Smart Contracts
├── shared/                # Shared types, utils, configs
├── infrastructure/        # Docker, K8s, CI/CD
└── docs/                  # Documentation
```

## 🚀 Tech Stack

### Frontend
- **Web**: Next.js 14, React 18, Tailwind CSS, TypeScript
- **Mobile**: React Native, Expo

### Backend
- **API**: Node.js, Express, TypeScript
- **Database**: MongoDB (Primary), PostgreSQL (Analytics)
- **Cache**: Redis
- **Message Queue**: RabbitMQ

### Blockchain
- **Smart Contracts**: Solidity
- **Network**: Polygon (Mainnet/Mumbai Testnet)
- **Storage**: IPFS (NFT Metadata)
- **Library**: Ethers.js, Hardhat

### AI/ML
- **Framework**: Python, FastAPI
- **ML Libraries**: scikit-learn, TensorFlow
- **Routing**: Google Maps API, OR-Tools

### DevOps
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus, Grafana
- **Logging**: ELK Stack

## 📦 Cài đặt và Chạy

### Yêu cầu hệ thống
- Node.js >= 18.x
- Python >= 3.10
- MongoDB >= 6.0
- Docker & Docker Compose
- Git

### Cài đặt nhanh

```bash
# Clone repository
git clone https://github.com/your-org/ecoconnect.git
cd ecoconnect

# Cài đặt dependencies
npm install

# Copy environment variables
cp .env.example .env

# Chạy với Docker Compose
docker-compose up -d

# Hoặc chạy từng service riêng lẻ:
# Backend API
cd backend-api && npm install && npm run dev

# Frontend Web
cd frontend-web && npm install && npm run dev

# AI Service
cd ai-service && pip install -r requirements.txt && uvicorn main:app --reload

# Blockchain (Deploy contracts)
cd blockchain && npm install && npx hardhat run scripts/deploy.js
```

## 🔑 Biến môi trường

Xem file `.env.example` trong mỗi service để biết chi tiết.

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Blockchain Integration](./docs/BLOCKCHAIN.md)
- [AI Service Guide](./docs/AI_SERVICE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🤝 Đóng góp

Xem [CONTRIBUTING.md](./CONTRIBUTING.md) để biết cách đóng góp vào dự án.

## 📄 License

MIT License - xem file [LICENSE](./LICENSE)

## � Demo

**Live Demo**: [https://eco-connect.vercel.app](https://eco-connect.vercel.app) _(Đang cập nhật)_

> **Lưu ý cho Ban Giám khảo**: Đây là phiên bản demo frontend của dự án. Backend API và AI services sẽ được triển khai trong giai đoạn tiếp theo.

## 🎯 Hướng dẫn Deploy

### Deploy Frontend lên Vercel

1. **Push code lên GitHub** (đã hoàn thành ✅)
2. **Kết nối với Vercel**:
   - Truy cập [vercel.com](https://vercel.com)
   - Click "Import Project" → Chọn repository `EcoConnect`
   - **Root Directory**: Chọn `frontend-web`
   - **Framework Preset**: Next.js (auto-detected)
   - **Environment Variables** (nếu cần):
     - `NEXT_PUBLIC_API_URL`: URL backend API (có thể để mock)
     - `NEXT_PUBLIC_CONTRACT_ADDRESS`: Blockchain contract address
3. **Deploy**: Click "Deploy" và đợi build hoàn tất

### Deploy qua Vercel CLI (Alternative)

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Chuyển vào thư mục frontend
cd frontend-web

# Login và deploy
vercel login
vercel --prod
```

## �📞 Liên hệ

- Website: https://ecoconnect.vn
- Email: contact@ecoconnect.vn
- Discord: https://discord.gg/ecoconnect
