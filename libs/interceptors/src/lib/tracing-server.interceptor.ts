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

    if (data && data.__tracing__) {
      const extractedContext: Context = propagation.extract(context.active(), data.__tracing__);

      // Chạy handler trong context vừa extract được
      return context.with(extractedContext, () => {
        return next.handle();
      });
    }

    return next.handle();
  }
}
