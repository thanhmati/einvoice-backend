# 📚 Hướng Dẫn Sử Dụng Tài Liệu Giảng Dạy - Hệ Thống E-Invoice

## 📋 Danh Sách Tài Liệu

| File | Mục Đích | Đối Tượng |
|------|----------|-----------|
| **TEACHING_GUIDE.md** | Tài liệu chi tiết cho học viên | 🎓 Học viên |
| **INSTRUCTOR_SUMMARY.md** | Hướng dẫn ngắn gọn cho giảng viên | 👨‍🏫 Giảng viên |
| **README.md** | File này - hướng dẫn sử dụng | 📖 Tất cả |

---

## 🏗️ Kiến Trúc Hệ Thống

Hệ thống E-Invoice được xây dựng theo mô hình **Microservices Architecture** với **Nx Monorepo**:

```
📦 E-Invoice System (Nx Monorepo)
├── 🌐 BFF (Backend for Frontend) - Port 3300 (HTTP REST API + Swagger)
├── 📄 Invoice Service - TCP Microservice (Core Business Logic)
├── 📁 Media Service - TCP Microservice (Cloudinary Integration)
├── 📄 PDF Generator Service - TCP Microservice (Puppeteer + EJS)
├── 📧 Mail Service - Kafka Consumer + TCP Client (Email Processing)
├── 👤 User Access Service - TCP Microservice (User Management)
├── 🔐 Authorizer Service - gRPC Microservice (Keycloak Integration)
├── 🗄️ MongoDB - Port 27017 (Document Database)
├── 📨 Kafka - Port 9092 (Event Streaming Platform)
├── 🔑 Keycloak - Port 8180 (Identity & Access Management)
├── 🔴 Redis - Port 6379 (Cache Store & Session Management)
├── 🔍 Redis Insight - Port 5540 (Redis Management UI)
├── 📊 Grafana - Port 3000 (Monitoring Dashboard)
├── 📋 Loki - Port 3100 (Log Aggregation Server)
└── 📡 Promtail - Log Collection Agent (Docker Container Logs)
```

### 🔄 Communication Patterns
- **BFF ↔ Services**: TCP (Synchronous Communication)
- **BFF ↔ Authorizer**: gRPC (Authentication Service)
- **Invoice → Kafka**: Event Publishing (Asynchronous)
- **Mail ← Kafka**: Event Consumption (Asynchronous)
- **Payment ↔ Stripe**: Webhook Handling (Asynchronous)
- **Database**: MongoDB với Mongoose ODM
- **Cache Layer**: Redis với @nestjs/cache-manager (UserGuard Caching)
- **Log Collection**: Promtail → Loki → Grafana Stack

---

## 🎯 Cách Sử Dụng

### Cho Giảng Viên 👨‍🏫

1. **Bắt đầu với**: `INSTRUCTOR_SUMMARY.md`
   - Tổng quan nhanh về repo
   - Cấu trúc khóa học đề xuất
   - Cách chạy demo
   - Bài tập thực hành

2. **Tham khảo chi tiết**: `TEACHING_GUIDE.md`
   - Nội dung giảng dạy đầy đủ
   - Code examples với giải thích
   - Sơ đồ Mermaid chi tiết
   - Best practices

### Cho Học Viên 🎓

1. **Tài liệu chính**: `TEACHING_GUIDE.md`
   - Đọc tuần tự từ Phần 1 → Phần 11
   - Thực hành theo bài tập
   - Tham khảo sơ đồ để hiểu flow

---

## 🚀 Quick Start

### Yêu Cầu Hệ Thống
- **Node.js**: v18+
- **pnpm**: Latest version
- **Docker**: Latest version
- **RAM**: 8GB (16GB recommended)

