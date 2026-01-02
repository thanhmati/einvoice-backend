# 📡 Distributed Tracing với Grafana Tempo & OpenTelemetry (OTel)

## 🎯 Mục tiêu bài học

Sau bài học này, bạn sẽ:

* Hiểu **Distributed Tracing là gì** và tại sao nó quan trọng trong hệ thống phân tán
* Phân biệt rõ **Grafana Tempo** và **OpenTelemetry (OTel)**
* Biết cách **OTel + Tempo phối hợp với nhau** trong kiến trúc thực tế
* Áp dụng tracing để **debug latency, bottleneck, lỗi** trong microservices

---

## 🧠 Thuật ngữ cốt lõi (nhắc nhanh)

| Thuật ngữ      | Ý nghĩa                           | Ví dụ thực tế                   |
| -------------- | --------------------------------- | ------------------------------- |             
| Trace          | Toàn bộ luồng xử lý của 1 request | User gọi API tạo đơn hàng       |
| Span           | Một bước xử lý trong trace        | Gọi service thanh toán          |
| Trace ID       | ID duy nhất cho toàn bộ request   | Dùng để truy vết end-to-end     |
| Span ID        | ID của từng bước xử lý            | Xác định latency từng operation |
| Parent / Child | Quan hệ giữa các span             | Service A gọi Service B         |

---

## 1️⃣ OpenTelemetry (OTel) là gì?

### 🔍 Định nghĩa

**OpenTelemetry** là **chuẩn mở + SDK + tooling** để:

* Instrument application
* Thu thập **Traces, Metrics, Logs**

OTel **không phải là backend lưu trữ**.

👉 OTel đóng vai trò **lớp sinh dữ liệu observability** (traces / metrics / logs)

### 🧩 Thành phần chính

#### 1. OTel SDK (trong app)

* Tự động hoặc manual instrumentation
* Gắn trace/span vào request

#### 2. OTel Collector (tuỳ chọn nhưng rất quan trọng)

* Nhận telemetry từ app
* Transform / batch / filter
* Export sang backend (Tempo, Jaeger, Datadog, ...)

```
[App] → [OTel SDK] → [OTel Collector] → [Tracing Backend]
```

### 🌍 Ngôn ngữ hỗ trợ

* Java, Go, Node.js, Python, .NET, Rust…

### 🎯 Điểm mạnh của OTel

* Vendor-neutral (không lock-in)
* Chuẩn công nghiệp
* Một lần instrument → đổi backend không cần sửa code

---

## 2️⃣ Grafana Tempo là gì?

### 🔍 Định nghĩa

**Grafana Tempo** là **distributed tracing backend**:

* Lưu trữ trace
* Truy vấn trace theo TraceID
* Tối ưu cho **high-scale, low-cost**

👉 Tempo **không làm instrumentation**

### 🧠 Triết lý thiết kế

* Không index toàn bộ trace (giảm chi phí)
* Chỉ index metadata cần thiết
* Phù hợp hệ thống lớn (hàng triệu trace/ngày)

### 🧩 Kiến trúc đơn giản

```
[OTel Collector] → [Tempo] → [Grafana UI]
```

### 📦 Storage backend

* S3 / GCS / Azure Blob
* Local filesystem (dev)

---

## ✨ Vì sao cần implement Distributed Tracing với OTel + Tempo?

### 1️⃣ Pain point trong hệ thống phân tán

* Request đi qua nhiều service, nhiều network hop
* Logs rời rạc, metrics chỉ phản ánh tổng quan

👉 Khi có sự cố, rất khó trả lời: **chậm ở đâu – vì sao – service nào**

---

### 2️⃣ Tracing giải quyết vấn đề gì?

* Theo dõi **end-to-end request flow**
* Đo latency chi tiết từng bước
* Xác định chính xác root cause

---

### 3️⃣ Vì sao chọn OpenTelemetry?

* Chuẩn CNCF, vendor-neutral
* Hỗ trợ đa ngôn ngữ
* Instrument một lần, đổi backend linh hoạt

