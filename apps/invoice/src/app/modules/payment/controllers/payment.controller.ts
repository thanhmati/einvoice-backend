import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { Controller, UseInterceptors } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { MessagePattern } from '@nestjs/microservices';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { RequestParams } from '@common/decorators/request-params.decorator';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { StripeWebhookTcpReq } from '@common/interfaces/tcp/payment';
import { HTTP_MESSAGE } from '@common/constants/enums/http-message.enum';

@UseInterceptors(TcpLoggingInterceptor)
@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern(TCP_REQUEST_MESSAGE.PAYMENT.STRIPE_WEBHOOK)
  async stripeWebhook(@RequestParams() params: StripeWebhookTcpReq): Promise<Response<string>> {
    await this.paymentService.stripeWebhook(params);
    return Response.success<string>(HTTP_MESSAGE.OK);
  }
}
