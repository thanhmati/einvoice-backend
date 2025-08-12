# 📚 Lesson: Giới thiệu về Microservice Architecture

## 🎯 Mục tiêu bài học
- Hiểu **Microservice** là gì và tại sao nó được sử dụng.
- Phân biệt **Microservice** với **Monolithic**.
- Nắm cấu trúc tổng quan và các thành phần chính của Microservice.
- Hiểu cách các service giao tiếp với nhau.
- Thấy được ví dụ áp dụng Microservice trong dự án thực tế.

---

## 1. Microservice là gì?
**Microservice** là một kiến trúc phần mềm trong đó hệ thống được chia thành nhiều **dịch vụ nhỏ** (services) độc lập.  
Mỗi service đảm nhận **một chức năng riêng biệt**, có thể phát triển, triển khai và mở rộng độc lập.

🔍 **Đặc điểm chính:**
- **Independence**: Mỗi service có codebase riêng, deploy riêng.
- **Specialization**: Mỗi service chỉ tập trung vào một chức năng.
- **Scalability**: Có thể scale từng service độc lập.
- **Polyglot**: Mỗi service có thể dùng ngôn ngữ & công nghệ khác nhau.

---

## 2. So sánh Monolithic vs Microservice

| Tiêu chí        | Monolithic | Microservice |
|-----------------|------------|--------------|
| Codebase        | 1 codebase duy nhất | Nhiều codebase nhỏ |
| Triển khai      | Deploy tất cả 1 lần | Deploy từng service |
| Scale           | Scale toàn bộ app | Scale từng service |
| Độ phức tạp     | Thấp (ban đầu) | Cao (quản lý service) |
| Rủi ro          | Lỗi 1 phần => sập toàn bộ | Lỗi 1 service => các service khác vẫn chạy |

---

## 3. Cấu trúc tổng quan hệ thống Microservice

```mermaid
graph TD
    A[Client\n(Web / Mobile)] --> B[API Gateway]
    B --> C[Auth Service]
    B --> D[Order Service]
    B --> E[Payment Service]
    B --> F[Inventory Service]

    C -->|Kafka / gRPC / REST| G[(Database Auth)]
    D -->|Kafka / gRPC / REST| H[(Database Order)]
    E -->|Kafka / gRPC / REST| I[(Database Payment)]
    F -->|Kafka / gRPC / REST| J[(Database Inventory)]

    D <-->|Event Bus (Kafka)| E
    E <-->|Event Bus (Kafka)| F
