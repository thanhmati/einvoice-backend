/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_SERVICES, KAFKA_GROUPS } from '@common/constants/enums/kafka.enum';
import { hostname } from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3200,
      host: '127.0.0.1',
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: `${KAFKA_SERVICES.INVOICE}-${hostname()}`,
        brokers: [AppModule.CONFIGURATION.KAFKA_CONFIG.URL],
      },
      consumer: {
        groupId: KAFKA_GROUPS.INVOICE,
        allowAutoTopicCreation: true,
      },
    },
  });

  app.enableCors({
    origin: '*',
  });

  const port = 3002;

  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}}`);
}

bootstrap();
