# 📚 Tài Liệu Giảng Dạy: Khoá Học NestJS Microservices Thực Chiến: Từ Zero Đến Hero

[![course thumbnail](https://res.cloudinary.com/djvmkh4cs/image/upload/v1754804493/Course_thumbnail_ej2mgk.png "course thumbnail")](https://res.cloudinary.com/djvmkh4cs/image/upload/v1754804493/Course_thumbnail_ej2mgk.png "course thumbnail")

## 🎯 Giới Thiệu Khóa Học

Chào mừng các bạn đến với khóa học **"Khoá Học NestJS Microservices Thực Chiến: Từ Zero Đến Hero"**. Khóa học này sẽ hướng dẫn các bạn phân tích và hiểu sâu một hệ thống thực tế được xây dựng bằng **NestJS**, **MongoDB**, **Kafka**, **Keycloak** và **Docker**.

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
2. Tổ chức mã nguồn theo kiến trúc monorepo với Nx
3. Nắm vững cách thiết kế và implement **API Gateway Pattern** (BFF)
4. Tích hợp Stripe để xử lý thanh toán trực tuyến an toàn
5. Biết cách sử dụng **Kafka** cho async communication
6. Áp dụng được các **Design Patterns**: Repository, DI, Factory
7. Implement được **Error Handling**, **Logging**, **Validation** trong microservices
8. Thiết kế database schema với **MongoDB** và **Mongoose**
9. Tích hợp **Keycloak** cho authentication và authorization
10. Thiết lập dashboard giám sát bằng Grafana
11. Tập trung và quản lý log với Loki, thu thập log container bằng Promtail
12. Container hóa và triển khai hệ thống với Docker và Docker Compose

### 🛠️ Yêu cầu hoặc điều kiện tiên quyết để tham gia khóa học
- Kiến thức cơ bản về JavaScript hoặc TypeScript
- Hiểu các khái niệm REST API và HTTP
- Có kinh nghiệm với Node.js (Express.js hoặc NestJS cơ bản là một lợi thế)
- Kiến thức cơ bản về MongoDB hoặc cơ sở dữ liệu bất kỳ
- Biết sử dụng Docker ở mức cơ bản (pull, run container)
- Môi trường phát triển đã cài đặt: Node.js, npm hoặc yarn, Docker Desktop
- Tinh thần sẵn sàng học các công nghệ mới và thực hành trên dự án thực tế
## 📌 Tương tác với Giảng viên

Khóa học không chỉ dừng lại ở video lý thuyết – bạn sẽ luôn có **sự đồng hành trực tiếp từ giảng viên** trong suốt quá trình học.

### 💬 Hỏi – Đáp nhanh chóng
- Đặt câu hỏi trực tiếp bên dưới mỗi bài học hoặc trong mục Q&A.
- Nhận phản hồi nhanh chóng và giải thích rõ ràng từ khái niệm cơ bản đến kỹ thuật nâng cao.

### 🛠 Hỗ trợ xử lý lỗi
- Mô tả vấn đề và đính kèm code khi gặp lỗi.
- Giảng viên sẽ hướng dẫn từng bước để khắc phục và giải thích nguyên nhân.

### 🤝 Trao đổi cùng cộng đồng học viên
- Tham gia **group riêng** để thảo luận, chia sẻ kinh nghiệm và học hỏi lẫn nhau.
- Kết nối với các học viên khác đang làm trong ngành.
  
### 🌐 Liên hệ & Kết nối
Nếu bạn cần hỗ trợ hoặc muốn kết nối thêm ngoài khóa học, có thể liên hệ qua:

- 📧 **Email:** [dotanthanhvlog@gmail.com](mailto:dotanthanhvlog@gmail.com)  
- 💼 **LinkedIn:** [https://www.linkedin.com/in/thanh270600/](https://www.linkedin.com/in/thanh270600/)  
- 🐙 **GitHub:** [https://github.com/thanhmati](https://github.com/thanhmati)  
- 📺 **YouTube:** [https://www.youtube.com/@laptrinhfullstack](https://www.youtube.com/@laptrinhfullstack)  
- 💬 **Facebook Group:** [https://www.facebook.com/groups/ltfullstack](https://www.facebook.com/groups/ltfullstack)  

---

> 💡 **Phương châm:** *“Học thật – Làm thật”*  
Giảng viên sẽ luôn theo sát để bạn không chỉ **hoàn thành khóa học**, mà còn **tự tin triển khai dự án thực tế**.

---

## 🏗️ PHẦN 1: TỔNG QUAN KIẾN TRÚC

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
├── 🗄️ MongoDB - Port 27017
├── 📨 Kafka - Port 9092
├── 🔑 Keycloak - Port 8180 (Authentication Server)
├── 🔴 Redis - Port 6379 (Cache Store)
├── 📊 Grafana - Port 3001 (Monitoring Dashboard)
├── 📋 Loki - Port 3100 (Log Aggregation Server)
└── 📡 Promtail - Log Collection Agent
```

### 1.2 Sơ Đồ Tổng Thể Hệ Thống

```mermaid
---
config:
  theme: mc
  look: neo
  layout: dagre
---
flowchart TB
    Client["🌐 Client/Frontend"] --> BFF["🚪 BFF Service<br>:3000 (HTTP)"]
    BFF -- Guard Check --> UserGuard["🛡️ UserGuard<br>(Cache Layer)"]
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

### 1.3 Chi Tiết Flow Dữ Liệu Chính

```mermaid
sequenceDiagram
    participant C as 🌐 Client
    participant B as 🚪 BFF
    participant I as 📄 Invoice Service
    participant P as 📄 PDF Generator
    participant M as 📁 Media Service
    participant K as 🔄 Kafka
    participant Mail as 📧 Mail Service
    participant DB as 🗄️ MongoDB
    participant Cloud as ☁️ Cloudinary
    participant SMTP as 📮 SMTP
    participant Pay as 💳 Payment Service
    participant Stripe as 💳 Stripe

    Note over C,Stripe: 🔄 COMPLETE INVOICE & PAYMENT WORKFLOW

    %% 1. Create Invoice
    rect rgb(240, 248, 255)
        Note over C,DB: 📝 Phase 1: Create Invoice
        C->>B: POST /api/v1/invoice
        B->>I: TCP: CREATE_INVOICE
        I->>DB: INSERT invoice (status: CREATED)
        DB-->>I: Invoice saved with ID
        I-->>B: Invoice ID
        B-->>C: ✅ Invoice created successfully
    end

    %% 2. Send Invoice (Complex Flow)
    rect rgb(255, 248, 240)
        Note over C,SMTP: 📤 Phase 2: Send Invoice (Trigger PDF, Email & Payment)
        C->>B: POST /api/v1/invoice/:id/send
        B->>I: TCP: SEND_INVOICE
        
        %% PDF Generation
        Note over I,P: 🎨 PDF Generation Sub-flow
        I->>P: TCP: CREATE_INVOICE_PDF
        P->>P: Render EJS template with invoice data
        P->>P: Convert HTML → PDF (Puppeteer)
        P-->>I: PDF Base64 string
        
        %% File Upload
        Note over I,Cloud: ☁️ File Upload Sub-flow
        I->>M: TCP: UPLOAD_FILE (PDF Base64)
        M->>Cloud: Upload PDF to Cloudinary
        Cloud-->>M: Public URL
        M-->>I: File URL
        
        %% Payment Session Creation
        Note over I,Stripe: 💳 Payment Session Sub-flow
        I->>Pay: TCP: CREATE_CHECKOUT_SESSION
        Pay->>Stripe: Create Checkout Session
        Stripe-->>Pay: Payment URL & Session ID
        Pay-->>I: Payment Link
        
        %% Update Database
        I->>DB: UPDATE invoice SET status='SENT', fileUrl='...', supervisorId
        DB-->>I: Invoice updated
        
        %% Kafka Event with Payment Link
        Note over I,Mail: 📨 Async Event Processing
        I->>K: PUBLISH: invoice.sent event (with payment link)
        I-->>B: ✅ Invoice sent successfully
        B-->>C: ✅ Success response
    end

    %% 3. Email Processing with Payment Link (Async)
    rect rgb(248, 255, 248)
        Note over K,SMTP: 📧 Phase 3: Email Processing with Payment Link (Async)
        K->>Mail: CONSUME: invoice.sent event
        Mail->>I: TCP: GET_INVOICE_BY_ID
        I->>DB: SELECT invoice details
        DB-->>I: Invoice with fileUrl
        I-->>Mail: Complete invoice data with payment link
        
        Mail->>Mail: Render email template with payment link
        Mail->>Cloud: Download PDF from URL
        Cloud-->>Mail: PDF file
        Mail->>SMTP: Send email with PDF attachment + payment link
        SMTP-->>Mail: ✅ Email sent
    end

    %% 4. Payment Processing (Async)
    rect rgb(255, 240, 255)
        Note over C,Stripe: 💳 Phase 4: Payment Processing (Async)
        Note over C,Stripe: Customer clicks payment link in email
        C->>Stripe: Navigate to Checkout Session
        Stripe->>Stripe: Process payment
        Stripe->>B: POST /api/v1/payment/stripe/webhook
        B->>Pay: TCP: STRIPE_WEBHOOK
        Pay->>Pay: Verify webhook signature
        Pay->>Pay: Extract invoice ID from metadata
        Pay->>I: TCP: PAY_SUCCESS (invoice ID)
        I->>DB: UPDATE invoice SET status='PAID'
        DB-->>I: Invoice updated
        Pay-->>B: ✅ Webhook processed
        B-->>Stripe: ✅ 200 OK
    end
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

### 1.5 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | NestJS | Microservices framework |
| **Language** | TypeScript | Type-safe development |
| **Database** | MongoDB + Mongoose | Document database |
| **Message Queue** | Kafka | Event-driven communication |
| **Authentication** | Keycloak | Identity & Access Management |
| **File Storage** | Cloudinary | Media file storage |
| **PDF Generation** | Puppeteer + EJS | PDF creation |
| **Email** | Nodemailer | Email delivery |
| **Payment** | Stripe | Payment processing |
| **Containerization** | Docker + Docker Compose | Deployment |
| **Monorepo** | Nx | Code organization |
| **Monitoring** | Grafana | Dashboard & Visualization |
| **Log Aggregation** | Loki | Centralized log storage |
| **Log Collection** | Promtail | Docker container log shipping |

---

## 💳 PHẦN 1.5: STRIPE PAYMENT INTEGRATION

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

### 1.5.4 Email Template với Payment Link

**📍 Vai trò**: Email template động với payment link

```html
<!-- apps/mail/src/app/modules/mail-template/templates/invoice.ejs -->
<h2>Xin chào <%= clientName %>,</h2>

<p>Bạn nhận được hóa đơn từ <strong><%= senderName %></strong> với mã số hóa đơn <strong><%= invoiceCode %></strong>.</p>

<p>Vui lòng xem chi tiết hóa đơn trong tập tin PDF đính kèm.</p>

<% if (paymentLink) { %>
  <p>Để thuận tiện cho việc thanh toán, bạn có thể nhấn vào liên kết bên dưới để thanh toán trực tuyến:</p>

  <p>
    <a href="<%= paymentLink %>" target="_blank" style="color: #2196F3; font-weight: bold;">
      👉 Thanh toán ngay
    </a>
  </p>
<% } %>

<p>Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ lại với chúng tôi.</p>
```

### 1.5.5 Payment Configuration

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

### 1.5.6 Security Features

**🛡️ Webhook Security:**
- **Signature Verification**: Verify webhook signature với Stripe secret
- **Event Validation**: Validate event type và data structure
- **Metadata Validation**: Ensure invoice ID exists trong metadata
- **Error Handling**: Graceful handling của invalid webhooks

**🔐 Payment Security:**
- **HTTPS Only**: Tất cả payment requests qua HTTPS
- **Token-based**: Không lưu trữ sensitive payment data
- **PCI Compliance**: Stripe handles PCI compliance
- **Fraud Protection**: Stripe's built-in fraud detection

---

## 📊 PHẦN 2: CENTRALIZED LOGGING ARCHITECTURE

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

**💡 Key Features:**
- **Docker Service Discovery**: Tự động phát hiện containers
- **Label Extraction**: Gán labels từ container metadata
- **Selective Collection**: Chỉ thu thập logs từ invoice và bff services
- **Real-time Streaming**: Refresh interval 5 giây

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

**💡 Key Features:**
- **Filesystem Storage**: Local storage cho development
- **TSDB Schema**: Time-series database cho efficient querying
- **Pattern Ingester**: Tự động extract patterns từ logs
- **No Authentication**: Simplified setup cho development

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

### 2.5 Log Flow trong Microservices

```mermaid
sequenceDiagram
    participant App as 📱 Application
    participant Docker as 🐳 Docker
    participant Promtail as 📡 Promtail
    participant Loki as 📋 Loki
    participant Grafana as 📊 Grafana
    participant Dev as 👨‍💻 Developer

    Note over App,Dev: 📋 CENTRALIZED LOGGING FLOW

    %% Log Generation
    rect rgb(240, 248, 255)
        Note over App,Docker: 1. Log Generation
        App->>Docker: Write logs to stdout/stderr
        Docker->>Docker: Store logs in /var/lib/docker/containers
    end

    %% Log Collection
    rect rgb(255, 248, 240)
        Note over Docker,Loki: 2. Log Collection & Shipping
        Promtail->>Docker: Discover containers via Docker API
        Promtail->>Docker: Read log files
        Promtail->>Promtail: Apply labels và filtering
        Promtail->>Loki: HTTP Push API /loki/api/v1/push
        Loki->>Loki: Index và store logs
    end

    %% Log Visualization
    rect rgb(248, 255, 248)
        Note over Loki,Dev: 3. Log Query & Visualization
        Dev->>Grafana: Access dashboard http://localhost:3001
        Grafana->>Loki: LogQL queries
        Loki-->>Grafana: Log results
        Grafana-->>Dev: Dashboard với charts và logs
    end

    %% Real-time Monitoring
    rect rgb(255, 248, 255)
        Note over Grafana,Dev: 4. Real-time Monitoring
        Grafana->>Loki: Continuous queries (auto-refresh)
        Loki-->>Grafana: Live log stream
        Grafana-->>Dev: Real-time alerts và notifications
    end
```

### 2.6 Practical Benefits

#### 2.6.1 For Development
- **Centralized View**: Tất cả service logs ở một nơi
- **Real-time Monitoring**: Live log streaming
- **Process Tracking**: Follow request flow across services
- **Error Debugging**: Quick error identification và context

#### 2.6.2 For Production
- **Log Aggregation**: Thu thập logs từ multiple instances
- **Search & Filter**: Powerful LogQL queries
- **Alerting**: Grafana alerts based on log patterns
- **Retention**: Configurable log retention policies

---

## 🧩 PHẦN 3: PHÂN TÍCH TỪNG MICROSERVICE

### 3.1 🌐 BFF (Backend for Frontend) Service

**📍 Vai trò**: API Gateway - điểm tập trung cho frontend

#### 3.1.1 Cấu Trúc Project
```
apps/bff/
├── src/
│   ├── main.ts              # Entry point
│   ├── app/
│   │   ├── app.module.ts    # Root module
│   │   └── modules/
│   │       ├── invoice/     # Invoice endpoints
│   │       ├── product/     # Product endpoints  
│   │       ├── user/        # User endpoints
│   │       └── authorizer/  # Auth endpoints
│   └── configuration/       # BFF-specific config
```

#### 3.1.2 Main.ts Configuration (Thực tế)

```typescript
// apps/bff/src/main.ts
async function bootstrap() {
  try {
    const isDev = AppModule.CONFIGURATION.IS_DEV;
    const globalPrefix = AppModule.CONFIGURATION.GLOBAL_PREFIX;
    const port = AppModule.CONFIGURATION.APP_CONFIG.PORT || 3000;

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: isDev ? ['error', 'warn', 'log', 'debug', 'verbose'] : ['error', 'warn', 'log'],
    });

    // Global Configuration
    app.enableCors({ origin: '*' });
    app.useBodyParser('json', { limit: '20mb' });
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    // Swagger Documentation
    const config = new DocumentBuilder()
      .setTitle('E-bff API')
      .setDescription('The E-bff API description')
      .setVersion('1.0.0')
      .addBearerAuth({
        description: 'Default JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
      })
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, documentFactory);

    await app.listen(port);
  } catch (error) {
    Logger.error(`❌ Application failed to start: ${error}`);
  }
}
```

#### 3.1.3 App Module Structure (Thực tế)

```typescript
// apps/bff/src/app/app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ ...CONFIGURATION })],
    }),
    ClientsModule.registerAsync([GrpcProvider(GRPC_SERVICES.AUTHORIZER_SERVICE)]),
    ProductModule,
    InvoiceModule, 
    UserModule,
    AuthorizerModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor, // Global error handling
    },
    { provide: APP_GUARD, useClass: UserGuard }, // Global authentication guard
  ],
})
export class AppModule implements NestModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Global logging
  }
}
```

**💡 Key Features:**
1. **Global Guards**: UserGuard cho authentication
2. **Global Interceptors**: ExceptionInterceptor cho error handling
3. **Global Middleware**: LoggerMiddleware cho request logging
4. **gRPC Integration**: Authorizer service sử dụng gRPC
5. **TCP Clients**: Các service khác sử dụng TCP

---

### 3.2 📄 Invoice Service (Core Business Logic)

**📍 Vai trò**: Xử lý logic nghiệp vụ chính của hóa đơn

#### 3.2.1 Service Structure (Thực tế)
```
apps/invoice/src/app/modules/invoice/
├── controllers/
│   └── invoice.controller.ts    # TCP Message handlers
├── services/
│   └── invoice.service.ts       # Business logic
├── repositories/
│   └── invoice.repository.ts    # Data access layer
├── mappers/
│   └── index.ts                 # Data transformation
└── invoice.module.ts            # Module configuration
```

#### 3.2.2 Invoice Module Configuration

```typescript
// apps/invoice/src/app/modules/invoice/invoice.module.ts
@Module({
  imports: [
    MongoProvider,
    MongooseModule.forFeature([InvoiceDestination]),
    ClientsModule.registerAsync([
      TcpProvider(TCP_SERVICES.PDF_GENERATOR_SERVICE),
      TcpProvider(TCP_SERVICES.MEDIA_SERVICE),
    ]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepository],
})
export class InvoiceModule {}
```

#### 3.2.3 Business Logic Implementation (Thực tế)

```typescript
// apps/invoice/src/app/modules/invoice/services/invoice.service.ts
@Injectable()
export class InvoiceService {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    @Inject(TCP_SERVICES.PDF_GENERATOR_SERVICE) private readonly pdfGeneratorClient: TcpClient,
    @Inject(TCP_SERVICES.MEDIA_SERVICE) private readonly mediaClient: TcpClient,
    private readonly KafkaClient: KafkaClient,
  ) {}

  // 1. Create Invoice (status: CREATED)
  create(params: CreateInvoiceTcpReq) {
    const input = invoiceRequestMapping(params);
    return this.invoiceRepository.create(input);
  }

  // 2. Send Invoice (Complex business flow)
  async sendById(params: SendInvoiceTcpReq, processID: string) {
    const { invoiceId, userId } = params;
    const invoice = await this.getById(invoiceId);
    
    // Business rule validation
    if (invoice.status !== INVOICE_STATUS.CREATED) {
      throw new BadRequestException(ERROR_CODE.INVOICE_CAN_NOT_BE_SENT);
    }

    // Generate PDF via PDF Generator Service
    const pdfBase64 = await this.generatorInvoicePdf(
      { ...invoice.toObject(), status: INVOICE_STATUS.SENT }, 
      invoiceId
    );
    
    // Upload file via Media Service
    const pdfUrl = await this.uploadFile(
      { fileBase64: pdfBase64, fileName: `invoice-${invoiceId}` }, 
      processID
    );

    // Update invoice status and add supervisor
    const invoiceSent = await this.invoiceRepository.updateById(invoiceId, {
      status: INVOICE_STATUS.SENT,
      fileUrl: pdfUrl,
      supervisorId: new ObjectId(userId),
    });

    // Emit Kafka event for async processing
    this.KafkaClient.send<InvoiceSentPayload>(
      KAFKA_TOPICS.INVOICE.SENT, 
      { id: invoiceId }
    );

    return invoiceSent;
  }
}
```

#### 3.2.4 TCP Controller (Thực tế)

```typescript
// apps/invoice/src/app/modules/invoice/controllers/invoice.controller.ts
@Controller()
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.CREATE)
  create(params: TcpRequest<CreateInvoiceTcpReq>) {
    return this.invoiceService.create(params.data);
  }

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.SEND)
  send(params: TcpRequest<SendInvoiceTcpReq>) {
    return this.invoiceService.sendById(params.data, params.processID);
  }

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.GET_BY_ID)
  getById(params: TcpRequest<string>) {
    return this.invoiceService.getById(params.data);
  }

  // ... other CRUD operations
}
```

---

### 3.3 📧 Mail Service (Event-Driven Consumer)

**📍 Vai trò**: Xử lý gửi email và consume Kafka events

#### 3.3.1 Kafka Consumer Setup (Thực tế)

```typescript
// apps/mail/src/app/app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ ...CONFIGURATION })],
    }),
    MailModule,
    MailTemplateModule,
    // Kafka Consumer configuration
    KafkaModule.forConsumerAsync({ 
      groupId: KAFKA_GROUPS.MAIL, 
      serviceName: KAFKA_SERVICES.MAIL 
    }),
  ],
})
export class AppModule {}
```

#### 3.3.2 Event Handler (Thực tế)

```typescript
// apps/mail/src/app/modules/mail/services/mail-queue.service.ts
@Injectable()
export class MailQueueService {
  constructor(private readonly mailInvoiceService: MailInvoiceService) {}

