import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { randomUUID } from 'crypto';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  pathPrefix: string;

  constructor() {
    this.pathPrefix = '/api';
  }

  use(req: Request, res: Response, next: NextFunction) {
    const processId = randomUUID();
    (req as any)['processID'] = processId;
    const startTime = Date.now();
    const { method, originalUrl, body } = req;
    const url = originalUrl.replace(this.pathPrefix, '');

    const now = Date.now();
    (req as any)['startTime'] = now;

    // Log thông tin request bắt đầu
    Logger.log(
      `HTTP » Start process '${processId}' » path: '${url}' » method: '${method}' at '${now}' input: ${JSON.stringify(
        body
      )}`
    );

    // Lưu response gốc để ghi log khi hoàn thành
    const originalSend = res.send.bind(res);
    res.send = (body: any): Response => {
      const durationMs = Date.now() - startTime;

      // Log khi request thành công
      if (res.statusCode >= 200 && res.statusCode < 400) {
        Logger.log(
          `HTTP » End process '${processId}' » method: '${method}' » after: '${durationMs}ms'`
        );
      }

      return originalSend(body);
    };

    // Ghi log khi có lỗi
    res.on('error', (err: Error) => {
      const durationMs = Date.now() - startTime;
      Logger.error(
        `HTTP » Error process '${processId}' » method: '${method}' » after: '${durationMs}ms' » input: ${JSON.stringify(
          err
        )}`
      );
    });

    // Xử lý trường hợp lỗi trong middleware hoặc route
    const originalEnd = res.end.bind(res);
    res.end = (...args: any[]): Response => {
      if (res.getHeader('content-type') === 'application/json') {
        const durationMs = Date.now() - startTime;
        const resData = args[0].toString();
        if (res.statusCode >= 400) {
          Logger.error(
            `HTTP » Error process '${processId}' » method: '${method}' » after: '${durationMs}ms' » input: ${JSON.stringify(
              resData
            )}`
          );
        }
      }

      originalEnd(...args);

      return res;
    };

    next();
  }
}
