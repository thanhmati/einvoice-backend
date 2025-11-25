import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { MailService } from '../modules/mail/services/mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @EventPattern('invoice-sent')
  invoiceSentEvent(@Payload() payload: { invoiceId: string; clientEmail: string }, @Ctx() context: KafkaContext) {
    Logger.debug({ payload, context });

    this.mailService.sendMail({
      subject: 'Mail invoice',
      to: payload.clientEmail,
      text: `Invoice: ${payload.invoiceId}`,
    });
  }
}
