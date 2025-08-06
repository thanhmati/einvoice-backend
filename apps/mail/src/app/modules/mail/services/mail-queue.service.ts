import { KafkaHandler } from '@common/decorators/kafka-handler.decorator';
import { Injectable } from '@nestjs/common';
import { KAFKA_TOPICS } from '@common/constants/kafka.constant';
import { KafkaPayload } from '@common/queue/types/kafka.type';
import { InvoiceSentPayload } from '@common/interfaces/queue/invoice';
import { MailInvoiceService } from './mail-invoice.service';

@Injectable()
export class MailQueueService {
  constructor(private readonly mailInvoiceService: MailInvoiceService) {}

  @KafkaHandler(KAFKA_TOPICS.INVOICE.SENT)
  async eventInvoiceSent(payload: KafkaPayload<InvoiceSentPayload>) {
    const { message } = payload;

    await this.mailInvoiceService.sendInvoice(message);
  }
}
