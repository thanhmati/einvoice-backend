# 🎯 Lesson: Rate Limiting & Redis
## 1. Mở đầu – Một câu chuyện rất đời
Tưởng tượng bạn đang ở một quầy café miễn phí trong sự kiện tech meetup. Cà phê ngon, barista pha nhanh, nhưng… chỉ có 1 máy pha.

Nếu cùng lúc 200 người nhào vào:
- Máy cháy  
- Barista hoảng  
- Tất cả mọi người bực bội  

Một anh nhân viên sự kiện chạy ra và nói:  
**“Xin xếp hàng nhé mọi người, mỗi người 1 ly trong 1 phút!”**

Chúc mừng: bạn vừa thấy rate limiting bản đời thật.

---

## 2. Rate Limiting là gì? (định nghĩa theo kiểu "đời")
Đó là cách hệ thống nói với bạn:  
**“Từ từ thôi anh bạn. Tôi phục vụ được, nhưng không quá nhiều trong một lúc.”**

Trong kỹ thuật:  
Mỗi user/API key/IP chỉ được gửi **một số lượng request giới hạn** trong một khoảng thời gian xác định.

Ví dụ:
- 100 request / phút  
- 10 lần đăng nhập / 15 phút  
- 500 email gửi ra / giờ  

Nếu vượt quá → hệ thống trả về **429 Too Many Requests**.

---

## 3. Tại sao phải có Rate Limiting?
### ❌ Không rate limiting:
- Một con bot spam có thể đánh sập API.  
- Một bug frontend có thể tạo “infinite loop request”.  
- API billing đội chi phí lên trời.  
- Hacker dễ brute-force password.  

### ✔ Với rate limiting:
- Hệ thống khỏe mạnh hơn.  
- UX ổn định hơn.  
- Giảm rủi ro DDoS.  
- Tiết kiệm chi phí cloud.  

---

## 4. Các chiến lược Rate Limiting (giải thích bằng hình ảnh đời thường)

### 🔹 4.1. Fixed Window
Giống như “reset đồng hồ mỗi phút”.

Ví dụ: mỗi người chỉ được 2 lon nước/phút.

**Nhược điểm:** burst 00:59 + 01:00 = 4 lon liên tục.

### 🔹 4.2. Sliding Window
Kiểm tra “trong 60 giây vừa qua bạn đã lấy bao nhiêu lon?”.  
Chính xác hơn, tránh burst.

### 🔹 4.3. Token Bucket
Bạn nhận “token” đều đều theo thời gian.  
Muốn uống? Đưa token.  
Cho phép burst nhỏ nhưng không quá mức.

### 🔹 4.4. Leaking Bucket
Nước chảy ra đều → tốc độ xử lý ổn định, tránh giật cục.

---

## 5. Khi API scale lớn → Redis bước vào
Hệ thống có nhiều server chạy song song → cần:
- Chia sẻ chung số lượng request  
- Đảm bảo atomic  
- Reset limit chính xác  
- Ghi/đọc cực nhanh  

**Redis** gần như giải pháp chuẩn.

---

## 6. Tại sao Redis cực hợp cho Rate Limiting?

| Lý do | Giải thích |
|------|------------|
| ⚡ Tốc độ cực nhanh | In-memory, ghi đếm hàng trăm nghìn RPS |
| 🔒 Atomic | INCR, SETEX đảm bảo chính xác |
| ⏲ Có TTL | Key tự expired |
| 🔄 Distributed | Tất cả API server dùng chung |
| 🧩 Nhiều cấu trúc dữ liệu | String, Sorted Set hỗ trợ mọi thuật toán |

---

## 7. Flow xử lý Rate Limit với Redis

```text
Client → API → Redis (INCR)
        ← count

if count == 1 → EXPIRE key 60s
if count > 100 → trả về 429
else → OK
```

## 8. Ví dụ thực tế – Bảo vệ API Đăng nhập
Hacker brute-force 10,000 password/s.

Không rate limit → RIP backend.

Dùng Redis:
- Mỗi IP: 5 request / 10 phút  
- Mỗi user: 10 request / 10 phút  

→ Hacker bị chặn sau vài lần.  
→ Auth service sống khỏe.

---

## 9. Tổng kết
- Rate limiting = cửa an ninh của API.  
- Redis = công cụ số 1 để xây distributed rate limiting.  
- Tùy nhu cầu chọn thuật toán phù hợp.  
- Hiểu rate limit giúp hệ thống bền vững & tiết kiệm chi phí.
