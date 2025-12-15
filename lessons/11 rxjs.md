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

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

observable.subscribe({
  next: (val) => console.log(val),
  complete: () => console.log('Done'),
});
// Kết quả: 1, 2, 3, Done
```

### 2.2. Observer

- Observer là “người lắng nghe” Observable.
- Gồm 3 hàm callback: **next**, **error**, **complete**.

Ví dụ:

```ts
const observer = {
  next: (x) => console.log('Received:', x),
  error: (err) => console.error('Error:', err),
  complete: () => console.log('Finished'),
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

## 4. Operators

- **Operators** là các hàm dùng để **xử lý dữ liệu** trong pipeline (thông qua `pipe()`).
- Các nhóm chính:
  - **Biến đổi** (map, mergeMap, switchMap).
  - **Lọc** (filter, take, first).
  - **Kết hợp** (merge, concat, combineLatest).
  - **Xử lý lỗi** (catchError, retry).

### Ví dụ phổ biến

#### map() – biến đổi dữ liệu

```ts
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1, 2, 3)
  .pipe(map((x) => x * 2))
  .subscribe(console.log);
// Output: 2, 4, 6
```

- filter() – lọc dữ liệu

```ts
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

of(1, 2, 3, 4)
  .pipe(filter((x) => x % 2 === 0))
  .subscribe(console.log);
// Output: 2, 4
```

mergeMap() – xử lý bất đồng bộ lồng nhau

```ts
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

from([1, 2])
  .pipe(mergeMap((x) => from([x * 10, x * 20])))
  .subscribe(console.log);
// Output: 10, 20, 20, 40
```

catchError() – xử lý lỗi

```ts
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

throwError(() => new Error('Oops'))
  .pipe(catchError((err) => of('Recovered!')))
  .subscribe(console.log);
// Output: "Recovered!"
```

## 5. Best Practices

1. Luôn **unsubscribe** khi không còn cần thiết (tránh rò rỉ bộ nhớ).
   - Ví dụ: dùng `take()`, `first()`, hoặc lưu `subscription` để hủy thủ công.
2. Dùng **pipe + operators** thay vì xử lý trực tiếp trong `subscribe()`.
3. Quản lý lỗi bằng **catchError()** thay vì để app crash.
4. Dùng **take() / first()** để giới hạn số lần emit khi chỉ cần giá trị đầu tiên.
5. Kết hợp với async/await khi làm việc với Observable bằng:

   ```ts
   import { firstValueFrom } from 'rxjs';

   const result = await firstValueFrom(of('Hello RxJS'));
   console.log(result); // "Hello RxJS"
   ```

## 6. Kết luận

- **RxJS** giúp làm việc với dữ liệu bất đồng bộ một cách gọn gàng, mạnh mẽ.
- Các khái niệm cần nắm:
  - Observable, Observer, Subscription.
  - Cách tạo Observable (`of`, `from`, `interval`).
  - Operators phổ biến (`map`, `filter`, `mergeMap`, `catchError`).
- Đây là nền tảng để đi xa hơn:
  - WebSocket, Stream API.
  - Các framework frontend (Angular, React, Vue).
  - Backend reactive (NestJS, microservices).
