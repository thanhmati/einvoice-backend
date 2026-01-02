import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { MailController } from './controllers/mail.controller';
import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';
import { MailInvoiceService } from './services/mail-invoice.service';
import { MailTemplateModule } from '../mail-template/mail-template.module';

@Module({
  imports: [MailTemplateModule],
  controllers: [MailController],
  providers: [MailService, MailInvoiceService, TcpProvider(TCP_SERVICES.INVOICE_SERVICE)],
  exports: [MailService],
})
export class MailModule {}
