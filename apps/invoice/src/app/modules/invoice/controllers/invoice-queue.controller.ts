import { QUEUE_TOPICS } from '@common/constants/enum/queue.enum';
import { Controller, Logger } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class InvoiceQueueController {
  @MessagePattern(QUEUE_TOPICS.INVOICE_SENT)
  async sendInvoice(@Payload() message: any, @Ctx() context: KafkaContext) {
    Logger.debug({ message, context });
  }
}
