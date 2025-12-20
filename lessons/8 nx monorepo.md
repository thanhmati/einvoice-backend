# Lesson: Giới Thiệu Về Nx Trong Phát Triển Microservice

---

## 1️⃣ Nx là gì?

<img width="2400" height="1350" alt="image" src="https://github.com/user-attachments/assets/95b2e453-1216-42c2-92fb-97560c5632d6" />

[Nx](https://nx.dev/) là một **smart build system** và **monorepo tool** dành cho JavaScript/TypeScript ecosystem.  
Nó giúp các team tổ chức code trong **monorepo** một cách tối ưu, cho phép quản lý nhiều ứng dụng (apps) và thư viện (libs) trong cùng một repository.

**Tóm gọn:** Nx là công cụ giúp **quản lý, build, test, lint, deploy** các dự án trong monorepo nhanh và hiệu quả.

---

## 2️⃣ Tại sao nên dùng Nx cho Microservice?

Trong dự án Microservice, chúng ta có nhiều service độc lập: `user-service`, `invoice-service`, `mail-service`, ...  
Thay vì quản lý nhiều repo (multirepo), Nx cho phép gom vào **1 repo duy nhất (monorepo)**, với nhiều lợi ích:

- 🚀 **Quản lý tập trung**: Tất cả service + libs chung nằm trong cùng một repo.
- 🛠 **Tái sử dụng code dễ dàng**: DTOs, utils, validation, event-contracts có thể dùng lại.
- ⚡ **Build/test nhanh**: Nx có cơ chế **affected graph**, chỉ build/test phần code thay đổi.
- 🔍 **Code consistency**: Đồng bộ coding style, linting, testing cho toàn bộ hệ thống.
- 🧩 **Plugin ecosystem**: Nx hỗ trợ sẵn plugin cho NestJS, React, Next.js, Angular,...

---

## 3️⃣ Cấu trúc cơ bản trong Nx Monorepo

Khi khởi tạo bằng `npx create-nx-workspace`, cấu trúc dự án thường như sau:

```text
my-workspace/
├── apps/ # Chứa các ứng dụng (microservices hoặc frontend apps)
│ ├── user-service/
│ ├── invoice-service/
│ └── bff/
│
├── libs/ # Chứa các thư viện tái sử dụng
│ ├── dto/
│ ├── utils/
│ └── event-contracts/
│
├── nx.json # Cấu hình Nx
├── project.json # Cấu hình project apps/libs
├── package.json # Quản lý dependencies
└── tsconfig.base.json # Config chung cho TypeScript
```

---

## 4️⃣ Cách hoạt động của Nx

Nx theo dõi **dependency graph** của toàn bộ repo.  
Ví dụ khi thay đổi file trong `libs/dto`, Nx biết `user-service` và `invoice-service` bị ảnh hưởng → chỉ build/test các service này.

📌 Điều này giúp tiết kiệm thời gian CI/CD, thay vì build lại toàn bộ repo.

---

## 5️⃣ Lợi ích của Nx so với Monorepo thủ công

| Tiêu chí                  | Monorepo thủ công      | Monorepo với Nx             |
| ------------------------- | ---------------------- | --------------------------- |
| Quản lý dependencies      | Thủ công               | Tự động (dependency graph)  |
| Build/Test                | Toàn bộ project        | Chỉ phần ảnh hưởng          |
| CI/CD                     | Khó tối ưu             | Dễ tích hợp pipeline tối ưu |
| Code sharing              | Có thể, nhưng thủ công | Tích hợp sẵn                |
| Developer Experience (DX) | Bình thường            | Rất tốt (CLI + Plugin)      |

---

## 6️⃣ Demo Lệnh Cơ Bản Nx

- **Tạo service mới (NestJS):**
  ```bash
  nx g @nestjs/schematics:application user-service
  ```
- **Tạo library dùng chung:**
  ```bash
  nx g @nestjs/schematics:library dto
  ```
- **Chạy service:**
  ```bash
  nx serve user-service
  ```
- **Xem dependency graph:**
  ```bash
  nx graph
  ```

## 7️⃣ Kết luận

Nx là công cụ mạnh mẽ để quản lý **monorepo trong dự án microservice**.  
Nó không chỉ giúp tổ chức code gọn gàng, mà còn tối ưu hóa build/test/deploy, cải thiện hiệu suất CI/CD, và nâng cao trải nghiệm lập trình.

👉 Nếu bạn muốn phát triển hệ thống microservice với NestJS, hãy cân nhắc sử dụng Nx ngay từ đầu để tiết kiệm thời gian và công sức.
