import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION, TConfiguration } from '../configuration';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { ProductModule } from './modules/product/product.module';
import { KafkaModule } from '@common/queue/modules/kafka/kafka.module';
import { KAFKA_SERVICES } from '@common/constants/enums/kafka.enum';
import { PaymentModule } from './modules/payment/payment.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ ...CONFIGURATION })],
    }),
    ScheduleModule.forRoot(),
    InvoiceModule,
    ProductModule,
    PaymentModule,
    KafkaModule.forProducerAsync({ serviceName: KAFKA_SERVICES.INVOICE }),
  ],

  providers: [],
})
export class AppModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;
}
