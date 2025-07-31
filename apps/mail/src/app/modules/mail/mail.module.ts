import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { MailTemplateModule } from '../mail-template/mail-template.module';
import { MailQueueService } from './services/mail-queue.service';
import { MailInvoiceService } from './services/mail-invoice.service';
import { ClientsModule } from '@nestjs/microservices';
import { TCP_SERVICES, TcpProvider } from '@common/configuration';

@Module({
  imports: [MailTemplateModule, ClientsModule.registerAsync([TcpProvider(TCP_SERVICES.INVOICE_SERVICE)])],
  controllers: [],
  providers: [MailService, MailQueueService, MailInvoiceService],
})
export class MailModule {}
