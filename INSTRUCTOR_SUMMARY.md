# 👨‍🏫 Hướng Dẫn Dành Cho Giảng Viên

## 📋 Tổng Quan Nhanh

Repo này là một **hệ thống E-Invoice hoàn chỉnh** được xây dựng theo **Microservices Architecture** với NestJS. Đây là case study lý tưởng để giảng dạy về:

- ✅ **Microservices Architecture** với 7 services
- ✅ **Event-Driven Architecture** với Kafka
- ✅ **API Gateway Pattern** (BFF)
- ✅ **Clean Architecture** với Repository Pattern
- ✅ **Production-ready practices** (logging, error handling, validation)

---

## 🎯 Cấu Trúc Khóa Học Đề Xuất

### **Buổi 1-2: Tổng Quan Kiến Trúc** (4 giờ)
- Giới thiệu Microservices vs Monolith
- Phân tích cấu trúc tổng thể (7 services)
- Demo chạy toàn bộ hệ thống với Docker
- **Thực hành**: Setup và chạy project

### **Buổi 3-4: BFF & API Gateway** (4 giờ)
- Phân tích BFF Service (`apps/bff/`)
- Swagger documentation
- TCP communication pattern
- **Thực hành**: Thêm endpoint mới vào BFF

### **Buổi 5-6: Core Business Logic** (4 giờ)
- Invoice Service (`apps/invoice/`)
- Repository Pattern implementation
- Business logic validation
- **Thực hành**: Implement new business rule

### **Buổi 7-8: Event-Driven Architecture** (4 giờ)
- Kafka setup và configuration
- Producer/Consumer pattern
- Mail Service analysis
- **Thực hành**: Thêm event mới

### **Buổi 9-10: Shared Libraries** (4 giờ)
- Nx monorepo structure
- Shared schemas, interfaces, utilities
- Error handling & logging
- **Thực hành**: Tạo shared library mới

### **Buổi 11-12: Advanced Topics** (4 giờ)
- Security best practices
- Testing strategies
- Monitoring & observability
- **Thực hành**: Implement authentication

---

## 🚀 Cách Chạy Demo

### 1. **Quick Start**
```bash
# Clone repo
git clone <repo-url>
cd <repo-name>

# Install dependencies
pnpm install

# Start infrastructure (MongoDB + Kafka)
pnpm docker:start:provider

# Build và start tất cả services
pnpm build
```

### 2. **Demo Flow**
1. **Truy cập Swagger**: `http://localhost:3000/api/v1/docs`
2. **Tạo Invoice**: POST `/api/v1/invoice`
3. **Gửi Invoice**: POST `/api/v1/invoice/:id/send`
4. **Kiểm tra email**: Mail service sẽ gửi email với PDF attachment

---

## 📚 Tài Liệu Giảng Dạy

### **Tài Liệu Chính**
- `TEACHING_GUIDE.md` - Tài liệu chi tiết cho học viên
- `ARCHITECTURE_ANALYSIS.md` - Phân tích kiến trúc có sẵn
- `README.md` - Hướng dẫn setup

### **Code Examples**
Các file quan trọng để demo:

```
📁 Key Files for Teaching:
├── apps/bff/src/main.ts                    # Entry point + Swagger
├── apps/bff/src/app/app.module.ts          # Module structure
├── apps/invoice/src/app/modules/invoice/
│   ├── services/invoice.service.ts         # Business logic
│   ├── controllers/invoice.controller.ts   # TCP handlers
│   └── repositories/invoice.repository.ts  # Data access
├── apps/mail/src/app/modules/mail/
│   └── services/mail-invoice.service.ts    # Event consumer
├── libs/schemas/src/lib/invoice/            # Database schema
├── libs/queue/src/lib/modules/kafka/       # Kafka integration
├── libs/middlewares/src/lib/               # Logging middleware
└── libs/interceptors/src/lib/              # Error handling
```

---

## 🎯 Điểm Nhấn Khi Giảng

### **1. Architecture Highlights**
- **7 Microservices** với vai trò rõ ràng
- **Nx Monorepo** cho code sharing
- **Docker Compose** cho deployment
- **Kafka** cho async communication

### **2. Best Practices Được Áp Dụng**
- ✅ **Repository Pattern** - Clean data access
- ✅ **Dependency Injection** - Loose coupling
- ✅ **Global Error Handling** - Consistent responses
- ✅ **Process ID Tracking** - Request tracing
- ✅ **DTO Validation** - Input validation
- ✅ **Configuration Management** - Environment-based config

### **3. Real-World Patterns**
- **API Gateway** (BFF) cho frontend integration
- **Event Sourcing** với Kafka events
- **CQRS** separation (TCP cho commands, events cho queries)
- **Circuit Breaker** pattern trong service communication

---

## 🧪 Bài Tập Thực Hành

### **Dễ** (Buổi 1-4)
1. Thêm endpoint GET `/health` cho tất cả services
2. Thêm validation rule mới cho Invoice
3. Customize Swagger documentation

### **Trung Bình** (Buổi 5-8)
4. Implement Product Service riêng biệt
5. Thêm Invoice status `CANCELLED` với business logic
6. Tạo Notification Service consume Kafka events

### **Khó** (Buổi 9-12)
7. Implement JWT authentication across services
8. Add Redis caching layer
9. Implement distributed tracing với correlation ID
10. Add comprehensive testing (unit + integration)

---

## ⚠️ Lưu Ý Khi Giảng

### **Điểm Mạnh Của Repo**
- ✅ Production-ready code quality
- ✅ Comprehensive error handling
- ✅ Well-structured modules
- ✅ Good separation of concerns
- ✅ Real business logic (không phải todo app)

### **Điểm Cần Cải Thiện**
- ⚠️ Thiếu authentication/authorization
- ⚠️ Chưa có comprehensive tests
- ⚠️ Thiếu monitoring/observability tools
- ⚠️ Configuration có thể centralize hơn

### **Challenges Học Viên Có Thể Gặp**
1. **Complexity**: Nhiều services có thể overwhelm
2. **Docker**: Cần hiểu Docker networking
3. **Kafka**: Event-driven concept khó hiểu ban đầu
4. **TCP Communication**: Khác với HTTP REST

---

## 🛠️ Setup Requirements

### **Minimum System Requirements**
- **RAM**: 8GB (16GB recommended)
- **Docker**: Latest version
- **Node.js**: v18+
- **pnpm**: Latest version

### **Development Tools**
- **IDE**: VSCode với NestJS extensions
- **Database**: MongoDB Compass (optional)
- **API Testing**: Postman hoặc Insomnia
- **Kafka UI**: Kafka-UI container (optional)

---

## 📈 Học Viên Sẽ Học Được

### **Technical Skills**
- Microservices architecture design
- NestJS advanced patterns
- Event-driven programming với Kafka
- MongoDB schema design
- Docker containerization
- Error handling strategies

### **Soft Skills**
- System design thinking
- Trade-off analysis (monolith vs microservices)
- Production-ready development practices
- Code organization trong large projects

---

## 🎓 Kết Quả Mong Đợi

Sau khóa học, học viên có thể:
1. **Thiết kế** hệ thống microservices từ đầu
2. **Implement** event-driven architecture
3. **Deploy** ứng dụng với Docker
4. **Debug** issues trong distributed systems
5. **Scale** individual services theo nhu cầu

---

**Chúc giảng viên thành công! 🚀**

*Mọi thắc mắc về repo hoặc cách sử dụng trong giảng dạy, vui lòng liên hệ để được hỗ trợ.*