  @KafkaHandler(KAFKA_TOPICS.INVOICE.SENT)
  async eventInvoiceCreated(payload: KafkaPayload<InvoiceSentPayload>) {
    const { message } = payload;
    await this.mailInvoiceService.sendInvoiceCreated(message);
  }
}
```

#### 3.3.3 Mail Business Logic (Thực tế)

```typescript
// apps/mail/src/app/modules/mail/services/mail-invoice.service.ts
@Injectable()
export class MailInvoiceService {
  constructor(
    @Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceClient: TcpClient,
    private readonly mailService: MailService,
    private readonly mailTemplateService: MailTemplateService,
  ) {}

  async sendInvoiceCreated(payload: InvoiceSentPayload) {
    const { id: invoiceId } = payload;

    // 1. Get invoice details from Invoice Service via TCP
    const invoice = await this.getInvoiceById(invoiceId);
    
    // 2. Render email template
    const html = await this.mailTemplateService.render('invoice', {
      clientName: invoice.client.name,
      senderName: 'Tan Thanh DEV',
      invoiceCode: `#${invoice.id}`,
    });

    // 3. Download PDF attachment from Cloudinary
    const attachment = await this.mailService.getAttachmentFromUrl(
      invoice.fileUrl,
      `invoice-${invoice.id}.pdf`,
      'application/pdf',
    );

    // 4. Send email with attachment
    this.mailService.sendMail({
      html,
      subject: 'Send Invoice',
      to: invoice.client.email,
      attachments: [attachment],
    });
  }

