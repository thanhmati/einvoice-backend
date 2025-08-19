import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from '@common/middlewares/logger.middleware';
import { CONFIGURATION, TConfiguration } from '../configuration';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from '@common/interceptors/exception.interceptor';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { UserModule } from './modules/user/user.module';
import { ClientsModule } from '@nestjs/microservices';
import { GRPC_SERVICES, GrpcProvider, ThrottlerProvider } from '@common/configuration';
import { UserGuard } from '@common/guard/user.guard';
import { AuthorizerModule } from './modules/authorizer/authorizer.module';
import { RedisProvider } from '@common/configuration';
import { PaymentModule } from './modules/payment/payment.module';
import { ThrottlerGuard } from '@nestjs/throttler';
import { PermissionGuard } from '@common/guard/permission.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ ...CONFIGURATION })],
    }),
    RedisProvider,
    ClientsModule.registerAsync([GrpcProvider(GRPC_SERVICES.AUTHORIZER_SERVICE)]),
    ProductModule,
    InvoiceModule,
    PaymentModule,
    UserModule,
    AuthorizerModule,
    ThrottlerProvider,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    },
    { provide: APP_GUARD, useClass: UserGuard },
    { provide: APP_GUARD, useClass: PermissionGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule implements NestModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
