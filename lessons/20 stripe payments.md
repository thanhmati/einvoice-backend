# 🎓 Lesson: Stripe và mô hình thanh toán trong ứng dụng

## 🧭 1. Stripe là gì?

Stripe là một nền tảng thanh toán (Payment Platform) cho phép doanh nghiệp chấp nhận thanh toán trực tuyến qua nhiều hình thức: thẻ tín dụng, ví điện tử (Apple Pay, Google Pay), chuyển khoản ngân hàng, v.v.

Stripe cung cấp:

- **API mạnh mẽ** cho lập trình viên.
- **Dashboard quản lý** khách hàng, hóa đơn, và thanh toán.
- **Hệ thống bảo mật PCI-compliant**.
- **Webhooks** để đồng bộ sự kiện thanh toán theo thời gian thực.

---

## 🧩 2. Các thành phần chính trong hệ sinh thái Stripe

### 🏦 2.1. Core Payment Components

| Thành phần             | Mô tả ngắn gọn                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Customer**           | Đại diện cho một người dùng / khách hàng trong hệ thống Stripe.                                            |
| **PaymentMethod**      | Thông tin phương thức thanh toán (ví dụ: thẻ Visa, Mastercard, Apple Pay, v.v.).                           |
| **PaymentIntent**      | “Ý định thanh toán” – đại diện cho một giao dịch cụ thể mà người dùng đang thực hiện.                      |
| **Charge**             | Kết quả thực tế sau khi thanh toán được xác nhận. (Tạo ra sau khi PaymentIntent được xác nhận thành công). |
| **Refund**             | Được tạo khi hoàn tiền cho một Charge.                                                                     |
| **BalanceTransaction** | Chi tiết dòng tiền thực tế (ví dụ: tiền đã về tài khoản, phí bị trừ, v.v.).                                |

---

### 🧾 2.2. Invoicing Components

Stripe hỗ trợ **quản lý hóa đơn tự động**:

| Thành phần                 | Mô tả                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| **Invoice**                | Hóa đơn thanh toán có thể gửi trực tiếp tới khách hàng qua email hoặc được thanh toán tự động. |
| **InvoiceItem**            | Các dòng sản phẩm/dịch vụ trong một hóa đơn.                                                   |
| **CreditNote**             | Ghi chú giảm trừ hoặc điều chỉnh hóa đơn (ví dụ: giảm giá, hoàn tiền một phần).                |
| **TaxRate / Tax Settings** | Cấu hình thuế (VAT, GST, v.v.) theo vùng hoặc loại sản phẩm.                                   |

---

### 🔁 2.3. Subscription Components (đăng ký định kỳ)

| Thành phần                  | Mô tả                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------- |
| **Product**                 | Sản phẩm hoặc gói dịch vụ (ví dụ: “Pro Plan”, “Enterprise Plan”).                       |
| **Price**                   | Mức giá cho mỗi product (ví dụ: $10/tháng, $100/năm).                                   |
| **Subscription**            | Đăng ký của khách hàng cho một sản phẩm cụ thể.                                         |
| **SubscriptionItem**        | Dòng chi tiết của subscription (nếu có nhiều gói trong cùng 1 đăng ký).                 |
| **Invoice + PaymentIntent** | Mỗi chu kỳ thanh toán của subscription đều sinh ra hóa đơn và payment intent tương ứng. |

> 💡 Khi đến kỳ gia hạn, Stripe tự động:
>
> - Tạo **invoice** mới.
> - Tạo **payment intent** mới.
> - Thực hiện thu phí tự động dựa trên phương thức thanh toán đã lưu.
> - Gửi event `invoice.payment_succeeded` hoặc `invoice.payment_failed`.

---

### 🔔 2.4. Webhook và Event System

Stripe hoạt động theo mô hình **event-driven**, tức là mọi hành động thanh toán đều tạo ra **sự kiện (event)**.