  private getInvoiceById(id: string) {
    return firstValueFrom(
      this.invoiceClient
        .send<GetDetailInvoiceTcpRes, string>(TCP_REQUEST_MESSAGE.INVOICE.GET_BY_ID, {
          data: id,
        })
        .pipe(map((data) => data.data)),
    );
  }
}
```

---

## 🔧 PHẦN 4: SHARED LIBRARIES ANALYSIS

### 4.1 📊 Database Schema Design (Thực tế)

```typescript
// libs/schemas/src/lib/invoice/invoice.schema.ts
@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'invoice',
  toJSON: { virtuals: true },
})
export class Invoice extends BaseSchema {
  @Prop({ type: Client })
  client: Client;

  @Prop({ type: Number })
  totalAmount: number;

  @Prop({ type: Number })
  vatAmount: number;

  @Prop({ 
    type: String, 
    enum: INVOICE_STATUS, 
    default: INVOICE_STATUS.CREATED 
  })
  status: INVOICE_STATUS;

  @Prop({ type: [Item] })
  items: Item[];

  @Prop({ type: ObjectId, ref: 'User', required: false })
  supervisorId?: ObjectId;

  @Prop({ type: String, required: false })
  fileUrl?: string;
}

// Invoice Status Enum (Thực tế)
export enum INVOICE_STATUS {
  CREATED = 'created',
  SENT = 'sent',
  VERIFIED = 'verified',
  CANCELLED = 'cancelled', // TODO: Add this
}
```

### 4.2 🔄 Kafka Integration (Thực tế)

#### 4.2.1 Kafka Topics

```typescript
// libs/constants/src/lib/kafka.constant.ts
export const KAFKA_TOPICS = {
  INVOICE: {
    SENT: 'invoice.sent', // Chỉ có 1 topic hiện tại
  },
};
```

#### 4.2.2 Kafka Consumer Service

```typescript
// libs/queue/src/lib/modules/kafka/services/kafka-consumer.service.ts
@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    @Inject(KAFKA_CONSUMER_OPTIONS) private readonly options: KafkaConsumerOptions,
  ) {
    this.kafka = new Kafka({
      clientId: this.options.serviceName + '-' + hostname(),
      brokers: this.options.url,
    });

    this.consumer = this.kafka.consumer({
      groupId: this.options.groupId,
      allowAutoTopicCreation: true,
    });
  }

  async onModuleInit() {
    await this.consumer.connect();

    // Auto-discover handlers with @KafkaHandler decorator
    const providers = this.discoveryService.getProviders()
      .filter((wrapper) => wrapper.instance && typeof wrapper.instance === 'object');

    for (const wrapper of providers) {
      const { instance } = wrapper;
      const prototype = Object.getPrototypeOf(instance);
      const methodNames = Object.getOwnPropertyNames(prototype)
        .filter((method) => typeof instance[method] === 'function' && method !== 'constructor');

      for (const methodName of methodNames) {
        const handler = instance[methodName];
        const metaData = this.reflector.get<KafkaHandlerMetadata>(KAFKA_HANDLER_METADATA, handler);

        if (metaData?.topic) {
          await this.consumer.subscribe({ topic: metaData.topic, fromBeginning: false });
          await this.consumer.run({
            eachMessage: async (context: EachMessagePayload) => {
              const { topic: msgTopic, message } = context;
              if (msgTopic !== metaData.topic) return;

              try {
                const value = message.value?.toString();
                const parsed = value ? JSON.parse(value) : null;
                const payload: KafkaPayload<any> = { context, message: parsed };
                await handler.call(instance, payload);
              } catch (error) {
                this.logger.error(`Error handling message for topic ${msgTopic}:`, error);
              }
            },
          });
        }
      }
    }
  }
}
```

### 4.3 🛡️ Error Handling & Logging (Thực tế)

#### 4.3.1 Global Exception Interceptor

```typescript
// libs/interceptors/src/lib/exception.interceptor.ts
@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const processUuid = request[MetadataKeys.PROCESS_ID];
    const startTime = request[MetadataKeys.START_TIME];

    return next.handle().pipe(
      map((data: ResponseDto<unknown>) => {
        const duration = Date.now() - startTime;
        data.processID = processUuid;
        data.duration = `${duration}ms`;
        return data;
      }),
      catchError((error) => {
        const duration = Date.now() - startTime;
        const code = error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error?.message || HTTP_MESSAGE.INTERNAL_SERVER_ERROR;

        throw new HttpException(
          new ResponseDto({
            data: null,
            message,
            processID: processUuid,
            statusCode: code,
            duration: `${duration}ms`,
          }),
          code,
        );
      }),
    );
  }
}
```

#### 4.3.2 Logger Middleware

```typescript
// libs/middlewares/src/lib/logger.middleware.ts
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const processId = getProcessId();
    const startTime = Date.now();
    
    // Set metadata for tracking
    req[MetadataKeys.PROCESS_ID] = processId;
    req[MetadataKeys.START_TIME] = startTime;
    
    Logger.log(
      `HTTP » Start process '${processId}' » path: '${req.originalUrl}' » method: '${req.method}'`
    );

    // Override response để log completion
    const originalSend = res.send.bind(res);
    res.send = (body: any): Response => {
      const durationMs = Date.now() - startTime;
      Logger.log(
        `HTTP » End process '${processId}' » method: '${req.method}' » after: '${durationMs}ms'`
      );
      return originalSend(body);
    };

    next();
  }
}
```

---

## 🔄 PHẦN 5: COMMUNICATION PATTERNS

### 5.1 Synchronous Communication (TCP)

```typescript
// BFF → Invoice Service
this.invoiceClient.send<string, CreateInvoiceTcpReq>(
  TCP_REQUEST_MESSAGE.INVOICE.CREATE, 
  { data: body, processID }
)

