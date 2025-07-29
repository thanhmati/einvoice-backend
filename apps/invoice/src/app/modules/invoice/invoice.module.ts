import { Module } from '@nestjs/common';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';
import { InvoiceRepository } from './repositories/invoice.repository';
import { MongoProvider, TCP_SERVICES, TcpProvider } from '@common/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceDestination } from '@common/schemas/invoice/invoice.schema';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    MongoProvider,
    MongooseModule.forFeature([InvoiceDestination]),
    ClientsModule.registerAsync([TcpProvider(TCP_SERVICES.PDF_GENERATOR_SERVICE)]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepository],
})
export class InvoiceModule {}
