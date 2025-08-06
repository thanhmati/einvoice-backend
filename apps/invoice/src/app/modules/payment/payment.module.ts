import { Module } from '@nestjs/common';
import { StripeService } from './services/stripe.service';
import { PaymentService } from './services/payment.service';

@Module({
  imports: [],
  controllers: [],
  providers: [StripeService, PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
