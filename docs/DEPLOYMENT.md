# 🚀 Hướng dẫn Deployment - EcoConnect

## Yêu cầu hệ thống

### Development
- Node.js >= 18.x
- Python >= 3.10
- MongoDB >= 6.0
- Redis >= 7.0
- Docker & Docker Compose
- Git

### Production
- Linux server (Ubuntu 22.04 LTS)
- 4+ CPU cores
- 8GB+ RAM
- 100GB+ SSD
- Domain name & SSL certificate

---

## Setup Development Environment

### 1. Clone Repository
```bash
git clone https://github.com/your-org/ecoconnect.git
cd ecoconnect
```

### 2. Setup Environment Variables
```bash
# Copy example env files
cp .env.example .env
cd backend-api && cp .env.example .env
cd ../frontend-web && cp .env.example .env.local
cd ../ai-service && cp .env.example .env
```

### 3. Install Dependencies
```bash
# Root
npm install

# Backend
cd backend-api && npm install

# Frontend
cd ../frontend-web && npm install

# AI Service
cd ../ai-service && pip install -r requirements.txt

# Blockchain
cd ../blockchain && npm install
```

### 4. Start Services với Docker Compose
```bash
# Start databases and services
docker-compose up -d

# Check services status
docker-compose ps
```

### 5. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend-api
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend-web
npm run dev
```

**Terminal 3 - AI Service:**
```bash
cd ai-service
python -m uvicorn main:app --reload
```

### 6. Access Applications
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api/v1
- AI Service: http://localhost:8000/docs
- MongoDB: localhost:27017
- Redis: localhost:6379

---

## Deploy to Production

### Option 1: Docker Compose (Simple)

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f
```

### Option 2: Kubernetes (Recommended)

#### Prerequisites
- Kubernetes cluster (GKE, EKS, AKS)
- kubectl configured
- Helm 3.x

#### 1. Create Namespace
```bash
kubectl create namespace ecoconnect
kubectl config set-context --current --namespace=ecoconnect
```

#### 2. Setup Secrets
```bash
# Database credentials
kubectl create secret generic db-credentials \
  --from-literal=mongodb-uri='mongodb://...' \
  --from-literal=redis-url='redis://...'

# JWT secrets
kubectl create secret generic jwt-secrets \
  --from-literal=jwt-secret='your-secret' \
  --from-literal=refresh-secret='your-refresh-secret'

# Blockchain keys
kubectl create secret generic blockchain-secrets \
  --from-literal=private-key='0x...' \
  --from-literal=ipfs-id='...' \
  --from-literal=ipfs-secret='...'
```

#### 3. Deploy with Helm
```bash
# Add Helm repo
helm repo add ecoconnect https://charts.ecoconnect.vn
helm repo update

# Install
helm install ecoconnect ecoconnect/ecoconnect \
  --namespace ecoconnect \
  --values values.production.yaml
```

#### 4. Configure Ingress
```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ecoconnect-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - ecoconnect.vn
    - api.ecoconnect.vn
    secretName: ecoconnect-tls
  rules:
  - host: ecoconnect.vn
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend
            port:
              number: 3000
  - host: api.ecoconnect.vn
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: backend-api
            port:
              number: 4000
```

```bash
kubectl apply -f ingress.yaml
```

#### 5. Setup Auto-scaling
```yaml
# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

---

## Database Migration

### MongoDB
```bash
# Run migrations
cd backend-api
npm run migrate:up

# Rollback
npm run migrate:down
```

### Seeding Data
```bash
# Seed sample data
npm run seed

# Seed production data
npm run seed:prod
```

---

## SSL Certificate Setup

### Let's Encrypt with Cert-Manager
```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Create ClusterIssuer
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@ecoconnect.vn
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

---

## Monitoring Setup

### Prometheus & Grafana
```bash
# Install Prometheus stack
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace

# Access Grafana
kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80
# Username: admin
# Password: prom-operator
```

