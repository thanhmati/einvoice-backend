import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { ProcessID } from '@common/decorators/processID.decorator';
import { ResponseDto } from '@common/interfaces/gateway/common/response.interface';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { Controller, Headers, Inject, Post, RawBodyRequest, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs';
import { StripeWebhookTcpReq } from '@common/interfaces/tcp/payment';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(@Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceClient: TcpClient) {}

  @Post('stripe/webhook')
  @ApiOperation({
    summary: 'Stripe Webhook',
  })
  @ApiOkResponse({
    type: ResponseDto<string>,
  })
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
    @ProcessID() processID: string,
  ) {
    return this.invoiceClient
      .send<string, StripeWebhookTcpReq>(TCP_REQUEST_MESSAGE.PAYMENT.STRIPE_WEBHOOK, {
        data: { rawBodyBase64: req.rawBody.toString('base64'), signature },
        processID,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