// Invoice Service → PDF Generator
this.pdfGeneratorClient.send<string, InvoiceTcpResponse>(
  TCP_REQUEST_MESSAGE.PDF_GENERATOR.CREATE_INVOICE_PDF,
  { data, processID }
)
```

### 5.2 gRPC Communication (Authorizer Service)

```typescript
// BFF → Authorizer Service (gRPC)
ClientsModule.registerAsync([GrpcProvider(GRPC_SERVICES.AUTHORIZER_SERVICE)])
```

### 5.3 Asynchronous Communication (Kafka)

```typescript
// Producer (Invoice Service)
this.KafkaClient.send<InvoiceSentPayload>(
  KAFKA_TOPICS.INVOICE.SENT, 
  { id: invoiceId }
)

// Consumer (Mail Service)
@KafkaHandler(KAFKA_TOPICS.INVOICE.SENT)
async eventInvoiceCreated(payload: KafkaPayload<InvoiceSentPayload>) {
  await this.mailInvoiceService.sendInvoiceCreated(payload.message);
}
```

---

## 📈 PHẦN 6: BUSINESS FLOW ANALYSIS

### 6.1 Complete Invoice Workflow

```mermaid
sequenceDiagram
    participant F as Frontend
    participant B as BFF
    participant I as Invoice Service
    participant P as PDF Generator
    participant M as Media Service
    participant K as Kafka
    participant Mail as Mail Service
    participant DB as MongoDB
    participant C as Cloudinary

    Note over F,C: 1. CREATE INVOICE
    F->>B: POST /api/v1/invoice
    B->>I: TCP: CREATE_INVOICE
    I->>DB: Save invoice (status: CREATED)
    I-->>B: Invoice ID
    B-->>F: Success Response

    Note over F,C: 2. SEND INVOICE
    F->>B: POST /api/v1/invoice/:id/send
    B->>I: TCP: SEND_INVOICE
    
    Note over I,C: PDF Generation & Upload Flow
    I->>P: TCP: CREATE_INVOICE_PDF
    P->>P: Generate HTML from EJS template
    P->>P: Convert HTML to PDF with Puppeteer
    P-->>I: PDF Base64
    
    I->>M: TCP: UPLOAD_FILE
    M->>C: Upload PDF to Cloudinary
    C-->>M: Public URL
    M-->>I: File URL
    
    Note over I,Mail: Database Update & Event Flow
    I->>DB: Update status to SENT + fileUrl + supervisorId
    I->>K: Publish: invoice.sent event
    I-->>B: Success
    B-->>F: Success Response
    
    Note over K,Mail: Async Email Flow
    K->>Mail: Event: invoice.sent
    Mail->>I: TCP: GET_INVOICE_BY_ID
    Mail->>Mail: Render email template
    Mail->>C: Download PDF attachment
    Mail->>Mail: Send email via SMTP
