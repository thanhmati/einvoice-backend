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
- ✅ **Token Caching Strategy** trong UserGuard để tránh auto verify token
- ✅ **Docker Containerization** và deployment
- ✅ **Centralized Logging** với Grafana + Loki + Promtail
- ✅ **Real-time Monitoring** và log aggregation
- ✅ **Stripe Payment Integration** với webhook handling
- ✅ **Payment Flow** với email templates và status management

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
├── 💳 Payment Service - TCP Microservice (Stripe Integration)
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
- **Payment ↔ Stripe**: Webhook Handling (Asynchronous)
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

### **Buổi 9-10: Payment Integration** (4 giờ)
- Stripe integration và webhook handling
- Payment flow analysis và status management
- Email templates với payment links
- **Thực hành**: Implement payment features, test webhooks

### **Buổi 11-12: Shared Libraries & Infrastructure** (4 giờ)
- Nx monorepo structure và shared libraries
- Error handling, logging, validation patterns
- Centralized logging với Grafana + Loki + Promtail
- Docker deployment strategy
- **Thực hành**: Setup logging stack, tạo shared library, deploy với Docker

### **Buổi 13-14: Advanced Topics** (4 giờ)
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
- Stripe CLI (optional, for webhook testing)
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
5. **Create Invoice**: POST `/api/v1/invoice`
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
6. **Send Invoice**: POST `/api/v1/invoice/{invoiceId}/send`
7. **Verify Flow**:
   - Invoice status: `created` → `sent`
   - PDF generated và uploaded to Cloudinary
   - Stripe Checkout Session created
   - Kafka event `invoice.sent` published với payment link
   - Mail service consumes event và sends email với payment link
   - Customer clicks payment link và completes payment
   - Stripe webhook triggers khi payment successful
   - Invoice status: `sent` → `paid`
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
├── apps/bff/src/app/modules/payment/       # Payment controller (webhook endpoint)
├── apps/invoice/src/app/modules/invoice/
│   ├── services/invoice.service.ts         # Business logic với Kafka integration
│   ├── controllers/invoice.controller.ts   # TCP message handlers
│   └── repositories/invoice.repository.ts  # Repository pattern implementation
├── apps/invoice/src/app/modules/payment/   # Payment service với Stripe integration
│   ├── services/payment.service.ts         # Payment logic và webhook handling
│   ├── services/stripe.service.ts          # Stripe API integration
│   └── controllers/payment.controller.ts   # TCP payment handlers
├── apps/mail/src/app/modules/mail/
│   ├── services/mail-queue.service.ts      # Kafka event consumer
│   └── services/mail-invoice.service.ts    # Email processing logic với payment links
├── libs/schemas/src/lib/invoice/            # MongoDB schema với Mongoose
├── libs/queue/src/lib/modules/kafka/       # Kafka integration
├── libs/decorators/src/lib/                # Custom decorators (@KafkaHandler)
├── libs/middlewares/src/lib/               # Request logging middleware
├── libs/interceptors/src/lib/              # Global error handling
├── libs/interfaces/src/lib/common/          # Stripe interfaces
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
- **Stripe Payment Integration** với webhook handling

### **2. Best Practices Được Áp Dụng**
- ✅ **Repository Pattern** - Clean data access layer
- ✅ **Dependency Injection** - Loose coupling với NestJS DI
- ✅ **Global Error Handling** - ExceptionInterceptor cho consistent responses
- ✅ **Process ID Tracking** - Request tracing across services
- ✅ **DTO Validation** - class-validator cho input validation
- ✅ **Swagger API documentation**
- ✅ **Docker containerization**
- ✅ **Environment-based configuration**
- ✅ **Custom Decorators** - @KafkaHandler cho event handling
- ✅ **Auto-Discovery** - Kafka consumers tự động register
- ✅ **Centralized Logging** - Docker container log aggregation
- ✅ **Log Monitoring** - Real-time log streaming và search
- ✅ **Observability** - Process tracking across services
- ✅ **Payment Integration** - Stripe webhook handling và signature verification
- ✅ **Email Templates** - Dynamic content với payment links

### **3. Real-World Patterns (Thực Tế)**
- **API Gateway** (BFF) với authentication guard
- **Event Sourcing** với Kafka topics (`invoice.sent`)
- **Mixed Communication**: TCP (sync), gRPC (auth), Kafka (async), Webhook (async)
- **File Processing Pipeline**: PDF generation → Cloud storage → Email attachment
- **Business State Management**: Invoice lifecycle với validation
- **Payment Flow**: Checkout Session → Webhook → Status Update
- **Email Marketing**: Payment links trong professional email templates