| Event                           | Mô tả                        |
| ------------------------------- | ---------------------------- |
| `payment_intent.succeeded`      | Thanh toán thành công.       |
| `payment_intent.payment_failed` | Thanh toán thất bại.         |
| `invoice.payment_succeeded`     | Hóa đơn đã được thanh toán.  |
| `invoice.payment_failed`        | Thanh toán định kỳ thất bại. |
| `customer.subscription.created` | Subscription mới được tạo.   |
| `customer.subscription.deleted` | Subscription bị hủy.         |

Webhook là **cầu nối giữa Stripe và backend của bạn** — giúp backend cập nhật trạng thái thanh toán thực tế mà không phụ thuộc vào phản hồi phía client.

---

### 📬 2.5. Stripe Dashboard

Stripe Dashboard cung cấp:

- Quản lý khách hàng, hóa đơn, subscription.
- Xem chi tiết từng payment, refund, và transaction.
- Cấu hình webhook endpoint, tax rate, và tài khoản ngân hàng.
- Chế độ **Test Mode / Live Mode** — cho phép thử nghiệm an toàn.

> 💡 Khi tích hợp, ta luôn bắt đầu ở **Test Mode**, sử dụng **thẻ giả lập của Stripe**:
>
> - `4242 4242 4242 4242` → thanh toán thành công.
> - `4000 0000 0000 0002` → thanh toán bị từ chối.

---

## 💳 3. Payment Flow tổng quát

### 3.1 One-time Payment Flow

```
[Client] -> gửi yêu cầu tạo PaymentIntent -> [Server] -> Stripe
   ↓
Trả về client_secret -> Client xác nhận thanh toán (Stripe.js)
   ↓
Stripe xử lý và gửi webhook -> [Server cập nhật trạng thái]
```

### 3.2 Subscription Payment Flow

```
[Server] -> tạo Customer + Subscription (chọn Price)
   ↓
Stripe tạo Invoice và PaymentIntent tự động
   ↓
Client xác nhận thanh toán (nếu cần)
   ↓
Stripe gửi Webhook: invoice.payment_succeeded / failed
```

---

## 🧮 4. Luồng tiền (Flow of Funds)

Stripe giữ vai trò trung gian:

1. Người dùng thanh toán → Stripe nhận tiền.
2. Stripe trừ phí giao dịch (thường 2.9% + $0.3).
3. Stripe chuyển phần còn lại về tài khoản ngân hàng của bạn theo chu kỳ (payout).

---

## 🔒 5. Bảo mật & Compliance

Stripe tuân thủ các chuẩn:

- **PCI DSS Level 1**
- **Tokenization**: Thẻ không bao giờ chạm tới server của bạn.
- **3D Secure / SCA**: đảm bảo thanh toán an toàn tại châu Âu.
- **Webhook signature verification**: đảm bảo event gửi từ Stripe là hợp lệ.

---

## 🧠 6. Kiến thức cần nắm trước khi code

| Kiến thức     | Mục tiêu                                    |
| ------------- | ------------------------------------------- |
| PaymentIntent | Biết cách tạo và xác nhận giao dịch.        |
| Webhook       | Biết xử lý event để cập nhật DB.            |
| Invoice       | Biết tạo hóa đơn và gửi email thanh toán.   |
| Subscription  | Hiểu quy trình tự động gia hạn.             |
| Refund        | Biết hoàn tiền một phần hoặc toàn bộ.       |
| Test Mode     | Biết kiểm thử không rủi ro với thẻ giả lập. |

---

## 🚀 7. Tổng kết

Stripe là một nền tảng hoàn chỉnh giúp:

- Xử lý **một lần thanh toán**, **hóa đơn**, **đăng ký định kỳ**, **refund**, và **tax**.
- Đảm bảo **bảo mật và tuân thủ tiêu chuẩn quốc tế**.
- Cung cấp **dashboard quản lý mạnh mẽ**.
- Dễ dàng tích hợp với các backend như **NestJS, Express, Laravel, Django, FastAPI, v.v.**

---

## 💼 8. Gợi ý hướng học tiếp theo

1. Cài đặt SDK Stripe trong backend (ví dụ: NestJS).
2. Tạo Payment Intent API.
3. Xử lý webhook và cập nhật trạng thái thanh toán.
4. Quản lý hóa đơn và subscription.
5. Tạo dashboard backend cho admin xem lịch sử giao dịch.
