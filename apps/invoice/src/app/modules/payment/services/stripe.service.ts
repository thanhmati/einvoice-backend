import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateCheckoutSessionRequest } from '@common/interfaces/common/stripe.interface';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_CONFIG.SECRET_KEY'), {
      apiVersion: '2025-07-30.basil',
    });
  }

  async createCheckoutSession(data: CreateCheckoutSessionRequest) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: data.lineItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      customer_email: data.clientEmail,
      success_url: `${this.configService.get('STRIPE_CONFIG.SUCCESS_URL')}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: this.configService.get('STRIPE_CONFIG.CANCEL_URL'),
      metadata: {
        invoiceId: data.invoiceId,
      },
    });

    return {
      url: session.url,
      sessionId: session.id,
    };
  }

  verifyWebhookSignature(body: Buffer, signature: string) {
    return this.stripe.webhooks.constructEvent(body, signature, this.configService.get('STRIPE_CONFIG.WEBHOOK_SECRET'));
  }
}
