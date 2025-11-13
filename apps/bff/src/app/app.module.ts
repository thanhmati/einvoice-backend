import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION, TConfiguration } from '../configuration';
import { LoggerMiddleware } from '@common/middlewares/logger.middleware';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from '@common/interceptors/exception.interceptor';

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
import { KafkaModule } from '@common/kafka/kafka.module';
import { QUEUE_SERVICES } from '@common/constants/enum/queue.enum';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => CONFIGURATION] }),
    InvoiceModule,
    ProductModule,
    UserModule,
    AuthorizerModule,
    ClientsModule.registerAsync([TcpProvider(TCP_SERVICES.AUTHORIZER_SERVICE)]),
    RedisProvider,
    ClientsModule.registerAsync([GrpcProvider(GRPC_SERVICES.AUTHORIZER_SERVICE)]),
    KafkaModule.register(QUEUE_SERVICES.BFF),
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
  ],
})
export class AppModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