### Cho Giảng Viên
```bash
# 1. Clone và setup
git clone <repo-url>
cd <repo-name>
pnpm install

# 2. Khởi động infrastructure (MongoDB + Kafka + Keycloak + Redis + Logging Stack)
pnpm docker:start:provider

# 3. Build và start tất cả services
pnpm build

# 4. Truy cập các giao diện:
# - Swagger API: http://localhost:3300/api/v1/docs
# - Grafana Dashboard: http://localhost:3000 (admin/admin)
# - Keycloak Admin: http://localhost:8180 (admin/admin)
# - Redis Insight: http://localhost:5540
```

### Cho Học Viên
```bash
# 1. Clone repo
git clone <repo-url>
cd <repo-name>

# 2. Install dependencies
pnpm install

# 3. Start infrastructure
pnpm docker:start:provider

# 4. Development mode (chạy tất cả services)
pnpm dev

# 5. Development mode (chỉ chạy core services)
pnpm dev-lite
```

---

## 🔍 Highlights của Hệ Thống

### 🏛️ Architecture Patterns
- ✅ **Microservices Architecture** với 7 microservices độc lập
- ✅ **API Gateway Pattern** (BFF) làm single entry point
- ✅ **Event-Driven Architecture** với Kafka message streaming
- ✅ **Repository Pattern** cho clean data access layer
- ✅ **Dependency Injection** với NestJS DI container
- ✅ **CQRS Pattern** với separate read/write operations
- ✅ **Saga Pattern** cho distributed transactions
- ✅ **Cache-Aside Pattern** với Redis caching strategy

### 💡 Technology Stack

#### **Core Framework & Language**
- **Framework**: NestJS v11+ với TypeScript 5.8+
- **Runtime**: Node.js v18+ với Express.js backend
- **Package Manager**: pnpm với Nx Monorepo v21+

#### **Database & Storage**
- **Primary Database**: MongoDB v6+ với Mongoose ODM v8+
- **Cache Store**: Redis v7+ với @nestjs/cache-manager
- **File Storage**: Cloudinary (Cloud-based media storage)

#### **Communication & Messaging**
- **Message Queue**: Kafka (bitnami/kafka) với custom decorators
- **Synchronous**: TCP microservices communication
- **Authentication**: gRPC với Keycloak integration
- **API Documentation**: Swagger/OpenAPI v3

#### **Payment & Email**
- **Payment Gateway**: Stripe v18+ (Checkout Sessions + Webhooks)
- **Email Service**: Nodemailer với EJS templating
- **PDF Generation**: Puppeteer v24+ với EJS templates

#### **DevOps & Monitoring**
- **Containerization**: Docker + Docker Compose
- **Monitoring Stack**: Grafana + Loki + Promtail
- **Log Aggregation**: Centralized Docker container logs
- **Identity Management**: Keycloak v25.0.0
- **Redis Management**: Redis Insight UI

### 📊 Production-Ready Features

#### **Security & Authentication**
- ✅ **JWT Authentication** với Keycloak integration
- ✅ **Redis Cache Layer** cho authentication tokens (30min TTL)
- ✅ **Token Security** với SHA256 hashing cho cache keys
- ✅ **UserGuard Caching** tránh redundant Keycloak calls
- ✅ **Webhook Security** với Stripe signature verification

#### **Error Handling & Logging**
- ✅ **Global Exception Handling** với ExceptionInterceptor
- ✅ **Request Logging** với LoggerMiddleware + process ID tracking
- ✅ **Centralized Logging** với Grafana + Loki + Promtail stack
- ✅ **Real-time Log Monitoring** với dashboard và search capabilities
- ✅ **Container Log Aggregation** từ tất cả microservices

#### **Validation & Documentation**
- ✅ **DTO Validation** với class-validator decorators
- ✅ **Swagger API Documentation** với Bearer Auth support
- ✅ **Environment-based Configuration** với validation
- ✅ **Type Safety** với TypeScript strict mode

#### **Performance & Scalability**
- ✅ **Redis Caching Strategy** với cache-first approach
- ✅ **Connection Pooling** cho MongoDB và Redis
- ✅ **Docker Containerization** cho horizontal scaling
- ✅ **Microservices Architecture** cho independent scaling

