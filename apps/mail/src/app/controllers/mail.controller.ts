import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';

@Controller()
export class MailController {
  @EventPattern('invoice-sent')
  invoiceSentEvent(@Payload() payload: any, @Ctx() context: KafkaContext) {
    Logger.debug({ payload, context });
  }
}