### Import Dashboards
- Node Exporter: Dashboard ID 1860
- MongoDB: Dashboard ID 2583
- Redis: Dashboard ID 11835
- Custom EcoConnect Dashboard: `monitoring/dashboards/ecoconnect.json`

---

## Backup & Restore

### MongoDB Backup
```bash
# Backup
mongodump --uri="mongodb://..." --out=/backup/$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb://..." /backup/20240101
```

### Automated Backup (CronJob)
```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: mongodb-backup
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: mongo:6.0
            command:
            - /bin/sh
            - -c
            - |
              mongodump --uri=$MONGODB_URI --out=/backup/$(date +%Y%m%d)
              # Upload to S3
              aws s3 cp /backup s3://ecoconnect-backups/ --recursive
          restartPolicy: OnFailure
```

---

## Blockchain Deployment

### Deploy Smart Contracts

#### Mumbai Testnet
```bash
cd blockchain
npm run deploy:mumbai
```

#### Polygon Mainnet
```bash
# Ensure you have MATIC tokens for gas
npm run deploy:polygon
```

#### Verify Contracts
```bash
npx hardhat verify --network polygon <CONTRACT_ADDRESS>
```

### Setup IPFS Node
```bash
# Run IPFS daemon
docker run -d \
  --name ipfs_host \
  -v ipfs_data:/data/ipfs \
  -p 4001:4001 \
  -p 5001:5001 \
  -p 8080:8080 \
  ipfs/kubo:latest
```

---

## Performance Optimization

### 1. Enable CDN
- CloudFlare or AWS CloudFront
- Cache static assets
- Image optimization

### 2. Database Optimization
```javascript
// Create indexes
db.products.createIndex({ "esgScore.overall": -1 });
db.products.createIndex({ seller: 1, createdAt: -1 });
db.users.createIndex({ email: 1 }, { unique: true });
```

### 3. Redis Caching
```javascript
// Cache frequently accessed data
await redis.setex('products:featured', 3600, JSON.stringify(products));
```

---

## Health Checks

### Backend API
```bash
curl http://localhost:4000/health
```

### AI Service
```bash
curl http://localhost:8000/health
```

### Database
```bash
mongo --eval "db.adminCommand('ping')"
redis-cli ping
```

---

## Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```bash
# Check MongoDB status
docker-compose ps mongodb

# View logs
docker-compose logs mongodb

# Restart
docker-compose restart mongodb
```

**2. Redis Connection Timeout**
```bash
# Check Redis
redis-cli ping

# Clear cache
redis-cli FLUSHALL
```

**3. Port Already in Use**
```bash
# Find process
lsof -i :4000

# Kill process
kill -9 <PID>
```

**4. Out of Memory**
```bash
# Check memory usage
docker stats

# Increase Node.js memory
NODE_OPTIONS=--max-old-space-size=4096 npm start
```

---

## Rollback Strategy

### Kubernetes
```bash
# Rollback to previous version
kubectl rollout undo deployment/backend-api

# Check rollout status
kubectl rollout status deployment/backend-api

# Rollback to specific revision
kubectl rollout undo deployment/backend-api --to-revision=2
```

### Docker Compose
```bash
# Pull previous image
docker pull ecoconnect/backend-api:previous-tag

# Update compose file and restart
docker-compose up -d
```

---

## Security Checklist

- [ ] Change all default passwords
- [ ] Enable SSL/TLS
- [ ] Configure firewall rules
- [ ] Enable rate limiting
- [ ] Setup DDoS protection
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Enable audit logging
- [ ] Backup encryption keys
- [ ] Setup intrusion detection

---

## Monitoring Alerts

### Critical Alerts
- API response time > 2s
- Error rate > 5%
- CPU usage > 80%
- Memory usage > 85%
- Disk usage > 90%
- Database connection failures

### Business Metrics
- Daily active users
- Carbon savings trend
- Product marketplace GMV
- Challenge completion rate

---

## Support & Maintenance

- **Production Issues**: support@ecoconnect.vn
- **Security Issues**: security@ecoconnect.vn
- **Documentation**: https://docs.ecoconnect.vn
- **Status Page**: https://status.ecoconnect.vn
