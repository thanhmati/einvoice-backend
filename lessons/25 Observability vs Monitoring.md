# 🎬 Monitoring vs Observability trong Microservices

## 1. Tổng quan

Trong microservices, hệ thống gồm nhiều service nhỏ hoạt động độc lập. Để biết mọi thứ có đang ổn hay không và hiểu khi nào vấn đề xảy ra, chúng ta cần hai khái niệm quan trọng: **Monitoring** và **Observability**.

<img width="720" height="376" alt="image" src="https://github.com/user-attachments/assets/312b6430-b377-40f8-87ba-74345b2c451e" />

---

## 2. Monitoring

Monitoring tập trung vào việc trả lời câu hỏi:
➡️ **“Hệ thống có đang hoạt động bình thường không?”**

Nó dựa trên các chỉ số định lượng:

- CPU, Memory, Disk Usage
- Latency
- Error Rate
- Throughput

Monitoring giúp phát hiện sớm sự cố và kích hoạt cảnh báo.

---

## 3. Observability

Observability giúp trả lời câu hỏi:
➡️ **“Vì sao hệ thống gặp vấn đề?”**

Nó dựa trên 3 trụ cột chính:

- **Logs** — Theo dõi hoạt động chi tiết
- **Metrics** — Quan sát các chỉ số hệ thống
- **Traces** — Theo dõi hành trình của request giữa các service

Observability cho phép hiểu và phân tích sâu các lỗi, kể cả những lỗi chưa từng gặp.

---

## 4. So sánh nhanh

| Monitoring               | Observability                    |
| ------------------------ | -------------------------------- |
| Phát hiện vấn đề         | Hiểu và giải quyết vấn đề        |
| Dựa trên metrics cố định | Dựa trên logs + metrics + traces |
| Tập trung vào trạng thái | Tập trung vào nguyên nhân        |

---

## 5. Các stack thường có trong Monitoring & Observability

Dưới đây là danh sách các thành phần phổ biến:

### **Monitoring Stack**

- **Health Check** (Liveness / Readiness / Startup)
- **Alerting system** (Prometheus Alertmanager)
- **Metrics collection** (Prometheus, Datadog)
- **Dashboard** (Grafana)

### **Observability Stack**

- **Centralized Logging** (ELK Stack, Loki, CloudWatch)
- **Distributed Tracing** (OpenTelemetry, Jaeger, Zipkin)
- **Log Processing** (Fluentd, Logstash)
- **Service Mesh Telemetry** (Istio, Linkerd)

---

## 6. Kết nối với Health Check

Health Check là một phần trong Monitoring, dùng để xác định service có hoạt động bình thường hay không. Nó là điểm mở đầu cần thiết trước khi đi sâu vào toàn bộ hệ thống giám sát.

Trong các video tiếp theo, chúng ta sẽ bắt đầu với **Health Check**, trước khi tiến sang logging, metrics và tracing trong microservices.
