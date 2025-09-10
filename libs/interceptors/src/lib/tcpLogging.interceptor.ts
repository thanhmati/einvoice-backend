import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TcpLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const handler = context.getHandler();
    const handlerName = handler.name;

    const args = context.getArgs();
    const param = args[0];
    const processId = param.processId;

    Logger.log(
      `TCP >> Start process '${processId}' >> method: '${handlerName}' at '${now}' >> param: ${JSON.stringify(param)}`,
    );

    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(`TCP >> End process '${processId}' >> method: '${handlerName}' after: '${Date.now() - now}ms'`),
        ),
      );
  }
}
