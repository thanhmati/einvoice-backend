// tracing.interceptor.server.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { context, propagation, Context } from '@opentelemetry/api';

@Injectable()
export class TcpServerTracingInterceptor implements NestInterceptor {
  intercept(ec: ExecutionContext, next: CallHandler): Observable<any> {
    if (ec.getType() !== 'rpc') {
      return next.handle();
    }

    const data = ec.switchToRpc().getData();

    // Kiểm tra xem có thông tin tracing không
    if (data && data.__tracing__) {
      const extractedContext: Context = propagation.extract(context.active(), data.__tracing__);

      // Khôi phục payload gốc (bỏ wrapper đi để Controller nhận đúng data)
      // Lưu ý: Việc thay đổi data trực tiếp ở đây cần cẩn trọng để match với Pipe validation
      ec.switchToRpc().getData = () => data.data;

      // Chạy handler trong context vừa extract được
      return context.with(extractedContext, () => {
        return next.handle();
      });
    }

    return next.handle();
  }
}