```

### 6.2 Event-Driven Architecture

```mermaid
graph LR
    %% Event Producer
    InvoiceService[📄 Invoice Service] -->|Publish| Topic[📨 invoice.sent]
    
    %% Kafka Broker
    Topic --> KafkaBroker((🔄 Kafka Broker))
    
    %% Event Consumer
    KafkaBroker --> MailConsumer[📧 Mail Service<br/>Group: mail]
    
    %% Consumer Actions
    MailConsumer -->|Send Email| EmailAction[📮 Email with PDF Attachment]
    
    %% Styling
    classDef producer fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef topic fill:#f1f8e8,stroke:#388e3c,stroke-width:2px
    classDef consumer fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef action fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    
    class InvoiceService producer
    class Topic,KafkaBroker topic
    class MailConsumer consumer
    class EmailAction action
```

---

## 🏛️ PHẦN 7: ARCHITECTURAL PATTERNS

### 7.1 Repository Pattern Implementation

```typescript
// apps/invoice/src/app/modules/invoice/repositories/invoice.repository.ts
@Injectable()
export class InvoiceRepository {
  constructor(
    @InjectModel(InvoiceModelName) private model: InvoiceModel
  ) {}

  create(input: CreateInvoiceInput) {
    return this.model.create(input);
  }

