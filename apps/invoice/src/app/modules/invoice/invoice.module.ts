import { MongoProvider } from '@common/configuration/mongo.config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceDestination } from '@common/schemas/invoice.schema';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';
import { InvoiceRepository } from './repositories/invoice.repository';
import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';
import { PaymentModule } from '../payment/payment.module';
import { KafkaModule } from '@common/kafka/kafka.module';
import { QUEUE_SERVICES } from '@common/constants/enum/queue.enum';
import { SagaOrchestrationModule } from '@common/saga-orchestration';
import { InvoiceSendSagaSteps } from './sagas/invoice-send-saga-steps.service';

@Module({
  imports: [
    MongoProvider,
    MongooseModule.forFeature([InvoiceDestination]),
    PaymentModule,
    KafkaModule.register(QUEUE_SERVICES.INVOICE),
    SagaOrchestrationModule.forRoot(),
  ],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    InvoiceRepository,
    InvoiceSendSagaSteps,
    TcpProvider(TCP_SERVICES.PDF_GENERATOR_SERVICE),
    TcpProvider(TCP_SERVICES.MEDIA_SERVICE),
  ],
})
export class InvoiceModule {}
