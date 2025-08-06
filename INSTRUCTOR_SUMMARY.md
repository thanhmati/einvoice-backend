# 👨‍🏫 Hướng Dẫn Dành Cho Giảng Viên

## 📋 Tổng Quan Nhanh

Repo này là một **hệ thống E-Invoice hoàn chỉnh** được xây dựng theo **Microservices Architecture** với NestJS. Đây là case study lý tưởng để giảng dạy về:

- ✅ **Microservices Architecture** với 7 services
- ✅ **Event-Driven Architecture** với Kafka
- ✅ **API Gateway Pattern** (BFF)
- ✅ **Mixed Communication Patterns** (TCP, gRPC, Kafka)
- ✅ **Clean Architecture** với Repository Pattern
- ✅ **Production-ready practices** (logging, error handling, validation)
- ✅ **Authentication Integration** với Keycloak
- ✅ **Redis Cache Layer** cho performance optimization
- ✅ **Token Caching Strategy** trong UserGuard
- ✅ **Docker Containerization** và deployment
- ✅ **Centralized Logging** với Grafana + Loki + Promtail
- ✅ **Real-time Monitoring** và log aggregation

---

## 🏗️ Kiến Trúc Hệ Thống (Thực Tế)

```
📦 E-Invoice System (Nx Monorepo)
├── 🌐 BFF Service - Port 3000 (HTTP REST API + Swagger)
├── 📄 Invoice Service - TCP Microservice
├── 📁 Media Service - TCP Microservice (Cloudinary integration)
├── 📄 PDF Generator - TCP Microservice (Puppeteer + EJS)
├── 📧 Mail Service - Kafka Consumer + TCP Client
├── 👤 User Access Service - TCP Microservice
├── 🔐 Authorizer Service - gRPC Microservice
├── 🗄️ MongoDB - Port 27017 (Document database)
├── 📨 Kafka - Port 9092 (Event streaming)
├── 🔑 Keycloak - Port 8180 (Identity & Access Management)
├── 🔴 Redis - Port 6379 (Cache Store for UserData)
├── 📊 Grafana - Port 3001 (Monitoring Dashboard)
├── 📋 Loki - Port 3100 (Log Aggregation Server)
└── 📡 Promtail - Log Collection Agent
```

### 🔄 Communication Patterns (Thực Tế)
- **BFF ↔ Services**: TCP (Synchronous)
- **BFF ↔ Authorizer**: gRPC (Authentication)
- **UserGuard ↔ Redis**: Cache Layer (Token & UserData)
- **Invoice → Kafka**: Event Publishing
- **Mail ← Kafka**: Event Consumption
- **Database**: MongoDB với Mongoose ODM

---

## 🎯 Cấu Trúc Khóa Học Đề Xuất

### **Buổi 1-2: Tổng Quan Kiến Trúc** (4 giờ)
- Giới thiệu Microservices vs Monolith
- Phân tích cấu trúc tổng thể (7 services + infrastructure)
- Demo chạy toàn bộ hệ thống với Docker
- **Thực hành**: Setup và test API với Swagger UI

### **Buổi 3-4: BFF & API Gateway** (4 giờ)
- Phân tích BFF Service (`apps/bff/`)
- Swagger documentation và JWT authentication
- TCP và gRPC communication patterns
- **Thực hành**: Thêm endpoint mới, test authentication

### **Buổi 5-6: Core Business Logic** (4 giờ)
- Invoice Service (`apps/invoice/`)
- Repository Pattern implementation
- Business logic validation và status management
- **Thực hành**: Implement business rule mới, test với unit tests

### **Buổi 7-8: Event-Driven Architecture** (4 giờ)
- Kafka setup và configuration
- Producer/Consumer pattern với custom decorators
- Mail Service analysis và email processing
- **Thực hành**: Thêm Kafka event mới, implement consumer

### **Buổi 9-10: Shared Libraries & Infrastructure** (4 giờ)
- Nx monorepo structure và shared libraries
- Error handling, logging, validation patterns
- Centralized logging với Grafana + Loki + Promtail
- Docker deployment strategy
- **Thực hành**: Setup logging stack, tạo shared library, deploy với Docker

### **Buổi 11-12: Advanced Topics** (4 giờ)
- Keycloak integration cho authentication
- Testing strategies (unit, integration, e2e)
- Monitoring, observability, performance optimization
- **Thực hành**: Implement advanced features, production deployment

---

## 🚀 Cách Chạy Demo (Cập Nhật)

### 1. **Prerequisites**
```bash
# System Requirements
- Node.js v18+
- pnpm (latest)
- Docker & Docker Compose
- 8GB RAM (16GB recommended)
```