---

## 🧪 Bài Tập Thực Hành (Cập Nhật)

### **Dễ** (Buổi 1-4)
1. **Health Check Endpoints**: Thêm `/health` cho tất cả services
2. **Invoice Status Validation**: Thêm status `CANCELLED` với business rules
3. **Swagger Enhancement**: Customize API documentation với examples
4. **Environment Configuration**: Add new config variables

### **Trung Bình** (Buổi 5-10)
5. **Notification Service**: Tạo service mới consume `invoice.sent` events
6. **Invoice Approval Workflow**: Thêm approval process với supervisor
7. **Custom Kafka Topics**: Implement `invoice.cancelled` event
8. **Database Indexing**: Optimize MongoDB queries với indexes
9. **Logging Dashboard**: Tạo custom Grafana dashboard cho monitoring
10. **Log Alerting**: Setup alerts cho error patterns trong logs
11. **Payment Methods**: Thêm support cho multiple payment methods
12. **Payment Analytics**: Track payment success rates và conversion
13. **Email Templates**: Customize email templates với branding
14. **Webhook Security**: Implement additional webhook validation

### **Khó** (Buổi 11-14)
15. **Keycloak Integration**: Implement full JWT authentication flow
16. **Redis Cache Analysis**: Phân tích UserGuard cache strategy và tối ưu hóa
17. **Custom Cache Implementation**: Thêm cache layer cho invoice queries
18. **Distributed Tracing**: Implement correlation ID across services
19. **Automated Testing**: Unit + Integration + E2E test suite
20. **Production Monitoring**: Health checks, metrics, logging aggregation
21. **Advanced LogQL**: Complex log queries và pattern extraction
22. **Log Retention Policies**: Configure log rotation và storage optimization
23. **Payment Refunds**: Implement refund functionality với Stripe
24. **Subscription Payments**: Add recurring payment support
25. **Payment Gateway**: Support multiple payment providers (PayPal, etc.)
26. **Advanced Webhooks**: Handle complex payment events (disputes, chargebacks)

---

## 💳 Stripe Payment Integration (Mới)

### **Tính Năng Đã Implement**
Hệ thống đã có **Stripe Payment Integration** hoàn chỉnh:

#### ✅ Payment Flow
```typescript
// Complete payment flow
Invoice Creation → Send Invoice → Stripe Checkout → Payment → Webhook → Status Update
- Invoice status: created → sent → paid
- Payment link được gửi trong email
- Webhook tự động update status khi thanh toán thành công
```

#### ✅ Key Components
- **StripeService**: Stripe API integration với checkout sessions
- **PaymentService**: Webhook handling và payment processing
- **Email Templates**: Payment links trong professional email
- **Webhook Security**: Signature verification cho secure processing
- **Status Management**: Automatic invoice status updates

### **Demo Payment Flow**
```bash
# 1. Create invoice
POST /api/v1/invoice

# 2. Send invoice (creates payment link)
POST /api/v1/invoice/{id}/send

# 3. Check email with payment link
# Customer clicks link and pays

# 4. Webhook triggers (simulate with Stripe CLI)
stripe listen --forward-to localhost:3000/api/v1/payment/stripe/webhook

# 5. Verify invoice status changed to 'paid'
GET /api/v1/invoice/{id}
```

### **Điểm Giảng Dạy Quan Trọng**
1. **Payment Security**: Webhook signature verification
2. **State Management**: Invoice status transitions
3. **Email Integration**: Payment links trong templates
4. **Error Handling**: Payment failure scenarios
5. **Testing**: Webhook testing với Stripe CLI

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
- ✅ **Mixed communication patterns** (TCP, gRPC, Events, Webhooks)
- ✅ **Authentication integration** với Keycloak
- ✅ **Redis Cache Layer** với secure token caching strategy
- ✅ **Performance optimization** với 90%+ cache hit improvement
- ✅ **Stripe Payment Integration** với complete payment flow
- ✅ **Professional email templates** với payment links

### **Điểm Cần Lưu Ý**
- ⚠️ **Kafka Topics**: Hiện tại chỉ có `invoice.sent`, có thể mở rộng
- ⚠️ **Authentication**: Keycloak setup cần configuration thêm
- ⚠️ **Testing**: Cần thêm comprehensive test coverage
- ⚠️ **Metrics Collection**: Chưa có Prometheus metrics (chỉ có logs)
- ⚠️ **Error Recovery**: Kafka consumer error handling có thể enhance
- ⚠️ **Log Retention**: Default filesystem storage, cần configure retention policies
- ⚠️ **Stripe Configuration**: Cần setup Stripe keys cho production
- ⚠️ **Payment Testing**: Cần Stripe test mode cho development

