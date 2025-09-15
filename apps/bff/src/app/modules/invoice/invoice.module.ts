import { Module } from '@nestjs/common';
import { InvoiceController } from './controllers/invoice.controller';
import { ClientsModule } from '@nestjs/microservices';
import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';

@Module({
  imports: [ClientsModule.registerAsync([TcpProvider(TCP_SERVICES.INVOICE_SERVICE)])],
  controllers: [InvoiceController],
  providers: [],
})
export class InvoiceModule {}
