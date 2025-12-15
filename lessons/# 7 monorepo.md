# Lesson: Giới thiệu Monorepo trong bối cảnh Microservice Project

---

## 1️⃣ Monorepo là gì?

Trong bối cảnh **microservice**, thay vì tách từng service ra nhiều repository riêng biệt, **monorepo** cho phép **gom toàn bộ các service, thư viện chung, và công cụ hỗ trợ vào một repository duy nhất**.

📌 Ví dụ:  
Dự án hệ thống **E-Invoice** có nhiều service như `user-service`, `invoice-service`, `mail-service`...  
Thay vì tạo nhiều repo, ta tổ chức tất cả trong một **monorepo**:

```text
e-invoice-project/
├── services/
│ ├── user-service/
│ ├── invoice-service/
│ └── mail-service/
├── libs/
│ ├── dto/
│ ├── common-utils/
│ └── event-contracts/
└── package.json
```

---

## 2️⃣ Tại sao Monorepo hữu ích cho Microservice?

<img width="1024" height="576" alt="image" src="https://github.com/user-attachments/assets/2ff644bd-8dbd-4264-b8d6-a2dc9e7d9c5f" />

- **Chia sẻ code dễ dàng**:  
  Các thư viện chung (như `dto`, `utils`, `event-contracts`) có thể dùng cho nhiều service mà không cần publish package riêng.

- **Đồng bộ hoá dependency**:  
  Tất cả service dùng chung version của dependency → tránh lỗi lệch version.

- **CI/CD đơn giản hơn**:  
  Có thể thiết lập pipeline build/test cho toàn bộ project, hoặc cho từng service riêng ngay trong cùng repo.

- **Onboarding nhanh**:  
  Dev mới chỉ cần clone 1 repo là có toàn bộ codebase.

- **Quản lý version đồng bộ**:  
  Các thay đổi lớn (breaking change) có thể kiểm soát ngay trong cùng repo, đảm bảo các service cập nhật kịp thời.

---

## 3️⃣ Những thách thức khi dùng Monorepo

- **Repo phình to**: Khi số lượng service nhiều, repo trở nên nặng, clone/build mất thời gian.
- **Quyền truy cập**: Khó phân quyền theo từng service, vì tất cả code chung 1 repo.
- **CI/CD phức tạp hơn ở quy mô lớn**: Cần tối ưu pipeline để chỉ build/test service thay đổi, tránh chạy lại toàn bộ.

---

## 4️⃣ So sánh nhanh: Monorepo vs Multirepo trong Microservice

<img width="2260" height="1252" alt="image" src="https://github.com/user-attachments/assets/7936afd6-ddaa-41e3-a0d0-5ef973bfb098" />

| Tiêu chí           | Monorepo                                         | Multirepo                                    |
| ------------------ | ------------------------------------------------ | -------------------------------------------- |
| **Tổ chức code**   | Tất cả trong 1 repo                              | Mỗi service có repo riêng                    |
| **Chia sẻ code**   | Dễ dàng (libs chung)                             | Khó khăn, cần publish package hoặc copy code |
| **CI/CD**          | 1 pipeline chung, có thể điều hướng theo service | Mỗi repo có pipeline riêng, độc lập hơn      |
| **Dependency**     | Đồng bộ, kiểm soát tốt                           | Dễ lệch version, khó đồng bộ                 |
| **Quyền truy cập** | Ai có quyền repo → thấy toàn bộ                  | Có thể phân quyền chi tiết theo service      |
| **Quy mô**         | Phù hợp team nhỏ, service vừa và ít              | Phù hợp team lớn, service nhiều và phức tạp  |

---

## 5️⃣ Kết luận

Trong giai đoạn học tập và phát triển các dự án microservice thực chiến:

- **Monorepo** là lựa chọn phù hợp vì:
  - Học viên dễ dàng nắm được tổng thể kiến trúc.
  - Việc chia sẻ code (DTO, event contract, utils) trở nên trực quan.
  - CI/CD và quản lý dependency đơn giản hơn.

🎯 Vì vậy, trong khóa học này, chúng ta sẽ xây dựng toàn bộ hệ thống microservice trên **Monorepo (Nx)** để học viên vừa nắm lý thuyết, vừa thực hành hiệu quả.
