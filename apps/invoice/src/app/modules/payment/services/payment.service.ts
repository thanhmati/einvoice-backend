import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateCheckoutSessionRequest } from '@common/interfaces/common/stripe.interface';
import { StripeWebhookTcpReq } from '@common/interfaces/tcp/payment';
import Stripe from 'stripe';
import { InvoiceService } from '../../invoice/services/invoice.service';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  constructor(
    private readonly stripeService: StripeService,
    @Inject(forwardRef(() => InvoiceService)) private readonly invoiceService: InvoiceService,
  ) {}

  createCheckoutSession(data: CreateCheckoutSessionRequest) {
    return this.stripeService.createCheckoutSession(data);
  }

  async stripeWebhook(data: StripeWebhookTcpReq) {
    const { rawBodyBase64, signature } = data;

    const event = this.stripeService.verifyWebhookSignature(Buffer.from(rawBodyBase64, 'base64'), signature);
    this.logger.debug('Received event: ' + event);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.invoiceId) {
          this.logger.log(`Payment received for invoice ${session.metadata.invoiceId}`);

          await this.invoiceService.paySuccess(session.metadata.invoiceId);
        }

        break;
      }

      default:
        this.logger.log(`Unhandled event type ${event.type}`);
    }
  }
}
