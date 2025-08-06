import { forwardRef, Module } from '@nestjs/common';
import { StripeService } from './services/stripe.service';
import { PaymentService } from './services/payment.service';
import { InvoiceModule } from '../invoice/invoice.module';
import { PaymentController } from './controllers/payment.controller';

@Module({
  imports: [forwardRef(() => InvoiceModule)],
  controllers: [PaymentController],
  providers: [StripeService, PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