  async getById(id: string) {
    const invoice = await this.model.findById(id);
    if (!invoice) {
      throw new NotFoundException(ERROR_CODE.INVOICE_NOT_FOUND);
    }
    return invoice;
  }

  updateById(id: string, input: Partial<Invoice>) {
    return this.model.findByIdAndUpdate(id, input, { new: true });
  }

  paginate(params: PaginateInvoiceTcpReq) {
    return this.model.paginate({}, params);
  }
}
```

### 7.2 Dependency Injection Pattern

```typescript
// Constructor injection trong InvoiceService
constructor(
  private readonly invoiceRepository: InvoiceRepository,
  @Inject(TCP_SERVICES.PDF_GENERATOR_SERVICE) private readonly pdfGeneratorClient: TcpClient,
  @Inject(TCP_SERVICES.MEDIA_SERVICE) private readonly mediaClient: TcpClient,
  private readonly KafkaClient: KafkaClient,
) {}
```

### 7.3 API Gateway Pattern (BFF)

```typescript
// BFF acts as single entry point
Frontend → BFF → {
  Invoice Service (TCP),
  User Service (TCP),
  Authorizer Service (gRPC),
}
```

---

## 🛠️ PHẦN 8: DEPLOYMENT & DOCKER

### 8.1 Docker Compose Structure

#### Infrastructure Services (docker-compose.provider.yaml)
```yaml
services:
  kafka:
    container_name: kafka
    image: bitnami/kafka:latest
    ports:
      - 9092:9092
    environment:
      - KAFKA_CFG_NODE_ID=0
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092

  mongodb:
    image: mongo
    container_name: mongodb
    ports:
      - '27017:27017'
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example

  keycloak:
    image: quay.io/keycloak/keycloak:25.0.0
    container_name: keycloak-25.0.0
    ports:
      - '8180:8080'
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
```

#### Application Services (docker-compose.dev.yaml)
```yaml
services:
  bff:
    container_name: bff
    image: bff:latest
    ports:
      - 3000:3000
    networks:
      - einvoice-nw

  invoice:
    container_name: invoice
    image: invoice:latest
    networks:
      - einvoice-nw

  # ... other services
