# Distributed Transaction trong Microservices

> 🎯 **Mục tiêu lesson**: Sau bài này, học viên có thể
>
> * Hiểu rõ *vì sao Distributed Transaction tồn tại*
> * Phân biệt các cách tiếp cận phổ biến
> * Giải thích được **bằng ví dụ thực tế** khi trình bày hoặc đi phỏng vấn

---

## 1️⃣ Distributed Transaction là gì?

### 📌 Định nghĩa ngắn gọn

Distributed Transaction là **một nghiệp vụ gồm nhiều bước**, mỗi bước chạy ở **service + database khác nhau**, nhưng **kết quả cuối cùng phải đúng về mặt nghiệp vụ**.

---

### 🧠 Monolith vs Microservices

#### 🏢 Monolith

```
BEGIN TRANSACTION
  - Trừ tiền
  - Tạo đơn hàng
  - Giảm tồn kho
COMMIT / ROLLBACK
```

✔️ Thất bại ở đâu → rollback tất cả

---

#### 🌐 Microservices

```
Order Service      → Order DB
Payment Service    → Payment DB
Inventory Service  → Inventory DB
```

❌ Không thể `BEGIN TRANSACTION` cho 3 database khác nhau

➡️ **Vấn đề xuất hiện**: Nếu trừ tiền thành công nhưng hết hàng thì sao?

---

## 2️⃣ Vì sao Distributed Transaction là bài toán khó?

### ⚠️ Vấn đề 1: Network không đáng tin

* Service A gọi Service B
* Request timeout ≠ request thất bại
* Có thể **B đã xử lý xong nhưng A không biết**

➡️ Dễ gây **duplicate transaction**

---

### ⚠️ Vấn đề 2: CAP Theorem

Trong hệ phân tán, **bắt buộc phải chịu Partition (P)**
→ chỉ chọn được **C hoặc A**

Microservices thường chọn:

* ✅ Availability
* ❌ Strong Consistency

➡️ Chấp nhận **Eventual Consistency**

---

## 3️⃣ Các cách tiếp cận Distributed Transaction

## 3.1 ❌ Two-Phase Commit (2PC) – Biết để tránh

### 🧩 Cách hoạt động (minh họa)

```
[Coordinator]
   │ Prepare?
   ├── Service A: OK
   ├── Service B: OK
   └── Service C: OK
   │
   └─ Commit tất cả
```

### ❗ Vấn đề thực tế

* Coordinator chết → các service bị **treo lock**
* Scale kém
* Coupling cực chặt

🚫 **Gần như không dùng trong microservices hiện đại**

---

## 3.2 ✅ Saga Pattern – Giải pháp thực tế nhất

### 📌 Ý tưởng cốt lõi

> Thay vì rollback bằng DB transaction
> → rollback bằng **nghiệp vụ ngược lại (compensation)**

---

### 🛒 Ví dụ xuyên suốt: Đặt hàng E-commerce

### Step-by-step Saga

```
1️⃣ Order Service
   → create order (PENDING)

2️⃣ Payment Service
   → charge tiền

3️⃣ Inventory Service
   → reserve stock

4️⃣ Order Service
   → CONFIRMED
```

---

### 💥 Khi có lỗi xảy ra

📍 **Case: Inventory hết hàng**

```
- Inventory FAIL
- Saga trigger compensation:
   → Payment Service: refund
   → Order Service: CANCELLED
```

➡️ Không rollback DB, mà **rollback nghiệp vụ**

---

## 4️⃣ Hai kiểu Saga: Orchestration vs Choreography

## 4.1 Saga Orchestration

### 🎮 Ví dụ trực quan

```
[Saga Orchestrator]
   → Order Service
   → Payment Service
   → Inventory Service
```

### 👍 Ưu điểm

* Flow rõ ràng
* Debug dễ
* Phù hợp team nhỏ / trung bình

### 👎 Nhược điểm

* Orchestrator dễ phình to

---

## 4.2 Saga Choreography (Event-driven)

### 🎧 Ví dụ bằng event

```
OrderCreated
   ↓
PaymentProcessed
   ↓
StockReserved
```

### 👍 Ưu điểm

* Loose coupling
* Scale tốt

### 👎 Nhược điểm

* Khó trace flow
* Phải dùng distributed tracing

---

## 5️⃣ So sánh nhanh

| Tiêu chí   | Orchestration | Choreography |
| ---------- | ------------- | ------------ |
| Điều khiển | Trung tâm     | Event        |
| Debug      | Dễ            | Khó          |
| Scale      | Tốt           | Rất tốt      |
| Phù hợp    | Team nhỏ–vừa  | Hệ lớn       |

---

## 6️⃣ Những "cái bẫy" khi implement Saga

### ⚠️ Idempotency

📌 Ví dụ lỗi:

* Payment Service nhận lại cùng event 2 lần
* Trừ tiền 2 lần ❌

✅ Giải pháp:

* Dùng `transactionId`
* Check đã xử lý hay chưa

---

### ⚠️ Compensation ≠ Rollback

📌 Ví dụ:

* Đã gửi email
* Không thể "unsend"

➡️ Phải **chấp nhận inconsistency có kiểm soát**

---

### ⚠️ Ordering & Duplicate Event

📌 Ví dụ:

* Event CONFIRMED đến trước PAYMENT

✅ Giải pháp:

* Kafka partition key
* Version / state machine

---

## 7️⃣ Best Practices (Checklist cho production)

✅ Saga + Event-driven
✅ Idempotent consumer
✅ Retry có giới hạn
✅ Dead Letter Queue
✅ Distributed Tracing (OpenTelemetry)
❌ Không cross-database transaction

---

## 8️⃣ Khi nào KHÔNG cần Distributed Transaction?

* Business cho phép async
* Sai lệch tạm thời không ảnh hưởng lớn
* Có batch / reconciliation

➡️ **Đừng over-engineer**

---

## 9️⃣ Tổng kết

> Distributed Transaction
> ❌ Không phải để "giữ dữ liệu luôn đúng"
> ✅ Mà để **hệ thống sống sót khi có lỗi**

---

👉 Lesson tiếp theo gợi ý:

* Saga với **Kafka + NestJS (code + diagram)**
* Thiết kế **state machine cho Order Service**