### 2. **Quick Start**
```bash
# Clone repo
git clone <repo-url>
cd <repo-name>

# Install dependencies
pnpm install

# Start infrastructure services (MongoDB, Kafka, Keycloak, Logging Stack)
pnpm docker:start:provider

# Build all services
pnpm nx:run-many -t build

# Build Docker images
pnpm docker-build

# Start application services
pnpm docker:start:dev

# Alternative: Development mode (all services)
pnpm dev

# Alternative: Development mode (core services only)
pnpm dev-lite
```

### 3. **Demo Flow (Thực Tế)**
1. **Access Swagger UI**: `http://localhost:3000/api/v1/docs`
2. **Keycloak Admin**: `http://localhost:8180` (admin/admin)
3. **Grafana Dashboard**: `http://localhost:3001` (admin/admin)
4. **Loki API**: `http://localhost:3100`
3. **Create Invoice**: POST `/api/v1/invoice`
   ```json
   {
     "client": {
       "name": "Nguyễn Văn A",
       "email": "client@example.com",
       "address": "123 Main St"
     },
     "items": [
       {
         "name": "Product 1",
         "quantity": 2,
         "price": 100000
       }
     ],
     "totalAmount": 200000,
     "vatAmount": 20000
   }
   ```
5. **Send Invoice**: POST `/api/v1/invoice/{invoiceId}/send`
6. **Verify Flow**:
   - Invoice status: `created` → `sent`
   - PDF generated và uploaded to Cloudinary
   - Kafka event `invoice.sent` published
   - Mail service consumes event và sends email
   - All logs collected và visible trong Grafana dashboard

---

## 📚 Tài Liệu Giảng Dạy

### **Tài Liệu Chính**
- `TEACHING_GUIDE.md` - Tài liệu chi tiết cho học viên (đã cập nhật)
- `README.md` - Hướng dẫn setup và overview (đã cập nhật)
- `INSTRUCTOR_SUMMARY.md` - File này

### **Code Examples Quan Trọng**
```
📁 Key Files for Teaching:
├── apps/bff/src/main.ts                    # Entry point + Swagger setup
├── apps/bff/src/app/app.module.ts          # Global guards, interceptors, middleware
├── apps/invoice/src/app/modules/invoice/
│   ├── services/invoice.service.ts         # Business logic với Kafka integration
│   ├── controllers/invoice.controller.ts   # TCP message handlers
│   └── repositories/invoice.repository.ts  # Repository pattern implementation
├── apps/mail/src/app/modules/mail/
│   ├── services/mail-queue.service.ts      # Kafka event consumer
│   └── services/mail-invoice.service.ts    # Email processing logic
├── libs/schemas/src/lib/invoice/            # MongoDB schema với Mongoose
├── libs/queue/src/lib/modules/kafka/       # Kafka integration
├── libs/decorators/src/lib/                # Custom decorators (@KafkaHandler)
├── libs/middlewares/src/lib/               # Request logging middleware
├── libs/interceptors/src/lib/              # Global error handling
├── docker/loki-config.yaml                 # Loki log aggregation config
├── docker/promtail-config.yaml             # Promtail log collection config
└── docker-compose.*.yaml                   # Docker deployment configuration
```

---

## 🎯 Điểm Nhấn Khi Giảng

### **1. Architecture Highlights (Thực Tế)**
- **7 Microservices** với communication patterns khác nhau
- **Nx Monorepo** cho code sharing và build optimization
- **Docker Compose** cho infrastructure và application deployment
- **Kafka** với custom decorators cho event handling
- **Keycloak** integration cho enterprise authentication
- **Grafana + Loki + Promtail** stack cho centralized logging
- **Real-time log monitoring** với dashboard và alerting

### **2. Best Practices Được Áp Dụng**
- ✅ **Repository Pattern** - Clean data access layer
- ✅ **Dependency Injection** - Loose coupling với NestJS DI
- ✅ **Global Error Handling** - ExceptionInterceptor cho consistent responses
- ✅ **Process ID Tracking** - Request tracing across services
- ✅ **DTO Validation** - class-validator cho input validation
- ✅ **Configuration Management** - Environment-based config
- ✅ **Custom Decorators** - @KafkaHandler cho event handling
- ✅ **Auto-Discovery** - Kafka consumers tự động register
- ✅ **Centralized Logging** - Docker container log aggregation
- ✅ **Log Monitoring** - Real-time log streaming và search
- ✅ **Observability** - Process tracking across services

### **3. Real-World Patterns (Thực Tế)**
- **API Gateway** (BFF) với authentication guard
- **Event Sourcing** với Kafka topics (`invoice.sent`)
- **Mixed Communication**: TCP (sync), gRPC (auth), Kafka (async)
- **File Processing Pipeline**: PDF generation → Cloud storage → Email attachment
- **Business State Management**: Invoice lifecycle với validation

