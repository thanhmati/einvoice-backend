/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
      options: {
        port: 3201,
        host: '127.0.0.1',
      },
    });

    app.enableCors({
      origin: '*',
    });

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }

    await app.startAllMicroservices();
    await app.listen(3002);
  } catch (error) {
    Logger.error(`❌ Application failed to start: ${error}`, '', 'Bootstrap', false);
  }
}

bootstrap();
