import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { MailController } from './controllers/mail.controller';
import { ClientsModule } from '@nestjs/microservices';
import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';
import { MailInvoiceService } from './services/mail-invoice.service';
import { MailTemplateModule } from '../mail-template/mail-template.module';

@Module({
  imports: [ClientsModule.registerAsync([TcpProvider(TCP_SERVICES.INVOICE_SERVICE)]), MailTemplateModule],
  controllers: [MailController],
  providers: [MailService, MailInvoiceService],
  exports: [MailService],
})
export class MailModule {}
