# Lesson: Observability vs Monitoring

## 1. Tổng quan

Observability và Monitoring là hai khái niệm cốt lõi trong kiến trúc
microservices. Chúng liên quan với nhau nhưng phục vụ những mục tiêu
khác nhau. Monitoring giúp bạn phát hiện vấn đề đã biết trước, trong khi
Observability giúp bạn trả lời các câu hỏi mà bạn chưa từng nghĩ đến.

------------------------------------------------------------------------

## 2. Định nghĩa

### **Monitoring**

Monitoring là việc thu thập các chỉ số (metrics), logs và các dữ liệu đã
được định nghĩa sẵn nhằm theo dõi xem hệ thống có hoạt động bình thường
hay không.

**Ý chính:** Bạn biết mình muốn theo dõi điều gì.

**Ví dụ:**
Bạn đặt alert khi CPU > 80% trong 5 phút. Điều này nghĩa là bạn đã biết
CPU có thể là bottleneck nên bạn theo dõi nó.

------------------------------------------------------------------------

### **Observability**

Observability là khả năng hiểu trạng thái bên trong của hệ thống dựa
trên dữ liệu mà hệ thống phát ra, **kể cả khi bạn không biết trước phải
theo dõi điều gì**.

**Ý chính:** Bạn có thể trả lời các câu hỏi chưa biết trước mà không cần
thêm instrument code.

**Ví dụ:**
Một request bị chậm bất thường. Nhờ distributed tracing, bạn tìm ra
nguyên nhân nằm ở downstream service --- dù bạn chưa từng cấu hình alert
cho tình huống đó.

------------------------------------------------------------------------

## 3. Vì sao Observability quan trọng hơn trong Microservices

  Khía cạnh                       Monitoring                 Observability
  ------------------------------- -------------------------- ----------------------------
  Mục tiêu                        Phát hiện vấn đề đã biết   Điều tra vấn đề chưa biết
  Dữ liệu                         Metrics, logs cố định      Metrics + Logs + Traces
  Loại câu hỏi                    Dự đoán, cụ thể            Mở rộng, khám phá
  Mức phù hợp với microservices   Hạn chế                    Tuyệt vời
  Công cụ                         Prometheus, Grafana        OpenTelemetry, Jaeger, ELK

------------------------------------------------------------------------

## 4. Ví dụ đời thường để dễ hiểu

### **Monitoring giống như bảng đồng hồ xe hơi**

Bảng đồng hồ hiển thị: - Tốc độ - Mức xăng - Nhiệt độ động cơ

Đó là những chỉ số cố định. Nó chỉ cho bạn biết có vấn đề --- nhưng
**không cho bạn biết lý do**.

------------------------------------------------------------------------

### **Observability giống như một thợ sửa xe**

Thợ sửa có thể: - Kiểm tra cảm biến - Quan sát đường khí nạp - Kiểm tra
hành vi động cơ - Tìm lỗi ẩn mà bạn không biết

Họ trả lời được những câu hỏi mà bạn không dự đoán trước.

------------------------------------------------------------------------

## 5. Ví dụ thực tế trong Microservices

### **Monitoring Example**

Service: `payment-service`

Theo dõi: - Request per second - Error rate - Response time

Alert: - Error rate > 5% trong 1 phút

Giúp bạn phát hiện lỗi đã biết.

------------------------------------------------------------------------

### **Observability Example**

Một request mất 3 giây thay vì 200ms.

Dùng distributed tracing: - `payment-service` → OK
- `inventory-service` → OK
- `discount-service` → delay 2.8s

Bạn tìm được root cause dù không có alert cho `discount-service`.

------------------------------------------------------------------------

## 6. Khi nào dùng Monitoring, khi nào dùng Observability

### **Monitoring dùng cho:**

-   Health checks
-   Uptime tracking
-   Alerts theo ngưỡng
-   Theo dõi SLO/SLI

### **Observability dùng cho:**

-   Debug vấn đề phức tạp
-   Điều tra hành vi bất thường
-   Root cause analysis
-   Latency phân tán giữa nhiều service

------------------------------------------------------------------------

## 7. Tóm tắt

-   Monitoring giúp bạn biết **khi nào** có vấn đề.
-   Observability giúp bạn biết **tại sao** có vấn đề.
-   Cả hai đều quan trọng, nhưng Observability là yếu tố bắt buộc trong
    kiến trúc microservices.

------------------------------------------------------------------------

## 8. Bộ công cụ gợi ý

### Monitoring:

-   Prometheus
-   Grafana
-   CloudWatch
-   Datadog Metrics

### Observability:

-   OpenTelemetry (chuẩn instrument)
-   Jaeger / Zipkin (tracing)
-   ELK stack (logs)
-   Datadog APM / New Relic

------------------------------------------------------------------------

## 9. Kết luận

Trong microservices, lỗi là điều không thể tránh. Monitoring giúp bạn
phát hiện nhanh, còn Observability giúp bạn đào sâu, hiểu rõ và khôi
phục hệ thống nhanh nhất có thể.