---

### 4️⃣ Vì sao chọn Grafana Tempo?

* High-scale, low-cost
* Dùng object storage (S3/GCS)
* Tích hợp native với Grafana

---

### 5️⃣ Vì sao phải kết hợp OTel + Tempo?

| Bài toán               | OTel | Tempo |
| ---------------------- | ---- | ----- |
| Instrument application | ✅    | ❌     |
| Chuẩn hoá telemetry    | ✅    | ❌     |
| Lưu trữ trace          | ❌    | ✅     |
| Truy vấn & visualize   | ❌    | ✅     |

👉 **OTel sinh trace – Tempo lưu & hiển thị trace**

---

## 3️⃣ OTel vs Tempo – So sánh rõ ràng

| Tiêu chí         | OpenTelemetry        | Grafana Tempo       |
| ---------------- | -------------------- | ------------------- |
| Vai trò          | Instrument & collect | Store & query trace |
| Sinh trace       | ✅                    | ❌                   |
| Lưu trữ          | ❌                    | ✅                   |
| Chuẩn            | CNCF standard        | Grafana ecosystem   |
| Vendor lock-in   | Không                | Thấp                |
| Thay thế Jaeger? | ❌                    | ✅                   |

👉 **Không phải chọn 1 trong 2** 👉 **Chuẩn kiến trúc đúng: OTel + Tempo**

---

## 4️⃣ Kiến trúc chuẩn OTel + Tempo (Best Practice)

### 🔄 Flow trace

```
Client Request
   ↓
API Gateway
   ↓
Service A
   ↓
Service B
   ↓
Service C
```

Tất cả service:

* Dùng **OTel SDK**
* Propagate Trace Context (W3C Trace Context)

### 🏗 Kiến trúc tổng thể

```
┌──────────┐
│ Services │
│ (OTel)  │
└────┬─────┘
     ↓
┌──────────────┐
│ OTel        │
│ Collector   │
└────┬─────────┘
     ↓
┌──────────────┐
│ Tempo        │
│ (Trace DB)  │
└────┬─────────┘
     ↓
┌──────────────┐
│ Grafana UI   │
└──────────────┘
```

---

## 5️⃣ Khi nào dùng Tempo? Khi nào dùng OTel?

### ❓ Chỉ dùng OTel được không?

❌ Không — vì OTel **không lưu trace**

### ❓ Chỉ dùng Tempo được không?

❌ Không — vì Tempo **không instrument app**

### ✅ Dùng cả hai khi:

* Microservices / Distributed system
* Muốn quan sát end-to-end latency
* Cần correlate **Logs – Metrics – Traces**

---

## 6️⃣ Case thực tế

### 🎯 Vấn đề

* API response chậm 5s
* CPU, Memory bình thường

### 🔍 Dùng tracing phát hiện:

* Service B gọi external API mất 4.5s
* Retry logic gây delay nhân đôi

👉 Fix đúng chỗ, không mò mẫm

---

## 7️⃣ So sánh nhanh Tempo vs Jaeger

| Tiêu chí            | Tempo          | Jaeger        |
| ------------------- | -------------- | ------------- |
| Scale               | Rất lớn        | Trung bình    |
| Storage             | Object Storage | Elasticsearch |
| Chi phí             | Thấp           | Cao           |
| Grafana integration | Native         | Tốt           |

---

## 8️⃣ Tổng kết

* **Distributed Tracing** là bắt buộc với hệ thống phân tán
* **OpenTelemetry** = sinh dữ liệu observability
* **Grafana Tempo** = nơi lưu & truy vấn trace
* **OTel + Tempo** là combo chuẩn hiện nay

> ✨ Nếu bạn debug microservices mà chưa dùng tracing → bạn đang “đi trong bóng tối”

---

## 🔜 Gợi ý bài tiếp theo

* Instrument tracing cho NestJS với OTel
* Correlate Logs – Metrics – Traces trong Grafana
* Performance tuning dựa trên trace
