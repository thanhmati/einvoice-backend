# 📚 Lesson 1: Giới thiệu về Microservice Architecture

## 🎯 Mục tiêu bài học

- Hiểu **Microservice** là gì và tại sao nó được sử dụng.
- Phân biệt **Microservice** với **Monolithic**.
- Nắm cấu trúc tổng quan và các thành phần chính của Microservice.
- Hiểu cách các service giao tiếp với nhau.
- Thấy được ví dụ áp dụng Microservice trong dự án thực tế.

---

## 1. Microservice là gì?

<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/fadd7249-a45c-4c3b-a6b2-fe1e70ffa43f" />

**Microservice** là một kiến trúc phần mềm trong đó hệ thống được chia thành nhiều **dịch vụ nhỏ** (services) độc lập.  
Mỗi service đảm nhận **một chức năng riêng biệt**, có thể phát triển, triển khai và mở rộng độc lập.

🔍 **Đặc điểm chính:**

- **Independence**: Mỗi service có codebase riêng, deploy riêng.
- **Specialization**: Mỗi service chỉ tập trung vào một chức năng.
- **Scalability**: Có thể scale từng service độc lập.
- **Polyglot**: Mỗi service có thể dùng ngôn ngữ & công nghệ khác nhau.

🔍 **Ưu điểm:**
<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/77474a48-3774-434a-85bc-f2065e2949a8" />

---

## 2. Monolithic là gì?

<img width="1200" height="610" alt="image" src="https://github.com/user-attachments/assets/dcfe3317-8e66-43ed-b62d-86bd7c207cf0" />

**Monolithic Architecture** là mô hình kiến trúc phần mềm trong đó **toàn bộ ứng dụng** (gồm frontend, backend, business logic, database access) được gói gọn và triển khai như **một khối duy nhất**.

## Đặc điểm

- Một codebase duy nhất.
- Triển khai dưới dạng **một file** (hoặc container) duy nhất.
- Các module chia sẻ chung tài nguyên và runtime.

## Ưu điểm

- Đơn giản để phát triển và triển khai ban đầu.
- Debug, test nhanh ở giai đoạn nhỏ.
- Dễ quản lý khi team nhỏ.

## Nhược điểm

- Khó mở rộng từng phần.
- Deploy phải build lại toàn bộ hệ thống.
- Dễ bị ảnh hưởng dây chuyền khi lỗi.

## Ví dụ

Ứng dụng e-invoice ban đầu viết toàn bộ API, UI, xử lý PDF, email… trong **một project duy nhất**.

## Sơ đồ kiến trúc Monolithic

```mermaid
flowchart TD
    %% Nodes
    A["💻 Client (Web / Mobile)"]:::client --> B["🟨 Monolithic Application"]:::monolith
    B --> C["🖥️ UI Layer"]:::ui
    B --> D["⚙️ Business Logic Layer"]:::business
    B --> E["📂 Data Access Layer"]:::data
    E --> F["🗄️ Database"]:::database

    %% Styles
    classDef client fill:#87CEEB,stroke:#1E90FF,stroke-width:2px,color:#000,font-weight:bold,stroke-dasharray: 5 5
    classDef monolith fill:#FFD700,stroke:#DAA520,stroke-width:3px,color:#000,font-weight:bold
    classDef ui fill:#90EE90,stroke:#2E8B57,stroke-width:2px,color:#000,font-weight:bold
    classDef business fill:#FFB6C1,stroke:#FF69B4,stroke-width:2px,color:#000,font-weight:bold
    classDef data fill:#DDA0DD,stroke:#800080,stroke-width:2px,color:#000,font-weight:bold
    classDef database fill:#FFA07A,stroke:#FF4500,stroke-width:2px,color:#000,font-weight:bold


```

## 3. So sánh Monolithic vs Microservice

| Tiêu chí    | Monolithic                | Microservice                               |
| ----------- | ------------------------- | ------------------------------------------ |
| Codebase    | 1 codebase duy nhất       | Nhiều codebase nhỏ                         |
| Triển khai  | Deploy tất cả 1 lần       | Deploy từng service                        |
| Scale       | Scale toàn bộ app         | Scale từng service                         |
| Độ phức tạp | Thấp (ban đầu)            | Cao (quản lý service)                      |
| Rủi ro      | Lỗi 1 phần => sập toàn bộ | Lỗi 1 service => các service khác vẫn chạy |

---

## 4. Cấu trúc tổng quan hệ thống Microservice

```mermaid
graph TD;
    A["💻 Client (Web / Mobile)"] --> B["🌐 API Gateway"];
    B --> C["🔐 Auth Service"];
    B --> D["🛒 Order Service"];
    B --> E["💳 Payment Service"];
    B --> F["📦 Inventory Service"];

    C -->|Kafka / gRPC / REST| G["🗄️ Database Auth"];
    D -->|Kafka / gRPC / REST| H["🗄️ Database Order"];
    E -->|Kafka / gRPC / REST| I["🗄️ Database Payment"];

    D -->|"🗂️ Event Bus (Kafka)"| E;
    E -->|"🗂️ Event Bus (Kafka)"| F;

    %% Styles
    classDef db fill:#FFA07A,stroke:#FF4500,stroke-width:2px,color:#000,font-weight:bold
    class G,H,I db
    classDef service fill:#87CEFA,stroke:#1E90FF,stroke-width:2px,color:#000,font-weight:bold
    class C,D,E,F service
    classDef gateway fill:#FFDEAD,stroke:#DAA520,stroke-width:2px,color:#000,font-weight:bold
    class B gateway
    classDef client fill:#B0E0E6,stroke:#4682B4,stroke-width:2px,color:#000,font-weight:bold
    class A client


```

---
