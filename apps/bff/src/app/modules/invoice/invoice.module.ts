import { Module } from '@nestjs/common';

import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';
import { InvoiceController } from './controllers/invoice.controller';

@Module({
  imports: [],
  controllers: [InvoiceController],
  providers: [TcpProvider(TCP_SERVICES.INVOICE_SERVICE)],
  exports: [],
})
export class InvoiceModule {}
