/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { initTracing } from '@common/observability/tracing/tracing';

initTracing('mail-service');

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QUEUE_GROUPS } from '@common/constants/enum/queue.enum';

async function bootstrap() {
  Logger.log(`[DEBUG] RAW ENV KAFKA_URL: ${process.env['KAFKA_URL']}`);
  Logger.log(`[DEBUG] RAW ENV KAFKA_HOST: ${process.env['KAFKA_HOST']}`);
  Logger.log(`[DEBUG] RAW ENV KAFKA_PORT: ${process.env['KAFKA_PORT']}`);

  const app = await NestFactory.create(AppModule);

  Logger.debug('Config', AppModule.CONFIGURATION.KAFKA_CONFIG);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [AppModule.CONFIGURATION.KAFKA_CONFIG.URL],
      },
      consumer: {
        groupId: QUEUE_GROUPS.MAIL,
        allowAutoTopicCreation: true,
      },
    },
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.MAIL_PORT || 3000;

  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