```

### 8.2 Build & Deployment Commands

```bash
# Build all services
pnpm nx:run-many -t build

# Build Docker images
pnpm docker-build

# Start infrastructure
pnpm docker:start:provider

# Start application services
pnpm docker:start:dev

# Complete deployment
pnpm build
```

---

## 🧪 PHẦN 9: BÀI TẬP THỰC HÀNH

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

## 🚀 PHẦN 10: ADVANCED TOPICS

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

## 🔴 PHẦN 11: REDIS CACHE IMPLEMENTATION

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

### 11.7 Monitoring & Debugging

#### 🔍 Debug Commands
```bash
# Connect to Redis container
docker exec -it redis_server redis-cli

# List all cache keys
KEYS user-token:*

# Get cache value
GET user-token:a1b2c3d4e5f6...

# Check TTL
TTL user-token:a1b2c3d4e5f6...

# Monitor cache operations
MONITOR
```

#### 📈 Metrics to Track
- Cache hit ratio
- Average response time  
- Keycloak request reduction
- Memory usage

### 11.8 Thực Hành: Testing Cache

#### 🧪 Test Cache Behavior
```bash
# 1. First request (cache miss)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/v1/invoice

# 2. Second request (cache hit - should be faster)  
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/v1/invoice

# 3. Check Redis
docker exec -it redis_server redis-cli
> KEYS user-token:*
> GET user-token:{hash}
```

---

## 📚 PHẦN 12: TÀI LIỆU THAM KHẢO

### 11.1 Official Documentation
- [NestJS Documentation](https://docs.nestjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Kafka Documentation](https://kafka.apache.org/documentation/)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Docker Documentation](https://docs.docker.com/)

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

### 🔄 Architecture Highlights
- **7 Microservices** với vai trò rõ ràng
- **Mixed Communication**: TCP (sync), gRPC (auth), Kafka (async)
- **Event-Driven**: Kafka cho decoupled communication
- **Authentication**: Keycloak integration với Redis cache layer
- **File Processing**: PDF generation và cloud storage
- **Performance Optimization**: Redis caching cho authentication tokens

### 🎯 Key Takeaways
- **Microservices** cần cân nhắc trade-offs giữa complexity và benefits
- **Event-Driven Architecture** giúp decouple services nhưng tăng complexity
- **Proper error handling** và **logging** rất quan trọng trong distributed systems
- **Configuration management** cần được centralized và environment-specific
- **Testing strategy** cần cover unit, integration và e2e tests

---

**Happy Learning! 🚀**

*Tài liệu này được cập nhật để phản ánh chính xác source code hiện tại. Mọi góp ý xin liên hệ để cải thiện chất lượng nội dung.*
