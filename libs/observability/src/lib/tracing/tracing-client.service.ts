import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { context, propagation } from '@opentelemetry/api';
import { Observable } from 'rxjs';

@Injectable()
export class TracingClientService {
  send<TResult = any, TInput = any>(client: any, pattern: any, data: TInput) {
    // 1. Tạo vật chứa (carrier) để hứng thông tin Trace
    const carrier = {};

    // 2. Lấy Trace ID hiện tại (Context đang active) và tiêm vào carrier
    // Nếu đây là Service A (đầu chuỗi), nó lấy Root Span.
    // Nếu đây là Service B (giữa chuỗi), nó lấy Span nhận từ A.
    propagation.inject(context.active(), carrier);

    // 3. Đóng gói payload
    // Chúng ta bọc data gốc lại và gửi kèm carrier
    const payloadWithTrace = {
      data: data, // Dữ liệu nghiệp vụ thật
      __tracing__: carrier, // Thông tin tracing (ẩn)
    };

    // 4. Gửi qua TCP
    return client.send(pattern, payloadWithTrace);
  }

  // Bạn có thể làm tương tự cho hàm emit() nếu dùng EventPattern
  emit<TResult = any, TInput = any>(client: any, pattern: any, data: TInput) {
    const carrier = {};
    propagation.inject(context.active(), carrier);
    const payloadWithTrace = { data: data, __tracing__: carrier };
    return client.emit(pattern, payloadWithTrace);
  }
}
