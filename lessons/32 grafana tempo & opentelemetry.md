# 🚀 Lesson: Implement Distributed Tracing với OpenTelemetry (OTel) + Grafana Tempo

<img width="920" height="443" alt="image" src="https://github.com/user-attachments/assets/7b933d28-1e8e-4a5b-88d9-0dc2e254c2f2" />


---

## 🎯 Mục tiêu bài học

Sau khi hoàn thành lesson này, học viên sẽ:

* Hiểu **distributed tracing hoạt động như thế nào trong hệ thống microservices**
* Nắm rõ vai trò của **OpenTelemetry (OTel)** và **Grafana Tempo**
* Hiểu chi tiết các khái niệm cốt lõi: **Trace, Span, Context Propagation, Instrumentation**
* Biết cách **triển khai distributed tracing end-to-end** cho backend services
* Có thể **debug latency, bottleneck, lỗi hệ thống** dựa trên trace thực tế

---

## 1️⃣ Vì sao cần implement Distributed Tracing?

### 🔴 Vấn đề thực tế trong Microservices

Giả sử một request từ client đi qua nhiều service:

```
Client → API Gateway → Auth Service → Order Service → Payment Service
```

Khi request này bị chậm hoặc lỗi, các câu hỏi thường gặp là:

* ❓ Service nào gây chậm?
* ❓ Chậm ở bước nào?
* ❓ Request này đã đi qua những service nào?
* ❓ Lỗi phát sinh trước hay sau khi gọi service khác?

👉 **Logging truyền thống không trả lời được toàn bộ câu hỏi này**.

### ✅ Distributed Tracing giải quyết điều gì?

Distributed tracing giúp bạn:

* Theo dõi **toàn bộ vòng đời của một request**
* Biết chính xác **request đi qua đâu, mất bao lâu ở mỗi bước**
* Debug **latency, timeout, retry, error** một cách trực quan

---

## 2️⃣ Tổng quan kiến trúc OpenTelemetry + Grafana Tempo

### 🧩 Các thành phần chính

```
Application (Service A, B, C)
   ↓ (trace data)
OpenTelemetry SDK / Auto Instrumentation
   ↓
OpenTelemetry Collector
   ↓
Grafana Tempo
   ↓
Grafana UI (Trace Visualization)
```

### 🔍 Giải thích chi tiết từng thành phần

#### 🔹 OpenTelemetry (OTel) là gì?

OpenTelemetry là **standard observability framework** để thu thập:

* Traces
* Metrics
* Logs

Trong lesson này, ta tập trung vào **Tracing**.

OTel cung cấp:

* **SDK** cho các ngôn ngữ (Node.js, Java, Go, Python...)
* **Auto Instrumentation** (tự động tạo span cho HTTP, DB, RPC)
* **Manual Instrumentation** (tự tạo span cho business logic)

---

#### 🔹 OpenTelemetry Collector là gì?

Collector đóng vai trò **trung gian**:

* Nhận trace từ application
* Transform / filter / batch dữ liệu
* Gửi trace đến backend (Tempo, Jaeger, Zipkin...)

👉 Best practice: **application không gửi trace trực tiếp đến Tempo**.

---

#### 🔹 Grafana Tempo là gì?

Grafana Tempo là **distributed tracing backend**:

* Lưu trữ trace với chi phí thấp
* Không cần index toàn bộ trace
* Tối ưu cho việc **truy vấn trace theo TraceID**

Tempo thường được kết hợp với:

* Grafana (UI)
* Loki (Logs)
* Prometheus (Metrics)

👉 Tạo nên mô hình **3 pillars of observability**.

---

## 3️⃣ Các khái niệm cốt lõi trong Distributed Tracing

### 🧵 Trace là gì?

* **Trace** đại diện cho **1 request end-to-end**
* Mỗi trace có **Trace ID duy nhất**

📌 Ví dụ:

```
TraceID: abc-123
Client → Gateway → Order → Payment
```

---

### 🪜 Span là gì?

* **Span** đại diện cho **1 đơn vị công việc** trong trace
* Mỗi span có:

| Thuộc tính       | Ý nghĩa            |
| ---------------- | ------------------ |
| Span ID          | ID của span        |
| Parent Span ID   | Span cha           |
| Start / End Time | Thời gian thực thi |
| Attributes       | Metadata           |
| Events           | Sự kiện trong span |

📌 Ví dụ span tree:

```
HTTP POST /order
 ├─ Auth Service (20ms)
 ├─ Create Order (50ms)
 │   └─ Save DB (30ms)
 └─ Call Payment (120ms)
```

---

### 🔗 Context Propagation là gì?

Context propagation đảm bảo:

* **TraceID và SpanID được truyền xuyên suốt giữa các service**

📌 Thường được truyền qua HTTP headers:

```
traceparent: 00-<trace-id>-<span-id>-01
```

👉 Nếu thiếu context propagation → trace sẽ bị **đứt gãy**.

---

### 🛠 Instrumentation là gì?

Instrumentation là quá trình **tạo span**.

#### Auto Instrumentation

* HTTP server/client
* Database (MySQL, Postgres, MongoDB)
* gRPC

#### Manual Instrumentation

Dùng khi:

* Logic phức tạp
* Business step quan trọng

---

## 4️⃣ Ví dụ thực tế: Order Service (Node.js)

### 📦 Scenario

```
Client → Order Service → Payment Service
```

### 🔧 Cài đặt OpenTelemetry

```bash
npm install @opentelemetry/sdk-node
npm install @opentelemetry/auto-instrumentations-node
npm install @opentelemetry/exporter-trace-otlp-http
```

---

### 🧠 Khởi tạo OTel SDK

```ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'http://otel-collector:4318/v1/traces',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```

👉 Từ thời điểm này:

* HTTP request
* DB query

sẽ **tự động được tạo span**.

---

### ✍️ Manual Span cho Business Logic

```ts
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('order-service');

async function createOrder() {
  return tracer.startActiveSpan('create-order', async (span) => {
    // business logic
    await saveOrderToDB();
    span.end();
  });
}
```

👉 Khi xem trên Grafana:

* Bạn sẽ thấy rõ từng bước xử lý trong Order Service

---

## 5️⃣ Luồng dữ liệu Trace end-to-end

```
Request → Span (Service A)
        → Child Span (Service B)
        → Child Span (Service C)
        → OTel Collector
        → Grafana Tempo
        → Grafana UI
```

Trong Grafana, học viên có thể:

* Xem **trace waterfall**
* So sánh latency giữa các service
* Click vào từng span để xem metadata

<img width="800" height="500" alt="image" src="https://github.com/user-attachments/assets/4f7ce245-a203-47bc-9fc4-520d525c48c5" />


---

## 6️⃣ Best Practices khi dùng Tempo + OTel

### ✅ Nên làm

* Dùng **Auto Instrumentation trước**, manual sau
* Đặt tên span **có ý nghĩa business**
* Kết hợp trace + log + metric
* Sampling hợp lý (head / tail sampling)

### ❌ Tránh

* Tạo quá nhiều span không cần thiết
* Không truyền context giữa service
* Gửi trace trực tiếp từ app → Tempo

---

## 7️⃣ Tổng kết

* OpenTelemetry = **chuẩn observability**
* Tempo = **trace backend nhẹ, scalable**
* Distributed tracing = **vũ khí tối thượng để debug microservices**

👉 Khi hệ thống càng phức tạp, **tracing càng trở nên bắt buộc**.

---

📌 Gợi ý bài tiếp theo:

* Trace + Log correlation với Loki
* Tail-based sampling với Tempo
* Debug production incident bằng tracing
