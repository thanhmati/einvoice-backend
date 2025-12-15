import { Module } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { StripeService } from './services/stripe.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PaymentService, StripeService],
  exports: [PaymentService],
})
export class PaymentModule {}
