/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@common/interceptors/http-exception.filter';

async function bootstrap() {

  const isDev = AppModule.CONFIGURATION.IS_DEV;
  const globalPrefix = AppModule.CONFIGURATION.GLOBAL_PREFIX;
  const port = AppModule.CONFIGURATION.APP_CONFIG.PORT || 3000;

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: isDev ? ['error', 'warn', 'log', 'debug', 'verbose'] : ['error', 'warn', 'log'],
  });

  app.enableCors({
    origin: '*',
  });

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  if (isDev) {
    const config = new DocumentBuilder()
      .setTitle('E-bff API')
      .setDescription('The E-bff API description')
      .setVersion('1.0.0')
      .addBearerAuth({
        description: 'Default JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
      })
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, documentFactory, {
      swaggerOptions: {
        filter: true,
      },
    });
  }



  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}/docs`
  );
}

bootstrap();
