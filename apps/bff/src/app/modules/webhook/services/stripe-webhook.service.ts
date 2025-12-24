import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import Stripe from 'stripe';

@Injectable()
export class StripeWebhookService {
  private readonly logger = new Logger(StripeWebhookService.name);
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    @Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceClient: TcpClient,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_CONFIG.SECRET_KEY'), {
      apiVersion: '2025-10-29.clover',
    });
  }

  async processWebhook(params: { signature: string; rawBody: Buffer; processId: string }) {
    const { rawBody, signature, processId } = params;

    const event = this.verifyWebhookSignature(rawBody, signature);
    this.logger.debug('Received event: ', JSON.stringify(event, null, 2));

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.invoiceId) {
          this.logger.log(`Payment received for invoice ${session.metadata.invoiceId}`);
          await this.updateInvoicePaid({ invoiceId: session.metadata.invoiceId, processId });
        }

        break;
      }

      default:
        this.logger.log(`Unhandled event type ${event.type}`);
    }
  }

  verifyWebhookSignature(body: Buffer, signature: string) {
    return this.stripe.webhooks.constructEvent(body, signature, this.configService.get('STRIPE_CONFIG.WEBHOOK_SECRET'));
  }

  updateInvoicePaid(params: { invoiceId: string; processId: string }) {
    const { invoiceId, processId } = params;

    return firstValueFrom(
      this.invoiceClient
        .send<string, string>(TCP_REQUEST_MESSAGE.INVOICE.UPDATE_INVOICE_PAID, {
          data: invoiceId,
          processId,
        })
        .pipe(map((data) => data.data)),
    );
  }
}
