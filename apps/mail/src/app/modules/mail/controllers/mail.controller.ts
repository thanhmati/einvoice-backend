import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InvoiceSentPayload } from '@common/interfaces/queue/invoice';
import { MailInvoiceService } from '../services/mail-invoice.service';

@Controller()
export class MailController {
  constructor(private readonly mailInvoiceService: MailInvoiceService) {}

  @EventPattern('invoice-sent')
  async invoiceSentEvent(@Payload() payload: InvoiceSentPayload) {
    await this.mailInvoiceService.sendInvoice(payload);
  }
}
