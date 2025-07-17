import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { LoggerMiddleware } from '@common/middlewares/logger.middleware';
import { CONFIGURATION, TConfiguration } from '../configuration';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from '@common/interceptors/exception.interceptor';
import { ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TCP_SERVICES, TcpProvider } from '@common/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ ...CONFIGURATION })],
    }),
    ClientsModule.registerAsync([TcpProvider(TCP_SERVICES.INVOICE_SERVICE)]),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
