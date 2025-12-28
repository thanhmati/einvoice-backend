/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { initTracing } from '@common/observability/tracing/tracing';

initTracing('invoice');

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger as PinoLogger } from '@common/observability/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(PinoLogger));
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: AppModule.CONFIGURATION.TCP_SERV.TCP_INVOICE_SERVICE.options.host,
      port: AppModule.CONFIGURATION.TCP_SERV.TCP_INVOICE_SERVICE.options.port,
    },
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.INVOICE_PORT || 3000;

  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
