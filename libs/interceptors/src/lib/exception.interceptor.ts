import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseDto } from '@common/interfaces/gateway/common/response.interface';
import { ConfigService } from '@nestjs/config';
import { MetadataKeys } from '@common/constants/decorators.constant';
import { HTTP_MESSAGE } from '@common/constants/enums/http-message.enum';
@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ExceptionInterceptor.name);
  private readonly globalPrefix: string;

  constructor(private readonly configuration: ConfigService) {
    this.globalPrefix = configuration.get('GLOBAL_PREFIX') || '';
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<
      Request & { [MetadataKeys.PROCESS_ID]: string; [MetadataKeys.START_TIME]: number }
    >();
    const processUuid = request[MetadataKeys.PROCESS_ID];
    const startTime = request[MetadataKeys.START_TIME];

    return next.handle().pipe(
      map((data: ResponseDto<unknown>) => {
        const duration = Date.now() - startTime;
        data.processID = request[MetadataKeys.PROCESS_ID];
        data.duration = `${duration}ms`;
        return data;
      }),
      catchError((error) => {
        this.logger.debug({ error });
        const duration = Date.now() - startTime;

        const code =
          error?.code || error?.statusCode || error?.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error?.response?.message || error?.message || error || HTTP_MESSAGE.INTERNAL_SERVER_ERROR;

        throw new HttpException(
          new ResponseDto({
            data: null,
            message,
            processID: processUuid,
            statusCode: code,
            duration: `${duration}ms`,
          }),
          code,
        );
      }),
    );
  }
}
