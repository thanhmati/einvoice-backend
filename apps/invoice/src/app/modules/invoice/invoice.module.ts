import { forwardRef, Module } from '@nestjs/common';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';
import { InvoiceRepository } from './repositories/invoice.repository';
import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';
import { MongoProvider } from '@common/configuration/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceDestination } from '@common/schemas/invoice/invoice.schema';
import { ClientsModule } from '@nestjs/microservices';
import { PaymentModule } from '../payment/payment.module';
import { OutboxDestination } from '@common/schemas/outbox.schema';
import { InvoiceSagaDestination } from '@common/schemas/invoice/invoice-saga.schema';
import { OutboxRepository } from './repositories/outbox.repository';
import { OutboxRelayService } from './services/outbox-relay.service';

@Module({
  imports: [
    MongoProvider,
    MongooseModule.forFeature([InvoiceDestination, OutboxDestination, InvoiceSagaDestination]),
    ClientsModule.registerAsync([
      TcpProvider(TCP_SERVICES.PDF_GENERATOR_SERVICE),
      TcpProvider(TCP_SERVICES.MEDIA_SERVICE),
    ]),
    forwardRef(() => PaymentModule),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepository, OutboxRepository, OutboxRelayService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
