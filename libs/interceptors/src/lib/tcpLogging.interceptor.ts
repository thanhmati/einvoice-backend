import { CallHandler, ExecutionContext, HttpStatus, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { type RequestType } from '@common/interfaces/tcp/common/request.interface';
import { RpcException } from '@nestjs/microservices';
import { HTTP_MESSAGE } from '@common/constants/enums/http-message.enum';

@Injectable()
export class TcpLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const now = Date.now();
    const handler = context.getHandler();
    const handlerName = handler.name;
    const args = context.getArgs();

    const param: RequestType<unknown> = args[0];
    const processUuid = param.processID;

    // ignore health check requests. check by last part of url is 'health'
    if (handlerName === 'health') {
      return next.handle();
    }

    Logger.log(
      `TCP » Start process '${processUuid}' at '${now}' » handler: '${handlerName}' » param: ${JSON.stringify(param)}`,
    );

    return next.handle().pipe(
      tap(() =>
        Logger.log(
          `TCP » Finished process '${processUuid}' » handler: '${handlerName}' after: '${Date.now() - now}ms'`,
        ),
      ),
      catchError((error) => {
        const duration = Date.now() - now;
        Logger.error(
          `TCP » Error process '${processUuid}': ${error.message} >> data: ${JSON.stringify(error)}, after: '${duration}ms'`,
        );

        throw new RpcException({
          code: error?.status || error?.code || error?.error?.code || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error?.response?.message || error?.message || HTTP_MESSAGE.INTERNAL_SERVER_ERROR,
        });
      }),
    );
  }
}