---

## 🧪 Bài Tập Thực Hành (Cập Nhật)

### **Dễ** (Buổi 1-4)
1. **Health Check Endpoints**: Thêm `/health` cho tất cả services
2. **Invoice Status Validation**: Thêm status `CANCELLED` với business rules
3. **Swagger Enhancement**: Customize API documentation với examples
4. **Environment Configuration**: Add new config variables

### **Trung Bình** (Buổi 5-8)
5. **Notification Service**: Tạo service mới consume `invoice.sent` events
6. **Invoice Approval Workflow**: Thêm approval process với supervisor
7. **Custom Kafka Topics**: Implement `invoice.cancelled` event
8. **Database Indexing**: Optimize MongoDB queries với indexes
9. **Logging Dashboard**: Tạo custom Grafana dashboard cho monitoring
10. **Log Alerting**: Setup alerts cho error patterns trong logs

### **Khó** (Buổi 9-12)
11. **Keycloak Integration**: Implement full JWT authentication flow
12. **Redis Cache Analysis**: Phân tích UserGuard cache strategy và tối ưu hóa
13. **Custom Cache Implementation**: Thêm cache layer cho invoice queries
14. **Distributed Tracing**: Implement correlation ID across services
15. **Automated Testing**: Unit + Integration + E2E test suite
16. **Production Monitoring**: Health checks, metrics, logging aggregation
17. **Advanced LogQL**: Complex log queries và pattern extraction
18. **Log Retention Policies**: Configure log rotation và storage optimization

---

## 🔴 Redis Cache Implementation (Mới)

### **Tính Năng Đã Implement**
Hệ thống đã có **Redis Cache Layer** hoàn chỉnh cho authentication:

#### ✅ UserGuard Cache Strategy
```typescript
// Cache flow trong UserGuard
Token → SHA256 Hash → Redis Key → Cached UserData
- Cache Key: `user-token:{hash}`
- TTL: 30 minutes  
- Security: Token được hash trước khi cache
```

#### ✅ Performance Benefits
- **90-95% faster** authentication cho cache hits
- **Reduced Keycloak load** đáng kể
- **Automatic TTL management** (30 minutes)
- **Secure caching** với SHA256 token hashing

### **Demo Cache Behavior**
```bash
# 1. First request (cache miss) - ~100ms
curl -H "Authorization: Bearer TOKEN" /api/v1/invoice

# 2. Second request (cache hit) - ~5ms  
curl -H "Authorization: Bearer TOKEN" /api/v1/invoice

# 3. Check Redis cache
docker exec -it redis_server redis-cli
> KEYS user-token:*
> GET user-token:{hash}
```

### **Điểm Giảng Dạy Quan Trọng**
1. **Cache Strategy**: Cache-first vs Cache-aside patterns
2. **Security**: Tại sao hash token thay vì lưu raw token
3. **TTL Management**: Sync với token expiry
4. **Performance Metrics**: Measure cache hit ratio
5. **Redis Commands**: Debug và monitor cache operations

---

## ⚠️ Lưu Ý Khi Giảng

### **Điểm Mạnh Của Repo**
- ✅ **Production-ready architecture** với real business logic
- ✅ **Comprehensive error handling** và logging
- ✅ **Well-structured modules** theo NestJS best practices
- ✅ **Event-driven design** với Kafka integration
- ✅ **Docker deployment** ready
- ✅ **Mixed communication patterns** (TCP, gRPC, Events)
- ✅ **Authentication integration** với Keycloak
- ✅ **Redis Cache Layer** với secure token caching strategy
- ✅ **Performance optimization** với 90%+ cache hit improvement

### **Điểm Cần Lưu Ý**
- ⚠️ **Kafka Topics**: Hiện tại chỉ có `invoice.sent`, có thể mở rộng
- ⚠️ **Authentication**: Keycloak setup cần configuration thêm
- ⚠️ **Testing**: Cần thêm comprehensive test coverage
- ⚠️ **Metrics Collection**: Chưa có Prometheus metrics (chỉ có logs)
- ⚠️ **Error Recovery**: Kafka consumer error handling có thể enhance
- ⚠️ **Log Retention**: Default filesystem storage, cần configure retention policies

### **Challenges Học Viên Có Thể Gặp**
1. **Docker Networking**: Hiểu `einvoice-nw` network và service discovery
2. **TCP vs HTTP**: Khác biệt giữa TCP microservices và HTTP REST
3. **Kafka Events**: Event-driven thinking và async processing
4. **gRPC vs TCP**: Khi nào dùng gRPC vs TCP
5. **Nx Monorepo**: Shared libraries và build dependencies
6. **LogQL Syntax**: Learning Loki query language cho log analysis
7. **Log Volume**: Managing high-volume logs trong development environment