#### **Payment & Business Logic**
- ✅ **Stripe Payment Integration** với Checkout Sessions
- ✅ **Webhook Handling** cho payment status updates
- ✅ **Payment Link Generation** trong professional email templates
- ✅ **Invoice Status Management** với business rule validation

---


## 🛠️ Tools Hỗ Trợ

### Development Tools

#### **API & Testing**
- **API Documentation**: Swagger UI tại `http://localhost:3300/api/v1/docs`
- **API Testing**: Postman/Insomnia với Bearer token authentication
- **Payment Testing**: Stripe CLI cho webhook testing và simulation

#### **Database & Cache Management**
- **MongoDB GUI**: MongoDB Compass tại `mongodb://localhost:27017`
- **Redis Management**: Redis Insight UI tại `http://localhost:5540`
- **Database CLI**: Docker exec commands cho direct access

#### **Monitoring & Logging**
- **Grafana Dashboard**: `http://localhost:3000` (admin/admin)
- **Loki API**: `http://localhost:3100` cho direct log queries
- **Log Collection**: Promtail agent tự động thu thập container logs
- **Real-time Monitoring**: Live log streaming trong Grafana

#### **Identity & Security**
- **Keycloak Admin**: `http://localhost:8180` (admin/admin)
- **JWT Token Testing**: Keycloak token generation và validation
- **Cache Monitoring**: Redis commands cho cache inspection

### Xem Sơ Đồ Mermaid
- **GitHub**: Tự động render Mermaid diagrams
- **VSCode**: Mermaid Preview extension
- **Online**: https://mermaid.live/

---

## 📞 Hỗ Trợ

### Nếu Gặp Vấn Đề
1. **Docker Issues**: Kiểm tra `docker ps` và logs
2. **Service Connection**: Verify network `einvoice-nw`
3. **Database**: Ensure MongoDB is running on port 27017
4. **Kafka**: Check Kafka broker health
5. **Logging Stack**: Verify Grafana (3001), Loki (3100), và Promtail services
6. **Log Collection**: Check Promtail is collecting container logs properly
7. **Stripe Integration**: Verify webhook configuration và signature verification

### Debugging

#### **Container & Network Debugging**
```bash
# Check running containers
docker ps
docker compose -f docker-compose.provider.yaml ps
docker compose -f docker-compose.dev.yaml ps

# View service logs
docker logs <container-name> --follow
docker logs bff --tail 100
docker logs invoice --tail 100

# Check network connectivity
docker network ls | grep einvoice
docker network inspect einvoice-nw
```

#### **Database & Cache Debugging**
```bash
# MongoDB connection test
docker exec -it mongodb mongosh
# Use: show dbs; use invoice; show collections;

# Redis connection test
docker exec -it redis_server redis-cli
# Use: KEYS *; GET user-token:*; TTL user-token:*
```

#### **Logging Stack Debugging**
```bash
# Check logging stack health
docker logs grafana
docker logs loki
docker logs promtail

# Verify log collection
curl http://localhost:3100/ready
curl http://localhost:3100/metrics
curl http://localhost:3100/loki/api/v1/labels

# Test log queries
curl -G "http://localhost:3100/loki/api/v1/query" \
  --data-urlencode 'query={app="bff"}'
```

#### **Payment & Webhook Debugging**
```bash
# Test Stripe webhook locally
stripe listen --forward-to localhost:3300/api/v1/payment/stripe/webhook

# Check payment service logs
docker logs invoice | grep -i stripe
docker logs invoice | grep -i payment

# Verify webhook signature
# Check STRIPE_WEBHOOK_SECRET trong environment
```

### Feedback & Contributions
- Góp ý cải thiện tài liệu
- Đề xuất bài tập mới
- Báo lỗi trong code examples
- Contribute to documentation

---

**Happy Teaching & Learning! 🎓🚀**

*Tài liệu này được cập nhật để phản ánh chính xác source code hiện tại. Mọi thắc mắc xin liên hệ để được hỗ trợ.*
