import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { createTcpProxyModule } from '@common/utils/tcp-proxy-module.util';
import { InvoiceController } from './controllers/invoice.controller';

export const InvoiceModule = createTcpProxyModule(
  InvoiceController,
  TCP_SERVICES.INVOICE_SERVICE,
);
