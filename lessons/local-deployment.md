# Hướng Dẫn Chi Tiết: Local Deployment

Tài liệu này cung cấp hướng dẫn toàn diện để triển khai hệ thống E-Invoice trên môi trường local, bao gồm việc chuẩn bị hạ tầng, đóng gói ứng dụng (Dockerize) và mô phỏng môi trường Production.

## 1. Yêu Cầu Tiên Quyết (Prerequisites)

Đảm bảo bạn đã cài đặt các công cụ sau:

- **Docker Desktop**: Runtime để chạy container.
- **Node.js (v20+)**: Môi trường chạy JavaScript/TypeScript.
- **pnpm**: Package manager (`npm install -g pnpm`).
- **Nx CLI**: Quản lý Monorepo (`npm install -g nx`).

---

## 2. Chuẩn Bị Hạ Tầng (Infrastructure)

Trước khi chạy ứng dụng, chúng ta cần khởi tạo các dịch vụ nền tảng (Database, Cache, Queue...). File `docker-compose.provider.yaml` chịu trách nhiệm này.

### Khởi động hạ tầng:

```bash
# Bật toàn bộ services nền tảng
docker compose -f docker-compose.provider.yaml up -d
```

### Các thành phần chính:

| Service      | Image           | Port (Host) | Vai trò           |
| :----------- | :-------------- | :---------- | :---------------- |
| **Postgres** | `postgres`      | `5432`      | Main Database     |
| **MongoDB**  | `mongo`         | `27017`     | NoSQL Database    |
| **Redis**    | `redis`         | `6379`      | Cache & Queue     |
| **Kafka**    | `bitnami/kafka` | `29092`     | Message Broker    |
| **Keycloak** | `keycloak`      | `8180`      | Identity Provider |

> **Lưu ý:** Nếu bạn gặp lỗi port conflict, hãy tắt các service tương ứng đang chạy trên máy (như local postgres) hoặc đổi port trong file yaml.

---

## 3. Quy Trình Đóng Gói & Triển Khai Ứng Dụng (Docker Strategy)

Phần này hướng dẫn cách build image và chạy ứng dụng bằng Docker Compose, mô phỏng giống hệt môi trường Production.

### Bước 1: Chuẩn Bị Môi Trường (.env)

Trong môi trường Docker, các service gọi nhau qua **Service Name** thay vì `localhost`. Bạn cần tạo file `.env.prod` để cấu hình đúng host.

**Tạo file `.env.prod`:**

```properties
# App Config
NODE_ENV=production
PORT=3000

# Database Connection (Chú ý Host là tên service trong docker network)
TYPEORM_HOST=postgres
MONGODB_URI=mongodb://root:password@mongodb:27017/
REDIS_HOST=redis
KAFKA_HOST=kafka
KAFKA_PORT=9092

# Observability
LOKI_HOST=loki:3100
```

### Bước 2: Build Source Code

Do Dockerfile của chúng ta copy từ thư mục `dist`, bạn cần build source code TypeScript sang JavaScript trước.

```bash
# Ví dụ build app BFF
nx build bff --skip-nx-cache

# Hoặc build toàn bộ (nếu máy mạnh)
nx run-many -t build
```

### Bước 3: Build Docker Image

#### Cấu trúc `Dockerfile`

File `apps/bff/Dockerfile` tiêu chuẩn:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy artifact đã build ở Bước 2
COPY dist/apps/bff ./

# Cài đặt pnpm và dependencies
RUN npm install -g pnpm
RUN if [ -f package.json ]; then pnpm install --prod --frozen-lockfile; fi
RUN pnpm install tslib

CMD ["node", "main.js"]
```

#### Lệnh Build Image

Sử dụng tag `:local` để phân biệt với image trên registry.

```bash
# Đứng từ root folder
docker build -f apps/bff/Dockerfile -t bff:local .
```

_(Lặp lại bước này cho các service khác như: invoice, product, user-access...)_

### Bước 4: Viết File `docker-compose.local.yml`

File này định nghĩa cách chạy các container ứng dụng và kết nối chúng vào mạng hạ tầng.

**Nội dung mẫu `docker-compose.local.yml`:**

```yaml
name: einvoice-services-local

services:
  # Service: BFF
  bff:
    image: bff:local # Sử dụng image vừa build
    restart: unless-stopped
    ports:
      - '3301:3300' # Map port host:container
    environment:
      - NODE_ENV=production
    env_file:
      - .env.prod # Đọc config từ file .env.prod
    networks:
      - einvoice-nw # Kết nối vào mạng chung

  # Service: Invoice
  invoice:
    image: invoice:local
    restart: unless-stopped
    env_file:
      - .env.prod
    networks:
      - einvoice-nw

  # Thêm các service khác tương tự...

# Kết nối mạng external (đã tạo bởi docker-compose.provider.yaml)
networks:
  einvoice-nw:
    external: true
```

### Bước 5: Khởi Động Ứng Dụng

Sau khi image, env và compose file đã sẵn sàng:

```bash
docker compose -f docker-compose.local.yml up -d
```

**Verify:**

- `docker ps`: Kiểm tra xem container có status `Up` không.
- `docker logs -f <container_id>`: Xem log nếu container bị Exited.

---

## 4. Phương Pháp Hybrid (Development Mode)

Trong quá trình dev, bạn không muốn rebuild image liên tục. Bạn có thể kết hợp:

- **Infrastructure**: Chạy bằng Docker (`docker-compose.provider.yaml`).
- **Application**: Chạy trực tiếp bằng Node.js (`nx serve`).

```bash
# 1. Bật hạ tầng
docker compose -f docker-compose.provider.yaml up -d

# 2. Chạy app (Hot reload enabled)
nx serve bff
```

> **Lưu ý:** Khi chạy mode này, App kết nối DB qua `localhost` nên bạn cần dùng file `.env` thường (không phải `.env.prod`).

---

## 5. Tổng Kết Architecture

```mermaid
graph TD
    subgraph Host_Machine
        subgraph Infrastructure
            Postgres
            Redis
            Kafka
        end

        subgraph Docker_Network
            API_Gateway["BFF Service <br> (Docker Container)"]
            Invoice["Invoice Service <br> (Docker Container)"]
        end

        Client[Browser / Postman] -->|Port 3301| API_Gateway
        API_Gateway -->|Internal Net| Invoice
        API_Gateway -->|Internal Net| Redis
        Invoice -->|Internal Net| Postgres
    end

    style Infrastructure fill:#eeeeee,stroke:#333
    style Docker_Network fill:#e3f2fd,stroke:#2196f3
```
