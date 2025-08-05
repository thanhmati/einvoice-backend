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
📦 E-Invoice System
├── 🌐 BFF (Backend for Frontend) - Port 3000
├── 📄 Invoice Service - TCP Microservice
├── 📁 Media Service - TCP Microservice  
├── 📄 PDF Generator Service - TCP Microservice
├── 📧 Mail Service - Kafka Consumer
├── 👤 User Access Service - TCP Microservice
├── 🔐 Authorizer Service - gRPC Microservice
├── 🗄️ MongoDB - Port 27017
├── 📨 Kafka - Port 9092
├── 🔑 Keycloak - Port 8180
├── 📊 Grafana - Port 3001 (Monitoring Dashboard)
├── 📋 Loki - Port 3100 (Log Aggregation)
└── 📡 Promtail - Log Collection Agent
```

### 🔄 Communication Patterns
- **BFF ↔ Services**: TCP (Synchronous)
- **Authorizer Service**: gRPC (Synchronous)
- **Event Processing**: Kafka (Asynchronous)
- **Database**: MongoDB với Mongoose

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

# 2. Khởi động infrastructure (MongoDB + Kafka + Keycloak + Logging Stack)
pnpm docker:start:provider

# 3. Build và start tất cả services
pnpm build

# 4. Truy cập Swagger API Documentation
# http://localhost:3000/api/v1/docs
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
- ✅ **Microservices Architecture** với 7 services
- ✅ **API Gateway Pattern** (BFF)
- ✅ **Event-Driven Architecture** với Kafka
- ✅ **Repository Pattern** cho data access
- ✅ **Dependency Injection** với NestJS

### 💡 Technology Stack
- **Framework**: NestJS với TypeScript
- **Database**: MongoDB + Mongoose
- **Message Queue**: Kafka
- **Authentication**: Keycloak
- **File Storage**: Cloudinary
- **PDF Generation**: Puppeteer + EJS
- **Email**: Nodemailer
- **Containerization**: Docker + Docker Compose
- **Monorepo**: Nx
- **Monitoring**: Grafana Dashboard
- **Log Aggregation**: Loki + Promtail
- **Centralized Logging**: Docker container logs collection

### 📊 Production-Ready Features
- ✅ Global error handling với ExceptionInterceptor
- ✅ Request logging với LoggerMiddleware
- ✅ Process ID tracking across services
- ✅ DTO validation với class-validator
- ✅ Swagger API documentation
- ✅ Docker containerization
- ✅ Environment-based configuration
- ✅ Centralized logging với Grafana + Loki + Promtail
- ✅ Real-time log monitoring và dashboard
- ✅ Container log aggregation và search

---

## 📈 Cấu Trúc Học Tập Đề Xuất

### Tuần 1-2: Foundation (8 giờ)
- **Phần 1**: Tổng quan kiến trúc Microservices
- **Phần 2**: Phân tích BFF & API Gateway Pattern
- **Thực hành**: Setup và chạy hệ thống, test API

### Tuần 3-4: Core Services (8 giờ)
- **Phần 3**: Invoice Service - Business Logic
- **Phần 4**: TCP Communication Patterns
- **Thực hành**: Thêm endpoint mới, implement validation

### Tuần 5-6: Event-Driven Architecture (8 giờ)
- **Phần 5**: Kafka Integration & Event Processing
- **Phần 6**: Mail Service - Event Consumer
- **Thực hành**: Implement event mới, custom Kafka handler

### Tuần 7-8: Advanced Topics (8 giờ)
- **Phần 7**: Shared Libraries & Code Organization
- **Phần 8**: Security, Testing, Monitoring
- **Thực hành**: Authentication, unit tests, logging

### Tuần 9-10: Production Deployment (8 giờ)
- **Phần 9**: Docker Deployment & Scaling
- **Phần 10**: Best Practices & Performance
- **Thực hành**: Production deployment, monitoring setup

---

## 🛠️ Tools Hỗ Trợ

### Development Tools
- **API Testing**: Swagger UI tại `http://localhost:3000/api/v1/docs`
- **Database**: MongoDB Compass cho GUI
- **Message Queue**: Kafka UI (có thể enable trong docker-compose)
- **Authentication**: Keycloak Admin tại `http://localhost:8180`
- **Monitoring**: Grafana Dashboard tại `http://localhost:3001` (admin/admin)
- **Log Search**: Loki API tại `http://localhost:3100`
- **Log Collection**: Promtail agent tự động thu thập logs từ Docker containers

### Xem Sơ Đồ Mermaid
- **GitHub**: Tự động render Mermaid diagrams
- **VSCode**: Mermaid Preview extension
- **Online**: https://mermaid.live/

---

## 🎯 Demo Flow

### 1. Tạo Invoice
```bash
POST http://localhost:3000/api/v1/invoice
Content-Type: application/json

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

### 2. Gửi Invoice (Trigger PDF + Email)
```bash
POST http://localhost:3000/api/v1/invoice/{invoiceId}/send
```

### 3. Kiểm tra Flow
- Invoice status chuyển từ `created` → `sent`
- PDF được generate và upload lên Cloudinary
- Kafka event được publish
- Mail service consume event và gửi email với PDF attachment

---

## 📞 Hỗ Trợ

### Nếu Gặp Vấn Đề
1. **Docker Issues**: Kiểm tra `docker ps` và logs
2. **Service Connection**: Verify network `einvoice-nw`
3. **Database**: Ensure MongoDB is running on port 27017
4. **Kafka**: Check Kafka broker health
5. **Logging Stack**: Verify Grafana (3001), Loki (3100), và Promtail services
6. **Log Collection**: Check Promtail is collecting container logs properly

### Debugging
```bash
# Check running containers
docker ps

# View service logs
docker logs <container-name>

# Check network
docker network ls | grep einvoice

# MongoDB connection test
docker exec -it mongodb mongosh

# Check logging stack
docker logs grafana
docker logs loki
docker logs promtail

# Verify log collection
curl http://localhost:3100/ready
curl http://localhost:3100/metrics
```

### Feedback & Contributions
- Góp ý cải thiện tài liệu
- Đề xuất bài tập mới
- Báo lỗi trong code examples
- Contribute to documentation

---

**Happy Teaching & Learning! 🎓🚀**

*Tài liệu này được cập nhật để phản ánh chính xác source code hiện tại. Mọi thắc mắc xin liên hệ để được hỗ trợ.*
