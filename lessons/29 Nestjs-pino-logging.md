# Nestjs-pino là gì? Vì sao nên log JSON format?

## 1. Nestjs-pino là gì?

**nestjs-pino** là integration chính thức giữa **NestJS** và **Pino** – một logging library nổi tiếng với **hiệu năng rất cao** trong Node.js.

Nó được dùng để **thay thế hoặc mở rộng logger mặc định của NestJS**, giúp hệ thống log:

* Có cấu trúc (structured logging)
* Hiệu năng tốt
* Dễ tích hợp với centralized logging & observability stack

---

## 2. Nestjs-pino dùng để làm gì?

### 2.1 Logging hiệu năng cao

* Pino nhanh hơn đáng kể so với `console.log`, Winston
* Ghi log theo **JSON object** thay vì string
* Rất phù hợp cho:

  * High-throughput API
  * Microservices

---

### 2.2 Tích hợp sâu với NestJS

nestjs-pino tự động:

* Log HTTP request / response
* Log status code, response time
* Log exception

Inject logger trực tiếp vào service:

```ts
constructor(private readonly logger: PinoLogger) {}
```

---

### 2.3 Context-aware logging

* Tự động gắn:

  * `requestId`
  * `traceId`
  * `spanId`

Rất quan trọng khi debug **distributed system** và microservices.

---

### 2.4 Chuẩn bị sẵn cho Centralized Logging

Log JSON từ Pino có thể đẩy trực tiếp vào:

* Grafana Loki + Promtail
* ElasticSearch / OpenSearch
* Datadog
* Grafana Cloud

---

## 3. Vì sao nên log ở JSON format?

> JSON log **không sinh ra để con người đọc trực tiếp**, mà để **máy xử lý và phân tích**.

---

### 3.1 Structured Logging (log có cấu trúc)

Plain text log:

```text
User 123 failed to pay order 456
```

JSON log:

```json
{
  "level": "error",
  "userId": 123,
  "orderId": 456,
  "event": "payment_failed"
}
```

**Lợi ích:**

* Query theo field chính xác
* Không cần regex để parse log

---

### 3.2 Dễ search, filter, aggregate

Ví dụ với Grafana Loki:

```logql
{service="order-service"} |= "payment_failed"
```

Hoặc filter chi tiết hơn:

```logql
{service="order-service", level="error", orderId="456"}
```

👉 JSON log giúp query nhanh, chính xác và ít tốn tài nguyên.

---

### 3.3 Phù hợp với Microservices & Distributed Tracing

JSON log dễ gắn metadata:

* `traceId`
* `spanId`
* `requestId`
* `service`
* `environment`

Ví dụ:

```json
{
  "level": "info",
  "msg": "Create order",
  "service": "order-service",
  "traceId": "abc123",
  "requestId": "req-789"
}
```

👉 Khi debug request đi qua nhiều service, chỉ cần filter theo `traceId`.

---

### 3.4 Chuẩn hóa log trong team

* Plain text: mỗi dev viết một kiểu
* JSON log: thống nhất field, dễ enforce convention

---

### 3.5 Tách Log Generation và Log Presentation

* Application **luôn log JSON**
* Local development: dùng `pino-pretty` để đọc dễ hơn
* Production: đẩy raw JSON cho hệ thống log

👉 Không cần đổi code giữa dev và prod.

---

## 4. Ví dụ cấu hình nestjs-pino

```ts
LoggerModule.forRoot({
  pinoHttp: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transport:
      process.env.NODE_ENV !== 'production'
        ? { target: 'pino-pretty' }
        : undefined,
  },
});
```

* **Local**: log dễ đọc
* **Production**: JSON thuần cho Promtail / Loki

---

## 5. Khi nào nên dùng nestjs-pino?

### Nên dùng khi:

* Microservices
* High traffic API
* Cần centralized logging
* Dùng Prometheus / Loki / OpenTelemetry
* Cần traceId, requestId để debug

### Không cần thiết khi:

* App nhỏ
* Script đơn giản
* Không có yêu cầu observability cao

---

## 6. Kết luận

* **nestjs-pino** giúp NestJS logging:

  * Nhanh hơn
  * Chuẩn hóa
  * Sẵn sàng cho production
* **JSON logging** là nền tảng cho:

  * Centralized logging
  * Distributed tracing
  * Observability trong microservices

👉 Trong production microservices, **JSON log gần như là bắt buộc**.
