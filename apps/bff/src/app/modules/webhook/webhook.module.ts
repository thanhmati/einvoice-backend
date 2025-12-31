import { Module } from '@nestjs/common';
import { WebhookController } from './controllers/webhook.controller';

import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';
import { StripeWebhookService } from './services/stripe-webhook.service';

@Module({
  imports: [],
  controllers: [WebhookController],
  providers: [StripeWebhookService, TcpProvider(TCP_SERVICES.INVOICE_SERVICE)],
})
export class WebhookModule {}