### **Tips Giảng Dạy**
- **Start Simple**: Begin với BFF → Invoice flow trước khi vào Kafka
- **Visual Diagrams**: Sử dụng Mermaid diagrams trong tài liệu
- **Live Demo**: Show Swagger UI và real API calls
- **Debug Together**: Show Docker logs và error handling
- **Code Walkthrough**: Explain design patterns trong context
- **Logging Demo**: Show real-time logs trong Grafana dashboard
- **Log Analysis**: Demonstrate LogQL queries cho debugging

---

## 🛠️ Setup Requirements (Chi Tiết)

### **Development Environment**
```bash
# Required Tools
- Node.js v18+ (LTS recommended)
- pnpm (latest version)
- Docker Desktop (latest)
- Git

# Recommended Tools
- VSCode với NestJS extensions
- MongoDB Compass (database GUI)
- Postman hoặc Insomnia (API testing)
- Docker Desktop với Kubernetes (optional)
```

### **System Resources**
- **Minimum**: 8GB RAM, 4 CPU cores, 20GB disk space
- **Recommended**: 16GB RAM, 8 CPU cores, 50GB disk space
- **Network**: Stable internet cho Docker images và npm packages

### **Pre-class Preparation**
1. **Instructor Setup** (30 phút trước):
   ```bash
   # Pull all Docker images
   docker pull bitnami/kafka:latest
   docker pull mongo:latest
   docker pull quay.io/keycloak/keycloak:25.0.0
   
   # Pre-build application images
   pnpm install
   pnpm build
   ```

2. **Student Checklist**:
   - [ ] Docker Desktop running
   - [ ] Node.js và pnpm installed
   - [ ] Git configured
   - [ ] VSCode với extensions
   - [ ] Stable internet connection

---

## 📈 Học Viên Sẽ Học Được (Cập Nhật)

### **Technical Skills**
- **Microservices Design**: Service decomposition, API design
- **NestJS Advanced**: Decorators, Guards, Interceptors, Modules
- **Event-Driven Architecture**: Kafka producers/consumers
- **Database Design**: MongoDB schema với Mongoose ODM
- **Authentication**: Keycloak integration, JWT handling
- **Docker Containerization**: Multi-service deployment
- **Error Handling**: Global exception handling, logging strategies
- **Testing**: Unit tests, integration tests, mocking strategies

### **Architectural Skills**
- **System Design**: Trade-offs giữa sync vs async communication
- **Service Communication**: TCP, gRPC, Event-driven patterns
- **Data Flow Design**: Request tracing, process ID tracking
- **Deployment Strategy**: Docker Compose, environment management
- **Scalability Planning**: Service independence, horizontal scaling

### **Production Skills**
- **Monitoring**: Health checks, logging, error tracking
- **Configuration Management**: Environment-based config
- **Security**: Authentication, authorization, input validation
- **Performance**: Caching strategies, database optimization

---

## 🎓 Kết Quả Mong Đợi

Sau khóa học, học viên có thể:

### **Immediate Outcomes**
1. **Thiết kế** microservices architecture từ requirements
2. **Implement** event-driven communication với Kafka
3. **Deploy** multi-service application với Docker
4. **Debug** distributed systems issues
5. **Test** microservices với proper mocking

### **Long-term Outcomes**
6. **Scale** individual services theo business needs
7. **Integrate** authentication systems (Keycloak, Auth0, etc.)
8. **Optimize** performance với caching và database tuning
9. **Monitor** production systems với observability tools
10. **Lead** microservices adoption trong team/organization

### **Career Impact**
- **Senior Developer**: Microservices expertise
- **Solution Architect**: System design skills
- **DevOps Engineer**: Container orchestration
- **Technical Lead**: Team guidance on architecture decisions

---

## 🔧 Troubleshooting Guide

### **Common Issues**

#### Docker Issues
```bash
# Network not found
docker network create einvoice-nw

# Port conflicts
docker ps | grep :3000
lsof -i :3000

# Container won't start
docker logs <container-name>
docker system prune -f
```

#### Service Connection Issues
```bash
# Check service health
curl http://localhost:3000/api/v1/docs

# MongoDB connection
docker exec -it mongodb mongosh

# Kafka topics
docker exec -it kafka kafka-topics --list --bootstrap-server localhost:9092
```

#### Build Issues
```bash
# Clean build
pnpm nx:reset
rm -rf node_modules
pnpm install
pnpm build
```

---

**Chúc giảng viên thành công! 🚀**

*Tài liệu này được cập nhật để phản ánh chính xác source code hiện tại. Mọi thắc mắc về repo hoặc cách sử dụng trong giảng dạy, vui lòng liên hệ để được hỗ trợ.*