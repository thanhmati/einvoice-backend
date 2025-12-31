import { Module } from '@nestjs/common';
import { CONFIGURATION, TConfiguration } from '../configuration';
import { ConfigModule } from '@nestjs/config';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { PaymentModule } from './modules/payment/payment.module';
import { LoggerModule } from '@common/observability/logger';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TcpServerTracingInterceptor } from '@common/interceptors/tracing-server.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => CONFIGURATION] }),
    InvoiceModule,
    PaymentModule,
    LoggerModule.forRoot('invoice'),
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: TcpServerTracingInterceptor }],
})
export class AppModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;
}
