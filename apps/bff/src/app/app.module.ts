import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION, TConfiguration } from '../configuration';
import { LoggerModule } from '@common/observability/logger';
import { MetricsModule } from '@common/observability/metrics';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from '@common/interceptors/exception.interceptor';
import { LoggerMiddleware } from '@common/middlewares/logger.middleware';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { AuthorizerModule } from './modules/authorizer/authorizer.module';
import { UserGuard } from '@common/guards/user.guard';
import { ClientsModule } from '@nestjs/microservices';
import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';
import { PermissionGuard } from '@common/guards/permission.guard';
import { RedisProvider } from '@common/configuration/redis.config';
import { GRPC_SERVICES, GrpcProvider } from '@common/configuration/grpc.config';
import { WebhookModule } from './modules/webhook/webhook.module';
import { ThrottlerProvider } from '@common/configuration/throttler.config';
import { ThrottlerGuard } from '@nestjs/throttler';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => CONFIGURATION] }),
    InvoiceModule,
    ProductModule,
    UserModule,
    AuthorizerModule,
    RedisProvider,
    ThrottlerProvider,
    ClientsModule.registerAsync([GrpcProvider(GRPC_SERVICES.AUTHORIZER_SERVICE)]),
    WebhookModule,
    HealthModule,
    LoggerModule.forRoot('bff'),
    MetricsModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor },
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    TcpProvider(TCP_SERVICES.AUTHORIZER_SERVICE),
  ],
})
export class AppModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
