import { CreateCheckoutSessionRequest } from '@common/interfaces/common';
import { Injectable, Logger } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(private readonly stripeService: StripeService) {}

  createCheckoutSession(params: CreateCheckoutSessionRequest) {
    return this.stripeService.createCheckoutSession(params);
  }
}
