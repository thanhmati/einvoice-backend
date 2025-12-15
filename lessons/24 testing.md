# Testing Microservices

## 🎯 Mục tiêu của bài học

Sau bài học này, học viên sẽ hiểu và phân biệt được các loại test trong hệ thống microservices, lý do cần testing nhiều layer khác nhau, và nắm được chiến lược test chuẩn enterprise thường dùng trong kiến trúc phân tán.

---

## 1. Tại sao Testing Microservices phức tạp?

Khác với monolithic, microservices có:

- Nhiều service chạy độc lập
- Mỗi service có database riêng
- Giao tiếp qua network (HTTP, TCP, Kafka…)
- Luồng xử lý bất đồng bộ (event-driven)

Điều này dẫn đến:

- Test không thể chỉ mock là đủ
- Testing phải nhiều tầng (multi-layer strategy)
- Mỗi layer test có vai trò riêng

---

## 2. Test Pyramid dành cho Microservices

```
            End-to-End Tests
        Component / Contract Tests
      Integration Tests (Database, MQ)
         Unit Tests (Business Logic)
```

---

## 3. Unit Testing trong Microservice

### Mục tiêu

Test business logic nhỏ nhất mà không phụ thuộc database hay network.

### Kỹ thuật

- Mock Repository
- Mock external calls (Kafka, Redis, HTTP)
- Test async logic
- Test error cases

### Ví dụ

```ts
describe('OrderService - calculateTotal', () => {
  it('should calculate total with discount', () => {
    const orderService = new OrderService();
    const total = orderService.calculateTotal([{ price: 100, qty: 2 }], 10);
    expect(total).toBe(180);
  });
});
```

---

## 4. Integration Testing (Database, Redis, Kafka producer)

### Mục tiêu

Đảm bảo service hoạt động đúng với database thật.

### Strategy

- Dùng Testcontainers để boot database thật (Mongo, Postgres)
- Khởi tạo module NestJS với kết nối real DB
- Seed data
- Thực thi repository/service như production

### Lý do doanh nghiệp yêu cầu Integration Test

- DB schema dễ phá vỡ
- Query phức tạp → unit test không bắt được lỗi
- Index, constraint, transaction rất quan trọng

---

## 5. Contract Testing (Pact)

### Mục tiêu

Đảm bảo service A và service B tương thích với nhau.

### Plan

- Consumer (BFF) định nghĩa contract
- Provider (Auth, Order…) validate contract
- Build pipeline fail nếu provider phá API

---

## 6. Component Testing

### Ví dụ

Test Order Service:

- Real DB
- Mock Kafka Producer
- Mock Inventory Service
- Test endpoint `/orders`

---

## 7. End-to-End Testing (Multi-Service Flow)

### Flow mẫu

```
Client → API Gateway → Order Service → Kafka → Inventory Service → Kafka → Payment Service
```

### Cách thực hiện

- Docker Compose start toàn bộ hệ thống
- Gọi API từ test script
- Kiểm tra DB thay đổi
- Kiểm tra Kafka events
- Kiểm tra final response

---

## 8. Load Testing (k6)

### Mục tiêu

- Kafka throughput
- Order service 500 RPS
- JWT auth verification
- Database indexing test

---

## 9. Chaos Testing

### Ví dụ

- Tắt Inventory Service → Order Service retry
- Kafka delay 200ms
- DB timeout

---

## 10. Microservice Testing Strategy (Summary)

| Layer            | Mục tiêu              | Công cụ        |
| ---------------- | --------------------- | -------------- |
| Unit Test        | Test logic            | Jest           |
| Integration Test | DB + module thật      | Testcontainers |
| Contract Test    | Service compatibility | Pact           |
| Component Test   | Test 1 service        | Jest + mocks   |
| E2E Test         | Multi-service flow    | Docker Compose |
| Load Test        | Performance           | k6             |
| Chaos Test       | Stability             | Chaos Mesh     |