### **Challenges Học Viên Có Thể Gặp**
1. **Docker Networking**: Hiểu `einvoice-nw` network và service discovery
2. **TCP vs HTTP**: Khác biệt giữa TCP microservices và HTTP REST
3. **Kafka Events**: Event-driven thinking và async processing
4. **gRPC vs TCP**: Khi nào dùng gRPC vs TCP
5. **Nx Monorepo**: Shared libraries và build dependencies
6. **LogQL Syntax**: Learning Loki query language cho log analysis
7. **Log Volume**: Managing high-volume logs trong development environment
8. **Webhook Security**: Understanding webhook signature verification
9. **Payment Flow**: Understanding async payment processing
10. **Email Templates**: Dynamic content generation với EJS

### **Tips Giảng Dạy**
- **Start Simple**: Begin với BFF → Invoice flow trước khi vào Kafka
- **Visual Diagrams**: Sử dụng Mermaid diagrams trong tài liệu
- **Live Demo**: Show Swagger UI và real API calls
- **Debug Together**: Show Docker logs và error handling
- **Code Walkthrough**: Explain design patterns trong context
- **Logging Demo**: Show real-time logs trong Grafana dashboard
- **Log Analysis**: Demonstrate LogQL queries cho debugging
- **Payment Demo**: Show complete payment flow với Stripe
- **Webhook Testing**: Demonstrate webhook handling với Stripe CLI

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
- Stripe CLI (for webhook testing)
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
   
   # Setup Stripe CLI (optional)
   stripe login
   ```

2. **Student Checklist**:
   - [ ] Docker Desktop running
   - [ ] Node.js và pnpm installed
   - [ ] Git configured
   - [ ] VSCode với extensions
   - [ ] Stable internet connection
   - [ ] Stripe CLI installed (optional)

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
- **Payment Integration**: Stripe API, webhook handling
- **Email Systems**: Template engines, dynamic content

### **Architectural Skills**
- **System Design**: Trade-offs giữa sync vs async communication
- **Service Communication**: TCP, gRPC, Event-driven patterns, Webhooks
- **Data Flow Design**: Request tracing, process ID tracking
- **Deployment Strategy**: Docker Compose, environment management
- **Scalability Planning**: Service independence, horizontal scaling
- **Payment Architecture**: Secure payment processing, webhook security

### **Production Skills**
- **Monitoring**: Health checks, metrics, error tracking
- **Configuration Management**: Environment-based config
- **Security**: Authentication, authorization, input validation, webhook security
- **Performance**: Caching strategies, database optimization
- **Payment Security**: Webhook signature verification, secure payment flow

---

## 🎓 Kết Quả Mong Đợi

Sau khóa học, học viên có thể:

### **Immediate Outcomes**
1. **Thiết kế** microservices architecture từ requirements
2. **Implement** event-driven communication với Kafka
3. **Deploy** multi-service application với Docker
4. **Debug** distributed systems issues
5. **Test** microservices với proper mocking
6. **Integrate** payment systems với webhook handling
7. **Design** secure payment flows với proper validation

### **Long-term Outcomes**
8. **Scale** individual services theo business needs
9. **Integrate** authentication systems (Keycloak, Auth0, etc.)
10. **Optimize** performance với caching và database tuning
11. **Monitor** production systems với observability tools
12. **Lead** microservices adoption trong team/organization
13. **Implement** secure payment processing systems
14. **Design** email marketing systems với dynamic content

### **Career Impact**
- **Senior Developer**: Microservices expertise
- **Solution Architect**: System design skills
- **DevOps Engineer**: Container orchestration
- **Technical Lead**: Team guidance on architecture decisions
- **Payment Engineer**: Payment system integration expertise

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

#### Payment Issues
```bash
# Test Stripe webhook
stripe listen --forward-to localhost:3000/api/v1/payment/stripe/webhook

# Check payment logs
docker logs invoice_service

# Verify webhook signature
# Check STRIPE_WEBHOOK_SECRET environment variable
```

---

**Chúc giảng viên thành công! 🚀**

*Tài liệu này được cập nhật để phản ánh chính xác source code hiện tại. Mọi thắc mắc về repo hoặc cách sử dụng trong giảng dạy, vui lòng liên hệ để được hỗ trợ.*