/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

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

  app.enableCors({
    origin: '*',
  });

  const port = 3001;

  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}}`);
}

bootstrap();
