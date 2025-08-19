# 📚 Tài Liệu Giảng Dạy: Khoá Học NestJS Microservices Thực Chiến: Từ Zero Đến Hero

[![course thumbnail](https://res.cloudinary.com/djvmkh4cs/image/upload/v1754804493/Course_thumbnail_ej2mgk.png "course thumbnail")](https://res.cloudinary.com/djvmkh4cs/image/upload/v1754804493/Course_thumbnail_ej2mgk.png "course thumbnail")

## 📋 Table of Contents

1. [🎯 Giới Thiệu Khóa Học](#-giới-thiệu-khóa-học)
2. [🏗️ Kiến Trúc Tổng Thể](#️-kiến-trúc-tổng-thể)
3. [💳 Stripe Payment Integration](#-stripe-payment-integration)
4. [📊 Centralized Logging Architecture](#-centralized-logging-architecture)
5. [🧩 Phân Tích Từng Microservice](#-phân-tích-từng-microservice)
6. [🔧 Shared Libraries Analysis](#-shared-libraries-analysis)
7. [🔄 Communication Patterns](#-communication-patterns)
8. [📈 Business Flow Analysis](#-business-flow-analysis)
9. [🏛️ Architectural Patterns](#️-architectural-patterns)
10. [🛠️ Deployment & Docker](#️-deployment--docker)
11. [🔴 Redis Cache Implementation](#-redis-cache-implementation)
12. [🧪 Bài Tập Thực Hành](#-bài-tập-thực-hành)
13. [🚀 Advanced Topics](#-advanced-topics)
14. [📚 Tài Liệu Tham Khảo](#-tài-liệu-tham-khảo)

---

## 🎯 Giới Thiệu Khóa Học

Chào mừng các bạn đến với khóa học **"Khoá Học NestJS Microservices Thực Chiến: Từ Zero Đến Hero"**. Khóa học này sẽ hướng dẫn các bạn phân tích và hiểu sâu một hệ thống thực tế được xây dựng bằng **NestJS**, **MongoDB**, **Kafka**, **Keycloak**, **Redis**, **Stripe**, **Docker** và **Nx Monorepo**.

### 🎓 Đối Tượng Học Viên
- Backend Developer muốn nâng cao kỹ năng với NestJS Microservices
- Fullstack Developer cần hiểu và triển khai kiến trúc microservices trong thực tế
- Sinh viên / Lập trình viên muốn học các công nghệ như Kafka, Keycloak, Redis, Stripe, Docker
- Người đang tìm hiểu Event-Driven Architecture và Saga Pattern
- Developer muốn triển khai hệ thống production-ready với logging & monitoring chuyên nghiệp
- Ai yêu thích học qua dự án thực chiến thay vì lý thuyết thuần túy

### 🏆 Mục Tiêu Học Tập
Sau khóa học, học viên sẽ:

1. Hiểu rõ kiến trúc **Microservices** và **Event-Driven Architecture**
2. Tổ chức mã nguồn theo kiến trúc **Nx Monorepo** với pnpm
3. Nắm vững cách thiết kế và implement **API Gateway Pattern** (BFF)
4. Tích hợp **Stripe** để xử lý thanh toán trực tuyến an toàn với webhooks
5. Biết cách sử dụng **Kafka** cho async communication
6. Áp dụng được các **Design Patterns**: Repository, DI, Factory
7. Implement được **Error Handling**, **Logging**, **Validation** trong microservices
8. Thiết kế database schema với **MongoDB** và **Mongoose**
9. Tích hợp **Keycloak** cho authentication và authorization
10. Implement **Redis Cache Layer** cho performance optimization
11. Thiết lập dashboard giám sát bằng **Grafana + Loki + Promtail**
12. Container hóa và triển khai hệ thống với **Docker** và **Docker Compose**

### 🛠️ Yêu cầu hoặc điều kiện tiên quyết để tham gia khóa học
- Kiến thức cơ bản về JavaScript hoặc TypeScript
- Hiểu các khái niệm REST API và HTTP
- Có kinh nghiệm với Node.js (Express.js hoặc NestJS cơ bản là một lợi thế)
- Kiến thức cơ bản về MongoDB hoặc cơ sở dữ liệu bất kỳ
- Biết sử dụng Docker ở mức cơ bản (pull, run container)
- Môi trường phát triển đã cài đặt: **Node.js v18+**, **pnpm**, **Docker Desktop**
- Tinh thần sẵn sàng học các công nghệ mới và thực hành trên dự án thực tế

---

## 🏗️ Kiến Trúc Tổng Thể

### 1.1 Kiến Trúc Tổng Thể

Hệ thống được thiết kế theo mô hình **Microservices Architecture** với **Nx Monorepo**, bao gồm:

```
📦 E-Invoice System (Nx Monorepo)
├── 🌐 BFF (Backend for Frontend) - Port 3000 (HTTP REST API)
├── 📄 Invoice Service - TCP Microservice
├── 📁 Media Service - TCP Microservice
├── 📄 PDF Generator Service - TCP Microservice
├── 📧 Mail Service - Kafka Consumer + TCP Client
├── 👤 User Access Service - TCP Microservice
├── 🔐 Authorizer Service - gRPC Microservice
├── 💳 Payment Service - TCP Microservice (Stripe Integration)
├── 🗄️ MongoDB - Port 27017
├── 📨 Kafka - Port 9092
├── 🔑 Keycloak - Port 8180 (Authentication Server)
├── 🔴 Redis - Port 6379 (Cache Store)
├── 📊 Grafana - Port 3001 (Monitoring Dashboard)
├── 📋 Loki - Port 3100 (Log Aggregation Server)
└── 📡 Promtail - Log Collection Agent
```

### 1.2 Technology Stack (Updated)

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Framework** | NestJS | ^11.1.4 | Microservices framework |
| **Language** | TypeScript | ~5.8.3 | Type-safe development |
| **Package Manager** | pnpm | Latest | Fast, efficient package management |
| **Monorepo** | Nx | 21.2.4 | Code organization and build system |
| **Database** | MongoDB + Mongoose | ^8.16.4 | Document database |
| **Message Queue** | Kafka (kafkajs) | ^2.2.4 | Event-driven communication |
| **Authentication** | Keycloak | 25.0.0 | Identity & Access Management |
| **Cache Store** | Redis + @keyv/redis | ^5.1.0 | Performance optimization |
| **File Storage** | Cloudinary | ^2.7.0 | Media file storage |
| **PDF Generation** | Puppeteer + EJS | ^24.15.0 | PDF creation |
| **Email** | Nodemailer | ^7.0.5 | Email delivery |
| **Payment** | Stripe | ^18.4.0 | Payment processing |
| **Containerization** | Docker + Docker Compose | Latest | Deployment |
| **Monitoring** | Grafana | Latest | Dashboard & Visualization |
| **Log Aggregation** | Loki | Latest | Centralized log storage |
| **Log Collection** | Promtail | Latest | Docker container log shipping |
| **Rate Limiting** | @nestjs/throttler | ^6.4.0 | API protection |
| **API Documentation** | @nestjs/swagger | ^11.2.0 | Swagger UI |
| **Testing** | Jest | ^30.0.4 | Unit and integration testing |
| **Code Quality** | ESLint + Prettier | Latest | Code formatting and linting |
| **Git Hooks** | Husky + lint-staged | Latest | Pre-commit hooks |

### 1.3 Sơ Đồ Tổng Thể Hệ Thống

```mermaid
---
config:
  theme: mc
  look: neo
  layout: dagre
---
flowchart TB
    Client["🌐 Client/Frontend"] --> BFF["🚪 BFF Service<br>:3000 (HTTP)"]
    BFF -- Guard Check --> UserGuard["🛡️ UserGuard<br>(Redis Cache Layer)"]
    UserGuard -- gRPC: Authentication --> Auth["🔐 Authorizer<br>(gRPC Service)"]
    BFF -- TCP: CRUD Invoice --> Invoice["📄 Invoice Service<br>(TCP Microservice)"]
    BFF -- TCP: User Management --> UserAccess["👤 User Access<br>(TCP Microservice)"]
    BFF -- HTTP: Webhook --> Payment["💳 Payment Service<br>(Stripe Integration)"]
    Invoice -- TCP: Generate PDF --> PDF["📄 PDF Generator<br>(TCP Microservice)"]
    Invoice -- TCP: Upload File --> Media["📁 Media Service<br>(TCP Microservice)"]
    Invoice -- TCP: Payment Processing --> Payment
    Invoice -. "📨 Event: invoice.sent" .-> Kafka(("🔄 Kafka<br>:9092"))
    Kafka -. 📨 Consume Events .-> Mail["📧 Mail Service<br>(Kafka Consumer)"]
    Invoice -- Read/Write --> MongoDB[("🗄️ MongoDB<br>:27017")]
    UserAccess -- Read/Write --> MongoDB
    UserGuard -- Token Cache --> Redis["🔴 Redis<br>:6379"]
    Media -- Upload Files --> Cloudinary["☁️ Cloudinary"]
    PDF -- HTML to PDF --> Puppeteer["🎭 Puppeteer Engine"]
    Mail -- Send Email --> SMTP["📮 SMTP Server"]
    Auth -- User Management --> Keycloak["🔑 Keycloak<br>:8180"]
    Payment -- Payment Processing --> Stripe["💳 Stripe<br>(Payment Gateway)"]
    BFF -. Container Logs .-> Promtail["📡 Promtail<br>(Log Agent)"]
    Invoice -. Container Logs .-> Promtail
    UserAccess -. Container Logs .-> Promtail
    Mail -. Container Logs .-> Promtail
    Payment -. Container Logs .-> Promtail
    Promtail -- Ship Logs --> Loki["📋 Loki<br>:3100"]
    Loki -- Query Logs --> Grafana["📊 Grafana<br>:3001"]
     Client:::externalBox
     BFF:::serviceBox
     UserGuard:::cacheBox
     Auth:::serviceBox
     Invoice:::serviceBox
     UserAccess:::serviceBox
     Payment:::serviceBox
     PDF:::serviceBox
     Media:::serviceBox
     Mail:::serviceBox
     Kafka:::eventBox
     MongoDB:::dbBox
     Redis:::cacheBox
     Cloudinary:::externalBox
     Puppeteer:::externalBox
     SMTP:::externalBox
     Keycloak:::externalBox
     Stripe:::externalBox
     Promtail:::serviceBox
     Loki:::serviceBox
     Grafana:::serviceBox
    classDef serviceBox fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef dbBox fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef externalBox fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef eventBox fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef cacheBox fill:#ffebee,stroke:#c62828,stroke-width:2px
    classDef paymentBox fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
```

### 1.4 Service Communication Matrix

| From Service | To Service | Protocol | Purpose | Response Time |
|--------------|------------|----------|---------|---------------|
| **BFF** → Invoice | TCP | CRUD operations | Synchronous |
| **BFF** → User Access | TCP | User management | Synchronous |
| **BFF** → Authorizer | gRPC | Authentication | Synchronous |
| **BFF** → Payment | HTTP | Webhook handling | Asynchronous |
| **Invoice** → PDF Generator | TCP | Generate PDF | Synchronous |
| **Invoice** → Media | TCP | Upload files | Synchronous |
| **Invoice** → Payment | TCP | Create checkout session | Synchronous |
| **Payment** → Stripe | HTTP | Payment processing | Asynchronous |
| **Invoice** → Kafka | Event | Async notifications | Fire & Forget |
| **Mail** → Invoice | TCP | Get invoice data | Synchronous |
| **Mail** ← Kafka | Event | Consume events | Async |

---

## 💳 Stripe Payment Integration

### 1.5.1 Tổng Quan Payment Flow

Hệ thống tích hợp **Stripe** để xử lý thanh toán với flow hoàn chỉnh:

```mermaid
graph LR
    %% Invoice Flow
    A[📄 Create Invoice] --> B[📤 Send Invoice]
    B --> C[💳 Create Payment Link]
    C --> D[📧 Send Email with Payment Link]
    D --> E[👤 Customer Clicks Link]
    E --> F[💳 Stripe Checkout]
    F --> G[✅ Payment Success]
    G --> H[📨 Stripe Webhook]
    H --> I[🔄 Update Invoice Status]
    
    %% Status Transitions
    J[📊 Invoice Status Flow]
    J --> K[CREATED]
    K --> L[SENT]
    L --> M[PAID]
    
    %% Styling
    classDef flowBox fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef statusBox fill:#fff3e0,stroke:#e65100,stroke-width:2px
    
    class A,B,C,D,E,F,G,H,I flowBox
    class J,K,L,M statusBox
```

### 1.5.2 Payment Service Architecture

**📍 Vai trò**: Xử lý thanh toán và webhook handling

```typescript
// apps/invoice/src/app/modules/payment/services/stripe.service.ts
@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_CONFIG.SECRET_KEY'), {
      apiVersion: '2025-07-30.basil',
    });
  }

  async createCheckoutSession(data: CreateCheckoutSessionRequest) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: data.lineItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      customer_email: data.clientEmail,
      success_url: `${this.configService.get('STRIPE_CONFIG.SUCCESS_URL')}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: this.configService.get('STRIPE_CONFIG.CANCEL_URL'),
      metadata: {
        invoiceId: data.invoiceId,
      },
    });

    return {
      url: session.url,
      sessionId: session.id,
    };
  }

  verifyWebhookSignature(body: Buffer, signature: string) {
    return this.stripe.webhooks.constructEvent(
      body, 
      signature, 
      this.configService.get('STRIPE_CONFIG.WEBHOOK_SECRET')
    );
  }
}
```

### 1.5.3 Webhook Processing

**📍 Vai trò**: Xử lý webhook từ Stripe để cập nhật trạng thái invoice

```typescript
// apps/invoice/src/app/modules/payment/services/payment.service.ts
@Injectable()
export class PaymentService {
  async stripeWebhook(data: StripeWebhookTcpReq) {
    const { rawBodyBase64, signature } = data;

    const event = this.stripeService.verifyWebhookSignature(
      Buffer.from(rawBodyBase64, 'base64'), 
      signature
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.invoiceId) {
          await this.invoiceService.paySuccess(session.metadata.invoiceId);
        }
        break;
      }
      default:
        this.logger.log(`Unhandled event type ${event.type}`);
    }
  }
}
```

### 1.5.4 Payment Configuration

**📍 Vai trò**: Cấu hình Stripe cho development và production

```typescript
// libs/configuration/src/lib/stripe.config.ts
export class StripeConfiguration {
  @IsString()
  @IsNotEmpty()
  SECRET_KEY: string;

  @IsString()
  @IsNotEmpty()
  WEBHOOK_SECRET: string;

  @IsString()
  @IsNotEmpty()
  SUCCESS_URL: string;

  @IsString()
  @IsNotEmpty()
  CANCEL_URL: string;
}
```

**🔧 Environment Variables:**
```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_SUCCESS_URL=http://localhost:3000/payment/success
STRIPE_CANCEL_URL=http://localhost:3000/payment/cancel
```

---

## 📊 Centralized Logging Architecture

### 2.1 Tổng Quan Logging Stack

Hệ thống sử dụng **Grafana + Loki + Promtail** stack để thu thập và quản lý log tập trung:

```mermaid
graph TB
    %% Microservices Layer
    BFF["🌐 BFF Service<br/>:3000"]
    Invoice["📄 Invoice Service"]
    Mail["📧 Mail Service"]
    UserAccess["👤 User Access Service"]
    
    %% Docker Layer
    Docker["🐳 Docker Engine<br/>/var/lib/docker/containers"]
    
    %% Logging Stack
    Promtail["📡 Promtail<br/>Log Collection Agent"]
    Loki["📋 Loki<br/>:3100<br/>Log Aggregation Server"]
    Grafana["📊 Grafana<br/>:3001<br/>Dashboard & Visualization"]
    
    %% Log Flow
    BFF -->|"Container Logs"| Docker
    Invoice -->|"Container Logs"| Docker
    Mail -->|"Container Logs"| Docker
    UserAccess -->|"Container Logs"| Docker
    Payment -->|"Container Logs"| Docker
    
    Docker -->|"File System"| Promtail
    Promtail -->|"HTTP Push API"| Loki
    Loki -->|"LogQL Queries"| Grafana
    
    %% User Access
    User["👨‍💻 Developer/DevOps"] -->|"Web UI"| Grafana
    User -->|"Direct API"| Loki
    
    %% Styling
    classDef serviceBox fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef logBox fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef userBox fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    
    class BFF,Invoice,Mail,UserAccess,Payment serviceBox
    class Docker,Promtail,Loki,Grafana logBox
    class User userBox
```

### 2.2 Promtail Configuration (Thực Tế)

**📍 Vai trò**: Thu thập logs từ Docker containers và gửi đến Loki

```yaml
# docker/promtail-config.yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: docker
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s

    pipeline_stages:
      - docker: {}

    relabel_configs:
      # Gán app label từ tên container
      - source_labels: [__meta_docker_container_name]
        regex: /(.+)
        target_label: app
        replacement: $1

      # Lọc chỉ invoice và bff containers
      - source_labels: [__meta_docker_container_name]
        regex: /invoice.*
        action: keep
      - source_labels: [__meta_docker_container_name]
        regex: /bff.*
        action: keep
```

### 2.3 Loki Configuration (Thực Tế)

**📍 Vai trò**: Log aggregation server với efficient storage

```yaml
# docker/loki-config.yaml
auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096
  log_level: debug

common:
  instance_addr: 127.0.0.1
  path_prefix: /tmp/loki
  storage:
    filesystem:
      chunks_directory: /tmp/loki/chunks
      rules_directory: /tmp/loki/rules
  replication_factor: 1

schema_config:
  configs:
    - from: 2020-10-24
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

pattern_ingester:
  enabled: true
  metric_aggregation:
    loki_address: localhost:3100
```

### 2.4 Grafana Integration

**📍 Vai trò**: Dashboard và visualization cho logs

#### 2.4.1 Loki Data Source Setup
```json
{
  "name": "Loki",
  "type": "loki",
  "url": "http://loki:3100",
  "access": "proxy",
  "isDefault": true
}
```

#### 2.4.2 LogQL Query Examples
```logql
# Tất cả logs từ BFF service
{app="bff"}

# Error logs từ Invoice service
{app="invoice"} |= "ERROR"

# HTTP requests với response time > 1000ms
{app="bff"} | json | response_time > 1000

# Process ID tracking across services
{app=~"bff|invoice"} |= "process"

# Kafka event processing logs
{app="mail"} |= "invoice.sent"
```

---

## 🔴 Redis Cache Implementation

### 11.1 Tổng Quan Redis Cache

Hệ thống đã implement **Redis Cache Layer** để tối ưu hóa performance, đặc biệt cho **authentication process**. Cache được sử dụng chính trong **UserGuard** để tránh việc verify token với Keycloak liên tục.

#### 🎯 Lý Do Implement Cache
```typescript
// Vấn đề: Mỗi request đều phải verify token với Keycloak
// ❌ Without Cache
BFF Request → UserGuard → Keycloak gRPC → Verify Token → Return UserData

// ✅ With Redis Cache  
BFF Request → UserGuard → Check Redis → Return Cached UserData (if exists)
                      ↘ Cache Miss → Keycloak gRPC → Cache Result → Return UserData
```

### 11.2 Architecture & Configuration

#### 🔧 Redis Configuration
```typescript
// libs/configuration/src/lib/redis.config.ts
export class RedisConfiguration {
  HOST: string;        // Default: 'redis'
  PORT: number;        // Default: 6379  
  TTL: number;         // Default: 30 * 60000 (30 minutes)
}

export const RedisProvider = CacheModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    stores: [
      createKeyv(`redis://${configService.get('REDIS_CONFIG.HOST')}:${configService.get('REDIS_CONFIG.PORT')}`),
    ],
    ttl: configService.get('REDIS_CONFIG.TTL'),
  }),
});
```

#### 🏗️ Integration trong BFF
```typescript
// apps/bff/src/app/app.module.ts
@Module({
  imports: [
    RedisProvider,  // ← Redis Cache Module
    // ... other imports
  ],
  providers: [
    { provide: APP_GUARD, useClass: UserGuard }, // ← Guard sử dụng cache
  ],
})
export class AppModule {}
```

### 11.3 UserGuard Cache Implementation

#### 🛡️ Cache Strategy trong UserGuard
```typescript
// libs/guard/src/lib/user.guard.ts
@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    // ... other dependencies
  ) {}

  // 1. Generate secure cache key
  generateTokenCacheKey(token: string): string {
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    return `user-token:${hash}`;
  }

  // 2. Cache-first verification strategy
  private verifyUserToken(req: any): Observable<boolean> {
    const token = getAccessToken(req);
    const cacheKey = this.generateTokenCacheKey(token);

    return new Observable<boolean>((observer) => {
      // Check cache first
      this.cacheManager.get<AuthorizedResult>(cacheKey).then((cached) => {
        if (cached) {
          // ✅ Cache HIT - Use cached data
          setUserData(req, cached);
          observer.next(true);
          observer.complete();
        } else {
          // ❌ Cache MISS - Verify with Keycloak
          this.keycloakService
            .verifyUserToken({ token, processID })
            .pipe(
              map(({ data, error }) => {
                if (!data?.valid) {
                  throw new UnauthorizedException(error);
                }

                setUserData(req, data);
                
                // Cache the result for 30 minutes
                this.cacheManager.set(cacheKey, data, 30 * 60 * 1000);

                observer.next(true);
                observer.complete();
              })
            )
            .subscribe();
        }
      });
    });
  }
}
```

### 11.4 Cache Flow Diagram

```mermaid
sequenceDiagram
    participant Client
    participant BFF
    participant UserGuard  
    participant Redis
    participant Keycloak

    Client->>BFF: HTTP Request with Token
    BFF->>UserGuard: canActivate()
    UserGuard->>UserGuard: generateTokenCacheKey(token)
    
    alt Cache HIT
        UserGuard->>Redis: get(cacheKey)
        Redis-->>UserGuard: cached userData
        UserGuard->>BFF: setUserData() & return true
        BFF-->>Client: Response with cached data
    else Cache MISS
        UserGuard->>Redis: get(cacheKey)
        Redis-->>UserGuard: null
        UserGuard->>Keycloak: verifyUserToken(gRPC)
        Keycloak-->>UserGuard: userData
        UserGuard->>Redis: set(cacheKey, userData, 30min)
        UserGuard->>BFF: setUserData() & return true
        BFF-->>Client: Response with fresh data
    end
```

### 11.5 Security Considerations

#### 🔐 Token Security
```typescript
// ✅ Security Best Practices
1. **Hash Token**: SHA256 hash thay vì lưu raw token
   - Tránh token leakage trong Redis logs
   - Key collision cực kỳ thấp

2. **TTL Management**: Auto-expire sau 30 phút
   - Tránh stale data
   - Sync với Keycloak token expiry

3. **Namespace Keys**: Prefix `user-token:` 
   - Tránh key collision với cache khác
   - Dễ dàng monitor và debug
```

#### 🎯 Cache Key Strategy
```typescript
// Cache Key Format: user-token:{sha256_hash}
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...";
const hash = crypto.createHash('sha256').update(token).digest('hex');
const cacheKey = `user-token:${hash}`;
// Result: "user-token:a1b2c3d4e5f6..."
```

### 11.6 Performance Metrics

#### 📊 Expected Performance Gains
```typescript
// Without Cache (mỗi request)
- Keycloak gRPC call: ~50-100ms
- Network latency: ~10-20ms  
- Total per request: ~60-120ms

// With Cache (cache hit)
- Redis get operation: ~1-5ms
- Performance gain: 90-95% faster
- Reduced load on Keycloak: Significant
```

---

## 🧪 Bài Tập Thực Hành

### Bài 1: Thêm Invoice Status Mới
**Mục tiêu**: Thêm status `CANCELLED` cho invoice

**Yêu cầu**:
1. Update `INVOICE_STATUS` enum
2. Implement `cancelById` method
3. Add business validation
4. Test với Swagger UI

**Code Template**:
```typescript
// libs/constants/src/lib/invoice.constant.ts
export enum INVOICE_STATUS {
  CREATED = 'created',
  SENT = 'sent',
  VERIFIED = 'verified',
  CANCELLED = 'cancelled', // TODO: Add this
}

// apps/invoice/src/app/modules/invoice/services/invoice.service.ts
async cancelById(id: string) {
  const invoice = await this.getById(id);
  
  // TODO: Add business validation
  if (invoice.status === INVOICE_STATUS.SENT) {
    throw new BadRequestException('Cannot cancel sent invoice');
  }
  
  return this.invoiceRepository.updateById(id, {
    status: INVOICE_STATUS.CANCELLED
  });
}
```

### Bài 2: Implement Notification Service
**Mục tiêu**: Tạo service mới để handle notifications

**Yêu cầu**:
1. Tạo Notification Service
2. Subscribe Kafka event `invoice.sent`
3. Gửi notification cho supervisor
4. Lưu notification history

### Bài 3: Add Request Validation
**Mục tiêu**: Enhance DTO validation

**Yêu cầu**:
1. Add custom validators
2. Implement business rule validation
3. Return detailed error messages
4. Test validation scenarios

### Bài 4: Implement Health Checks
**Mục tiêu**: Add health monitoring

**Yêu cầu**:
1. Add health check endpoints
2. Check database connectivity
3. Check Kafka connectivity
4. Return service status

### Bài 5: Centralized Logging Setup
**Mục tiêu**: Enable và configure Grafana + Loki + Promtail

**Yêu cầu**:
1. Uncomment logging services trong docker-compose.provider.yaml
2. Configure Grafana data source cho Loki
3. Tạo dashboard để monitor application logs
4. Setup log alerts cho error patterns

**Code Template**:
```bash
# Enable logging stack
docker-compose -f docker-compose.provider.yaml up -d grafana loki promtail

# Access Grafana
open http://localhost:3001  # admin/admin

# Add Loki data source
curl -X POST http://admin:admin@localhost:3001/api/datasources \
  -H "Content-Type: application/json" \
  -d '{"name":"Loki","type":"loki","url":"http://loki:3100","access":"proxy"}'
```

---

## 🚀 Advanced Topics

### 10.1 Authentication với Keycloak

```typescript
// User Guard Implementation
@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException();
    }
    
    // Verify JWT token with Keycloak
    return this.verifyKeycloakToken(token);
  }
}
```

### 10.2 Testing Strategies

```typescript
// Unit Test Example
describe('InvoiceService', () => {
  let service: InvoiceService;
  let repository: InvoiceRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        InvoiceService,
        {
          provide: InvoiceRepository,
          useValue: {
            create: jest.fn(),
            getById: jest.fn(),
            updateById: jest.fn(),
          },
        },
        {
          provide: TCP_SERVICES.PDF_GENERATOR_SERVICE,
          useValue: { send: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
    repository = module.get<InvoiceRepository>(InvoiceRepository);
  });

  it('should create invoice successfully', async () => {
    const mockInvoice = { id: '1', status: INVOICE_STATUS.CREATED };
    jest.spyOn(repository, 'create').mockResolvedValue(mockInvoice);

    const result = await service.create(createInvoiceDto);
    expect(result).toEqual(mockInvoice);
  });
});
```

### 10.3 Performance Optimization

```typescript
// Caching with Redis (Current Implementation)
@Injectable()
export class InvoiceService {
  @Cacheable('invoice', 300) // 5 minutes cache
  async getById(id: string) {
    return this.invoiceRepository.getById(id);
  }
}
```

---

## 📚 Tài Liệu Tham Khảo

### 11.1 Official Documentation
- [NestJS Documentation](https://docs.nestjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Kafka Documentation](https://kafka.apache.org/documentation/)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Docker Documentation](https://docs.docker.com/)
- [Stripe Documentation](https://stripe.com/docs)
- [Redis Documentation](https://redis.io/documentation)
- [Grafana Documentation](https://grafana.com/docs/)
- [Loki Documentation](https://grafana.com/docs/loki/)
- [Nx Documentation](https://nx.dev/)

### 11.2 Design Patterns
- [Microservices Patterns](https://microservices.io/patterns/)
- [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/)

### 11.3 Best Practices
- [12-Factor App](https://12factor.net/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

## 🎓 KẾT LUẬN

Hệ thống E-Invoice này là một ví dụ tuyệt vời về **Production-Ready Microservices Architecture**. Các điểm nổi bật:

### ✅ Strengths
1. **Well-structured**: Clear separation of concerns với Nx monorepo
2. **Scalable**: Each service can scale independently
3. **Maintainable**: Clean code với proper abstractions
4. **Observable**: Comprehensive logging và error handling
5. **Testable**: Dependency injection cho easy mocking
6. **Production-ready**: Docker containerization và proper configuration
7. **Performance Optimized**: Redis caching cho authentication
8. **Payment Ready**: Stripe integration với webhook handling
9. **Monitoring Ready**: Grafana + Loki + Promtail stack

### 🔄 Architecture Highlights
- **8 Microservices** với vai trò rõ ràng
- **Mixed Communication**: TCP (sync), gRPC (auth), Kafka (async)
- **Event-Driven**: Kafka cho decoupled communication
- **Authentication**: Keycloak integration với Redis cache layer
- **File Processing**: PDF generation và cloud storage
- **Performance Optimization**: Redis caching cho authentication tokens
- **Payment Processing**: Stripe integration với webhook handling
- **Centralized Logging**: Grafana + Loki + Promtail stack

### 🎯 Key Takeaways
- **Microservices** cần cân nhắc trade-offs giữa complexity và benefits
- **Event-Driven Architecture** giúp decouple services nhưng tăng complexity
- **Proper error handling** và **logging** rất quan trọng trong distributed systems
- **Configuration management** cần được centralized và environment-specific
- **Testing strategy** cần cover unit, integration và e2e tests
- **Performance optimization** với caching là critical cho production systems
- **Payment integration** cần proper webhook handling và security
- **Monitoring và observability** là essential cho production deployment

---

**Happy Learning! 🚀**

*Tài liệu này được cập nhật để phản ánh chính xác source code hiện tại. Mọi góp ý xin liên hệ để cải thiện chất lượng nội dung.*