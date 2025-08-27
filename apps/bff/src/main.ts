/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const globalPrefix = AppModule.CONFIGURATION.GLOBAL_PREFIX;
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    app.enableCors({
      origin: '*',
    });

    const config = new DocumentBuilder()
      .setTitle('Einvoice-bff API')
      .setDescription('The Einvoice-bff API description')
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
    SwaggerModule.setup(`${globalPrefix}/docs`, app, documentFactory);

    const port = AppModule.CONFIGURATION.APP_CONFIG.PORT;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}/docs`);
  } catch (error) {
    Logger.error(`❌ Application failed to start: ${error}`, '', 'Bootstrap', false);
  }
}

bootstrap();
