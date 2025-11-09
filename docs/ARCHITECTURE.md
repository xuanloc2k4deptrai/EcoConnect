# 🏗️ EcoConnect Architecture Guide

## Tổng quan kiến trúc

EcoConnect được xây dựng theo kiến trúc microservices với các thành phần độc lập:

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
├─────────────────┬───────────────────────────────────────┤
│   Web App       │   Mobile App    │   Admin Dashboard   │
│  (Next.js)      │  (React Native) │      (Next.js)      │
└────────┬────────┴─────────┬───────┴──────────┬──────────┘
         │                  │                   │
         └──────────────────┴───────────────────┘
                            │
         ┌──────────────────┴──────────────────┐
         │          API Gateway                 │
         │      (Load Balancer + NGINX)         │
         └──────────────────┬──────────────────┘
                            │
         ┌──────────────────┴──────────────────┐
         │                                      │
    ┌────▼────┐  ┌──────────┐  ┌─────────────┐
    │ Backend │  │    AI    │  │ Blockchain  │
    │   API   │  │ Service  │  │   Service   │
    │(Node.js)│  │(FastAPI) │  │ (Ethers.js) │
    └────┬────┘  └────┬─────┘  └──────┬──────┘
         │            │                │
    ┌────▼────┐  ┌───▼──────┐    ┌───▼────────┐
    │MongoDB  │  │ MongoDB  │    │  Polygon   │
    │Redis    │  │          │    │ Blockchain │
    │RabbitMQ │  │          │    │   + IPFS   │
    └─────────┘  └──────────┘    └────────────┘
```

## Các thành phần chính

### 1. Frontend Web (Next.js 14)

**Công nghệ:**
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript
- Zustand (State management)
- React Query (Data fetching)

**Cấu trúc:**
```
frontend-web/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (auth)/       # Authentication routes
│   │   ├── marketplace/  # Product marketplace
│   │   ├── dashboard/    # ESG Dashboard
│   │   ├── wallet/       # Carbon Wallet
│   │   └── challenges/   # Green Challenges
│   ├── components/       # Reusable components
│   │   ├── common/
│   │   ├── layout/
│   │   └── features/
│   ├── lib/             # Utilities & helpers
│   ├── hooks/           # Custom React hooks
│   └── stores/          # Zustand stores
```

**Tính năng:**
- Server-side rendering (SSR)
- Static site generation (SSG)
- Incremental static regeneration (ISR)
- Image optimization
- Code splitting

---

### 2. Backend API (Node.js + Express)

**Công nghệ:**
- Node.js 18+
- Express.js
- TypeScript
- MongoDB (Database)
- Redis (Caching)
- RabbitMQ (Message Queue)

**Kiến trúc Clean Architecture:**
```
backend-api/
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── repositories/    # Data access layer
│   ├── models/          # Mongoose schemas
│   ├── middlewares/     # Express middlewares
│   ├── routes/          # API routes
│   ├── utils/           # Utilities
│   └── config/          # Configuration
```

**Design Patterns:**
- **Controller-Service-Repository pattern**
- **Dependency Injection**
- **Factory pattern** (cho models)
- **Strategy pattern** (cho authentication)
- **Observer pattern** (cho events)

**Security:**
- JWT Authentication
- Bcrypt password hashing
- Helmet (Security headers)
- Rate limiting
- CORS configuration
- Input validation (Joi)

---

### 3. AI Service (Python + FastAPI)

**Công nghệ:**
- Python 3.10+
- FastAPI
- scikit-learn, TensorFlow
- Google OR-Tools
- Google Maps API

**Chức năng:**

#### A. Logistics Optimization
- **Route Optimization**: TSP (Traveling Salesman Problem) solving
- **Batch Orders**: Clustering algorithms cho gom đơn
- **Carbon Footprint**: Tính toán emissions dựa trên:
  - Khoảng cách
  - Loại phương tiện
  - Trọng lượng hàng hóa
  
#### B. ESG Analytics
- **Score Calculation**: Thuật toán tính điểm ESG
- **Recommendations**: ML model đề xuất cải thiện
- **Trend Prediction**: Time series forecasting
- **Benchmarking**: So sánh với ngành

#### C. Carbon Calculations
- Product lifecycle assessment
- Supply chain emissions
- Comparative analysis

**ML Models:**
```python
# ESG Score Prediction
esg_model = RandomForestRegressor()

# Route Optimization
from ortools.constraint_solver import pywrapcp

