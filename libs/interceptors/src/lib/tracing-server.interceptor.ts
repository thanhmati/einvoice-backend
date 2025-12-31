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
    console.log('--- TcpServerTracingInterceptor Debug ---');
    console.log('Incoming Data:', JSON.stringify(data, null, 2));

    if (data && data.__tracing__) {
      console.log('Tracing context found:', data.__tracing__);
      const extractedContext: Context = propagation.extract(context.active(), data.__tracing__);

      // Chạy handler trong context vừa extract được
      return context.with(extractedContext, () => {
        return next.handle();
      });
    }

    return next.handle();
  }
}
