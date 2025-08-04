import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from '@common/middlewares/logger.middleware';
import { CONFIGURATION, TConfiguration } from '../configuration';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from '@common/interceptors/exception.interceptor';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { UserModule } from './modules/user/user.module';
import { ClientsModule } from '@nestjs/microservices';
import { GRPC_SERVICES, GrpcProvider } from '@common/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ ...CONFIGURATION })],
    }),
    ClientsModule.registerAsync([GrpcProvider(GRPC_SERVICES.AUTHORIZER_SERVICE)]),
    ProductModule,
    InvoiceModule,
    UserModule,
  ],
  controllers: [],
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
