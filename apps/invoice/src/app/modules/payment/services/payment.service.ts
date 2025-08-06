import { Injectable } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateCheckoutSessionRequest } from '@common/interfaces/common/stripe.interface';

@Injectable()
export class PaymentService {
  constructor(private readonly stripeService: StripeService) {}

  createCheckoutSession(data: CreateCheckoutSessionRequest) {
    return this.stripeService.createCheckoutSession(data);
  }
}