# Trend Forecasting
from sklearn.ensemble import GradientBoostingRegressor
```

---

### 4. Blockchain Module (Solidity + Hardhat)

**Công nghệ:**
- Solidity 0.8.20
- Hardhat
- OpenZeppelin Contracts
- Polygon Network
- IPFS (Metadata storage)

**Smart Contract: GreenProductPassport**

```solidity
contract GreenProductPassport is ERC721 {
    struct ProductInfo {
        string productId;
        address manufacturer;
        uint256 carbonFootprint;
        uint8 esgScore;
        bool verified;
    }
    
    function mintPassport(...) external;
    function verifyPassport(...) external;
    function addCertification(...) external;
}
```

**Features:**
- NFT-based product passports
- On-chain verification
- IPFS metadata storage
- Multi-signature verification
- Upgradeable contracts (Proxy pattern)

**Security:**
- Access control (Ownable)
- Reentrancy guards
- Integer overflow protection
- Gas optimization

---

### 5. Database Design

#### MongoDB Collections:

**Users**
```javascript
{
  _id: ObjectId,
  email: String,
  role: Enum['consumer', 'business', 'admin'],
  profile: {...},
  carbonWallet: {...},
  gamification: {...}
}
```

**Products**
```javascript
{
  _id: ObjectId,
  name: String,
  seller: ObjectId,
  esgScore: {...},
  carbonFootprint: {...},
  certifications: [...],
  blockchainPassport: {...}
}
```

**ESGMetrics**
```javascript
{
  _id: ObjectId,
  business: ObjectId,
  reportingPeriod: {...},
  environmental: {...},
  social: {...},
  governance: {...},
  scores: {...}
}
```

#### PostgreSQL (Analytics)
```sql
-- Time-series data for analytics
CREATE TABLE carbon_savings (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255),
  amount DECIMAL(10,2),
  source VARCHAR(50),
  created_at TIMESTAMP
);

-- Aggregated statistics
CREATE TABLE esg_benchmarks (
  industry VARCHAR(100),
  avg_environmental DECIMAL(5,2),
  avg_social DECIMAL(5,2),
  avg_governance DECIMAL(5,2)
);
```

---

### 6. Caching Strategy (Redis)

**Cache Keys:**
```
products:list:{filters}        TTL: 5 min
products:detail:{id}           TTL: 10 min
user:profile:{id}              TTL: 30 min
esg:benchmark:{industry}       TTL: 1 day
challenges:active              TTL: 1 hour
```

**Cache Invalidation:**
- Write-through: Update cache khi update DB
- Cache-aside: Lazy loading
- Time-based expiration

---

### 7. Message Queue (RabbitMQ)

**Queues:**

1. **email-queue**: Gửi email verification, notifications
2. **analytics-queue**: Xử lý analytics data
3. **blockchain-queue**: Mint NFT, verify passports
4. **ai-queue**: ML predictions, route optimization

**Pattern:**
- Publisher/Subscriber
- Work Queue
- RPC (Request/Reply)

---

### 8. API Gateway & Load Balancing

**NGINX Configuration:**
```nginx
upstream backend_api {
    server backend-1:4000;
    server backend-2:4000;
    server backend-3:4000;
}

upstream ai_service {
    server ai-1:8000;
    server ai-2:8000;
}

server {
    location /api/ {
        proxy_pass http://backend_api;
    }
    
    location /ai/ {
        proxy_pass http://ai_service;
    }
}
```

---

### 9. Monitoring & Logging

**Stack:**
- **Prometheus**: Metrics collection
- **Grafana**: Visualization
- **ELK Stack**: Logs aggregation
- **Sentry**: Error tracking

**Metrics:**
- Request rate, latency, error rate
- Database connection pool
- Cache hit rate
- Queue depth
- Carbon savings (business metric)

---

### 10. Deployment Strategy

**Environments:**
- Development (local)
- Staging (pre-production)
- Production

**CI/CD Pipeline:**
```
Code Push → GitHub Actions → Build → Test → Docker Build → 
Registry → Deploy → Health Check → Route Traffic
```

**Container Orchestration:**
- Docker Compose (Development)
- Kubernetes (Production)

**Scaling:**
- Horizontal scaling for stateless services
- Read replicas for databases
- CDN for static assets

---

## Security Best Practices

1. **Authentication & Authorization**
   - JWT with refresh tokens
   - Role-based access control (RBAC)
   - OAuth2 for third-party login

2. **Data Protection**
   - Encryption at rest (MongoDB encryption)
   - TLS/SSL for data in transit
   - PII data masking in logs

3. **API Security**
   - Rate limiting
   - Input validation
   - SQL/NoSQL injection prevention
   - CSRF protection

4. **Infrastructure**
   - Private networks
   - Firewall rules
   - DDoS protection
   - Regular security audits

---

## Performance Optimization

1. **Frontend**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Service Workers (PWA)

2. **Backend**
   - Database indexing
   - Query optimization
   - Caching strategy
   - Connection pooling

3. **Network**
   - CDN for static files
   - Compression (gzip, brotli)
   - HTTP/2
   - Load balancing

---

## Disaster Recovery

**Backup Strategy:**
- Database: Daily full backup + hourly incremental
- Files: Real-time replication to S3
- Blockchain: Node sync from multiple sources

**Recovery Time Objective (RTO):** < 1 hour
**Recovery Point Objective (RPO):** < 15 minutes
