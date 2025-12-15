# 📘 Lesson: Dynamic Module trong NestJS (Dễ hiểu -- Thực chiến)

## 🎯 Mục tiêu bài học

Sau bài học này, bạn sẽ hiểu:

- Dynamic Module là gì và tại sao NestJS cần nó\
- Các dạng Dynamic Module phổ biến\
- Cách tự xây dựng một Dynamic Module\
- Tình huống thực tế khi sử dụng

---

# 1️⃣ Dynamic Module là gì?

Trong NestJS, mỗi module thường được định nghĩa cố định:

```ts
@Module({
  providers: [MyService],
})
export class MyModule {}
```

Nhưng nhiều module trong thực tế cần **cấu hình khác nhau** tùy môi
trường, ví dụ:

- API key email service\
- thông tin kết nối Redis\
- JWT secret khác nhau giữa dev/prod\
- config Kafka broker URL

Để làm được điều đó, NestJS cung cấp **Dynamic Module** --- tức là
module được **tạo ra động** thông qua một function (thường là `forRoot`,
`forRootAsync`).

### Hiểu đơn giản:

> **Dynamic Module = module có thể nhận tham số cấu hình và trả về một
> module tùy biến.**

---

# 2️⃣ Tại sao phải dùng Dynamic Module?

Vì nhiều module cần **config từ bên ngoài**, ví dụ:

```ts
JwtModule.forRoot({ secret: 'ABC' })
CacheModule.forRoot({ ttl: 5000 })
ConfigModule.forRoot(...)
```

Nếu không có Dynamic Module, NestJS sẽ không biết cách nhận config này
truyền vào module.

Dynamic Module giúp:

- Module linh hoạt theo cấu hình
- Tái sử dụng module ở nhiều dự án
- Đăng ký provider dựa trên tham số truyền vào
- Hỗ trợ async config (load từ file, DB, Secret Manager...)

---

# 3️⃣ Kiến trúc của một Dynamic Module

Dynamic Module được xây bằng cách tạo **static method** trả về một
object dạng:

```ts
return {
  module: MyModule,
  providers: [...],
  exports: [...],
  imports: [...]
}
```

Đây là key của toàn bộ cơ chế.

---

# 4️⃣ Ví dụ đơn giản: EmailModule

Giả sử bạn muốn tạo module gửi email dùng SendGrid hoặc Mailgun.

## ➤ Bước 1: Tạo interface cấu hình

```ts
export interface EmailModuleOptions {
  apiKey: string;
  from: string;
}
```

## ➤ Bước 2: Tạo module với phương thức forRoot()

```ts
@Module({})
export class EmailModule {
  static forRoot(options: EmailModuleOptions): DynamicModule {
    return {
      module: EmailModule,
      providers: [
        {
          provide: 'EMAIL_OPTIONS',
          useValue: options,
        },
        EmailService,
      ],
      exports: [EmailService],
    };
  }
}
```

### Ý nghĩa:

- `forRoot()` nhận config
- `DynamicModule` trả về providers đã "bơm" config vào
- `EmailService` có thể inject config

## ➤ Bước 3: EmailService nhận config

```ts
@Injectable()
export class EmailService {
  constructor(
    @Inject('EMAIL_OPTIONS')
    private readonly options: EmailModuleOptions,
  ) {}

  send() {
    console.log('Send email using:', this.options.apiKey);
  }
}
```

## ➤ Bước 4: Sử dụng module

```ts
imports: [
  EmailModule.forRoot({
    apiKey: 'SENDGRID_KEY',
    from: 'noreply@example.com',
  }),
],
```

---

# 5️⃣ Dynamic Module Async (forRootAsync)

Khi cấu hình cần load từ:

- ConfigService\
- Database\
- Secret Manager\
- file .env

Ta dùng `forRootAsync`.

Ví dụ:

```ts
EmailModule.forRootAsync({
  useFactory: async (config: ConfigService) => ({
    apiKey: config.get('EMAIL_KEY'),
    from: config.get('EMAIL_FROM'),
  }),
  inject: [ConfigService],
});
```

Ưu điểm: có thể chạy code async trước khi tạo module.

---

# 6️⃣ Các dạng Dynamic Module bạn sẽ gặp

---

Dạng Ví dụ Công dụng

---

**forRoot()** JwtModule.forRoot(...) Truyền config trực tiếp

**forRootAsync()** TypeOrmModule.forRootAsync(...) Load config async

**forFeature()** TypeOrmModule.forFeature(...) Cấu hình theo domain -- entity,
schema

---

---

# 7️⃣ Khi nào dùng Dynamic Module?

Tình huống Dynamic Module có phù hợp?

---

Module cần config tùy môi trường ✅
Module cần đọc config async ✅
Xây reusable library ✅
Module nhỏ, config cố định ❌ không cần

---

# 8️⃣ Minh họa trực quan

    AppModule
      └── EmailModule.forRoot(config)
             └── providers:
                   - EmailService
                   - EMAIL_OPTIONS = config

NestJS ghép "module động" → thành module thực tế trong dependency graph.

---

# 📌 Kết luận

Dynamic Module là kỹ thuật quan trọng trong NestJS dùng để:

- xây module nhận cấu hình
- viết libraries reusable
- hỗ trợ môi trường phức tạp
- cho phép async config

Hiểu được Dynamic Module → bạn sẽ hiểu cách NestJS framework được xây
dựng bên dưới.
