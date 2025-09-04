# 📘 Bài giảng: RxJS Cơ Bản

## 1. Giới thiệu
- **RxJS (Reactive Extensions for JavaScript)** là một thư viện mạnh mẽ để xử lý **bất đồng bộ** và **luồng dữ liệu**.  
- Cốt lõi: lập trình phản ứng (Reactive Programming) → dữ liệu được xem như một **dòng chảy (stream)**, bạn có thể quan sát và phản ứng khi có dữ liệu mới.  
- Ứng dụng phổ biến:
  - Xử lý sự kiện (event handling).  
  - Xử lý dữ liệu bất đồng bộ (API call, WebSocket).  
  - Tích hợp với UI frameworks (Angular, React, Vue).  

---

## 2. Các khái niệm chính
### 2.1. Observable
- **Observable**: đại diện cho một luồng dữ liệu (stream).  
- Có thể phát ra:
  - **next** → giá trị mới.  
  - **error** → thông báo lỗi.  
  - **complete** → kết thúc luồng.  

Ví dụ:
```ts
import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

observable.subscribe({
  next: val => console.log(val),
  complete: () => console.log('Done')
});
// Kết quả: 1, 2, 3, Done
```
### 2.2. Observer
- Observer là “người lắng nghe” Observable.
- Gồm 3 hàm callback: **next**, **error**, **complete**.
  
Ví dụ:
```ts
const observer = {
  next: x => console.log('Received:', x),
  error: err => console.error('Error:', err),
  complete: () => console.log('Finished')
};

observable.subscribe(observer);
```
### 2.3. Subscription
- Khi gọi **subscribe()**, bạn sẽ nhận được một Subscription.
- Có thể dùng để hủy (unsubscribe) khi không muốn lắng nghe nữa.

  Ví dụ:
```ts
const subscription = observable.subscribe(observer);

// Hủy sau 2s
setTimeout(() => subscription.unsubscribe(), 2000);
```

## 3. Tạo Observable

- **of()**: phát ra một danh sách giá trị.  
```ts
import { of } from 'rxjs';
of(10, 20, 30).subscribe(console.log);
// Output: 10, 20, 30
```
- from(): chuyển đổi từ array, promise, iterable.
```ts
import { from } from 'rxjs';
from([1, 2, 3]).subscribe(console.log);
// Output: 1, 2, 3
```
- interval(): phát ra số liên tục theo khoảng thời gian.
```ts
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

interval(1000).pipe(take(3)).subscribe(console.log);
// Output: 0, 1, 2 (mỗi giây một số)

```
