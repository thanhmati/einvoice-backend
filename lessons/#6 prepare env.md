# Lesson: Chuẩn Bị Môi Trường Phát Triển Dự Án Thực Chiến

Trước khi bắt đầu coding, học viên cần cài đặt đầy đủ các công cụ cần thiết để đảm bảo dự án chạy đúng và quá trình phát triển thuận lợi.

---

## 1️⃣ Node.js v22

**Công dụng:** Chạy ứng dụng backend bằng JavaScript/TypeScript, sử dụng NestJS.

**Cài đặt:**

1. Truy cập: [https://nodejs.org/en/download](https://nodejs.org/en/download)
2. Chọn phiên bản **LTS v22.x** (ổn định cho sản xuất).
3. Cài đặt theo hướng dẫn hệ điều hành:
   - **Windows:** Chạy file `.msi` → Next → Accept → Install.
   - **macOS:** Dùng file `.pkg` hoặc cài qua Homebrew:  
     ```bash
     brew install node@22
     ```
4. Kiểm tra sau khi cài:
   ```bash
   node -v
   npm -v
   ```
   
## 2️⃣ pnpm (Package Manager)

**Công dụng:** Quản lý package thay cho npm/yarn, tối ưu dung lượng node_modules và tốc độ cài đặt, đặc biệt hữu ích khi làm việc với **monorepo (Nx)**.

**Cài đặt:**

1. Sau khi cài Node.js, dùng npm để cài pnpm toàn cục:  
   ```bash
   npm install -g pnpm
   ```
2. Kiểm tra phiên bản:  
   ```bash
   pnpm -v
   ```
3. (Tùy chọn) Với macOS/Linux, có thể cài qua Homebrew:
   ```bash
   brew install pnpm
   ```    
   
## 3️⃣ Visual Studio Code (VSCode)

**Công dụng:** Trình soạn thảo code mạnh mẽ, hỗ trợ nhiều extension cho Node.js và NestJS.

**Cài đặt:**

1. Truy cập: [https://code.visualstudio.com/download](https://code.visualstudio.com/download)
2. Tải và cài đặt bản phù hợp với hệ điều hành.
3. Gợi ý extension nên cài:
   - **ESLint** (kiểm tra code style)
   - **Prettier** (format code tự động)
   - **NestJS Snippets**
   - **MongoDB for VSCode**

---

## 4️⃣ MongoDB Compass

**Công dụng:** Giao diện đồ họa để quản lý cơ sở dữ liệu MongoDB.

**Cài đặt:**

1. Truy cập: [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)
2. Chọn phiên bản phù hợp (Windows/macOS/Linux).
3. Cài đặt và mở ứng dụng.
4. Kết nối với MongoDB:
   - Local: `mongodb://localhost:27017`
   - Remote: Dùng connection string từ MongoDB Atlas hoặc server.

## 5️⃣ Docker

**Công dụng:** Chạy môi trường phát triển, cơ sở dữ liệu, hoặc các dịch vụ phụ trợ trong container mà không cần cài trực tiếp lên máy.

**Cài đặt:**

1. Truy cập: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Tải và cài đặt **Docker Desktop**.
3. Khởi động Docker và đảm bảo biểu tượng Docker xuất hiện trên thanh taskbar/menu bar.
4. Kiểm tra bằng lệnh:
   ```bash
   docker --version
   ```
## 6️⃣ Postman

**Công dụng:** Công cụ test API, gửi request đến backend và xem response.

**Cài đặt:**

1. Truy cập: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
2. Chọn bản phù hợp với hệ điều hành.
3. Đăng nhập hoặc tạo tài khoản miễn phí để đồng bộ request.
4. Tạo collection để lưu các API trong dự án.
