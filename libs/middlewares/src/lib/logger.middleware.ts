import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MetadataKeys } from '@common/constants/common.constant';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl, body } = req;
    const now = Date.now();

    (req as any)[MetadataKeys.START_TIME] = startTime;

    Logger.log(
      `HTTP >> Start process >> path: '${originalUrl}' >> method: '${method}' at '${now}' >> input: ${JSON.stringify(
        body,
      )}`,
    );

    const originalSend = res.send.bind(res);

    res.send = (body: any) => {
      const durationMs = Date.now() - startTime;
      Logger.log(
        `HTTP >> End process >> path: '${originalUrl}' >> method: '${method}' at '${now}' >> duration: ${durationMs} ms`,
      );

      return originalSend(body);
    };
    next();
  }
}
