# Lesson: Database in Microservice Architecture

## 🎯 Learning Objectives

- Hiểu tại sao **mỗi microservice nên có database riêng**.
- Biết các **pattern phổ biến** khi thiết kế database trong microservice.
- So sánh **SQL vs NoSQL** trong từng tình huống.
- Hiểu cách **giao tiếp giữa các service khi cần dữ liệu chung**.
- Thực hành thiết kế cơ sở dữ liệu qua **case thực tế**.

---

## 1. Database per Service

👉 Mỗi service có DB riêng → tránh coupling, dễ scale.

```mermaid
graph TD
  A[User Service] -->|PostgreSQL| DB1[(UserDB)]
  B[Product Service] -->|MongoDB| DB2[(ProductDB)]
  C[Order Service] -->|PostgreSQL| DB3[(OrderDB)]
  D[Inventory Service] -->|Redis| DB4[(InventoryDB)]
```

---

## 2. Database Patterns

- **Database per Service (Best Practice)**
- **Shared Database (Anti-pattern)**
- **Polyglot Persistence**

---

## 3. Communication Between Services

- **Synchronous (API Call)**
- **Asynchronous (Event-driven)**

```mermaid
sequenceDiagram
  participant OrderService
  participant InventoryService
  participant PaymentService

  OrderService->>InventoryService: Publish "OrderCreated"
  OrderService->>PaymentService: Publish "OrderCreated"
  InventoryService-->>OrderService: "Stock Reserved"
  PaymentService-->>OrderService: "Payment Confirmed"
```

---

## 4. SQL vs NoSQL trong Microservice

| Use Case                 | SQL (Postgres/MySQL) | NoSQL (MongoDB, DynamoDB)          |
| ------------------------ | -------------------- | ---------------------------------- |
| Dữ liệu quan hệ phức tạp | ✅ Rất phù hợp       | ❌ Không mạnh                      |
| Cần scale write lớn      | ❌ Khó hơn           | ✅ Dễ dàng (sharding, replication) |
| Flexible schema          | ❌ Schema cứng       | ✅ Thêm field dễ dàng              |
| Transaction mạnh         | ✅ ACID đầy đủ       | ❌ Hạn chế                         |

👉 Thực tế: Hệ thống lớn thường **Polyglot Persistence**.

---

## 5. Case Studies in Real Projects

### 🛒 Case 1: E-commerce Checkout

- **Services**: `CartService`, `OrderService`, `PaymentService`, `InventoryService`.
- **Database choice**:
  - `CartService` → Redis (cache, lưu giỏ hàng tạm).
  - `OrderService` → PostgreSQL (transaction mạnh).
  - `PaymentService` → PostgreSQL (ACID cần thiết).
  - `InventoryService` → Redis (realtime stock).
- **Challenge**: đồng bộ stock khi nhiều đơn hàng cùng lúc.
- **Solution**: dùng **Saga Pattern + event-driven** để rollback khi thanh toán/stock fail.

### 🎟️ Case 2: Ticket Booking System (Ghế ngồi)

- **Services**: `UserService`, `BookingService`, `PaymentService`.
- **Database choice**:
  - `UserService` → PostgreSQL.
  - `BookingService` → MongoDB (ghế ngồi có cấu trúc động, nhiều trường linh hoạt).
  - `PaymentService` → PostgreSQL.
- **Challenge**: tránh overbooking khi nhiều người cùng đặt chỗ.
- **Solution**:
  - Dùng **optimistic locking** hoặc **distributed lock (Redis)** trong `BookingService`.
  - Publish `SeatReservedEvent` → lock ghế trong một khoảng thời gian.

### 🚚 Case 3: Food Delivery App

- **Services**: `RestaurantService`, `OrderService`, `DeliveryService`, `NotificationService`.
- **Database choice**:
  - `RestaurantService` → MongoDB (menu linh hoạt).
  - `OrderService` → PostgreSQL (đơn hàng cần transaction).
  - `DeliveryService` → PostGIS (Postgres + extension để xử lý geolocation).
  - `NotificationService` → Kafka + MongoDB (log event + message tracking).
- **Challenge**: scale realtime order tracking.
- **Solution**: dùng **event streaming (Kafka)** để đồng bộ trạng thái đơn hàng đến client.

---

## 6. Hands-on Exercise

🎓 **Bài tập:**

1. Với hệ thống E-commerce: chọn database phù hợp cho `CustomerService`, `OrderService`, `PaymentService`.
2. Với Ticket Booking: mô tả flow khi có 2 người đặt cùng 1 ghế.
3. Với Food Delivery: vẽ sơ đồ event khi đơn hàng chuyển từ “Created → Paid → On Delivery → Delivered”.

---

## ✅ Summary

- Microservice = **mỗi service quản lý DB riêng**.
- Chọn DB dựa trên use case, không có “one size fits all”.
- Dùng **event-driven + Saga Pattern** để giải quyết transaction phân tán.
- **Case thực tế** (E-commerce, Ticketing, Food Delivery) cho thấy SQL và NoSQL thường kết hợp cùng nhau trong Polyglot Persistence.
