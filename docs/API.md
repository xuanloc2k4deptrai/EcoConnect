# 📚 EcoConnect API Documentation

## Base URL
```
Development: http://localhost:4000/api/v1
Production: https://api.ecoconnect.vn/api/v1
```

## Authentication

Tất cả các protected endpoints yêu cầu JWT token trong header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 🔐 Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "consumer",
  "profile": {
    "firstName": "Nguyễn",
    "lastName": "Văn A"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {...},
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

---

### 🛍️ Products (Green Marketplace)

#### Get All Products
```http
GET /products?category=fashion&minESG=70&page=1&limit=20
```

**Query Parameters:**
- `category` - Lọc theo danh mục
- `minPrice`, `maxPrice` - Lọc theo giá
- `minESG` - Điểm ESG tối thiểu (0-100)
- `maxCarbon` - Carbon footprint tối đa
- `certifications` - Chứng nhận (phân cách bằng dấu phẩy)
- `recyclable`, `biodegradable`, `fairTrade` - Bộ lọc bền vững (true/false)
- `search` - Tìm kiếm full-text
- `sort` - Sắp xếp: `price`, `-price`, `esgScore`, `-createdAt`
- `page`, `limit` - Phân trang

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Organic Cotton T-Shirt",
      "description": "...",
      "price": 250000,
      "currency": "VND",
      "esgScore": {
        "environmental": 85,
        "social": 80,
        "governance": 75,
        "overall": 80
      },
      "carbonFootprint": {
        "production": 2.0,
        "transportation": 0.5,
        "total": 2.5,
        "unit": "kgCO2e"
      },
      "certifications": [...],
      "sustainability": {...},
      "seller": {...}
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### Create Product (Business only)
```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Eco-friendly Product",
  "description": "...",
  "category": "fashion",
  "price": 250000,
  "images": ["https://..."],
  "esgScore": {
    "environmental": 85,
    "social": 80,
    "governance": 75
  },
  "carbonFootprint": {
    "production": 2.0,
    "transportation": 0.5
  },
  "sustainability": {
    "recyclable": true,
    "biodegradable": true,
    "renewable": true
  },
  "inventory": {
    "quantity": 100,
    "unit": "piece"
  }
}
```

---

### 📊 ESG Metrics

#### Create ESG Report
```http
POST /esg/metrics
Authorization: Bearer <token>
Content-Type: application/json

{
  "reportingPeriod": {
    "startDate": "2024-01-01",
    "endDate": "2024-03-31",
    "quarter": 1,
    "year": 2024
  },
  "environmental": {
    "co2Emissions": {
      "scope1": 100,
      "scope2": 50,
      "scope3": 80
    },
    "energy": {
      "totalConsumption": 5000,
      "renewablePercentage": 60
    },
    "water": {
      "consumption": 1000,
      "recycled": 200
    }
  },
  "social": {...},
  "governance": {...}
}
```

#### Get AI Recommendations
```http
GET /esg/metrics/:id/recommendations
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "category": "environmental",
      "title": "Tăng tỷ lệ năng lượng tái tạo",
      "description": "...",
      "impact": "high",
      "estimatedImprovement": 15,
      "implementationCost": "Medium",
      "priority": 1
    }
  ]
}
```

---

### 💰 Carbon Wallet

#### Get Wallet
```http
GET /carbon-wallet
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSaved": 125.5,
    "currentPoints": 1250,
    "level": 5,
    "badges": ["eco-warrior", "green-shopper"],
    "rank": 156,
    "equivalents": {
      "trees": 6,
      "kmDriven": 500
    }
  }
}
```

#### Add Carbon Savings
```http
POST /carbon-wallet/add-savings
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 2.5,
  "source": "purchase",
  "sourceId": "order_id_123",
  "description": "Mua sản phẩm xanh"
}
```

---

### 🎮 Gamification

#### Get All Challenges
```http
GET /gamification/challenges?category=zero_waste&difficulty=medium
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "30 Ngày Không Túi Nilon",
      "description": "...",
      "category": "zero_waste",
      "difficulty": "medium",
      "duration": 30,
      "rewards": {
        "points": 500,
        "badges": ["plastic-free-champion"],
        "carbonCredits": 5
      },
      "participants": {
        "enrolled": 1250,
        "completed": 450,
        "completionRate": 36
      }
    }
  ]
}
```

#### Enroll in Challenge
```http
POST /gamification/challenges/:id/enroll
Authorization: Bearer <token>
```

#### Check In
```http
POST /gamification/challenges/:id/checkin
Authorization: Bearer <token>
Content-Type: application/json

{
  "proof": "https://...",
  "note": "Hôm nay tôi đã..."
}
```

---

### ⛓️ Blockchain

#### Get Product Passport
```http
GET /blockchain/passport/:productId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tokenId": "123",
    "contractAddress": "0x...",
    "ipfsHash": "Qm...",
    "verified": true,
    "productInfo": {
      "productId": "PROD-001",
      "manufacturer": "0x...",
      "carbonFootprint": 2500,
      "esgScore": 85,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "certifications": [...]
  }
}
```

#### Mint Passport (Business only)
```http
POST /blockchain/mint-passport
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "PROD-001",
  "carbonFootprint": 2.5,
  "esgScore": 85,
  "metadata": {...}
}
```

---

### 🚛 Logistics Optimization

#### Optimize Route
```http
POST /logistics/optimize-route
Authorization: Bearer <token>
Content-Type: application/json

{
  "origin": {
    "latitude": 21.0285,
    "longitude": 105.8542
  },
  "destinations": [
    {
      "latitude": 21.0245,
      "longitude": 105.8412
    }
  ],
  "vehicleType": "electric_car",
  "optimizationMode": "greenest"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "optimizedRoute": [...],
    "totalDistanceKm": 12.5,
    "totalDurationMinutes": 35,
    "totalCarbonKg": 0.0,
    "carbonSavedKg": 3.5,
    "greenScore": 95.5
  }
}
```

---

## Error Responses

Tất cả errors có format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [...]
}
```

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

- General API: 100 requests/15 minutes per IP
- Authentication: 5 requests/15 minutes per IP

---

## Webhooks (Coming Soon)

Subscribe to events:
- `product.created`
- `order.completed`
- `challenge.completed`
- `passport.verified`
