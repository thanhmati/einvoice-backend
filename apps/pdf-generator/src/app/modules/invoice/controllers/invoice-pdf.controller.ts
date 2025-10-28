import { Controller, UseInterceptors } from '@nestjs/common';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { MessagePattern } from '@nestjs/microservices';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { RequestParams } from '@common/decorators/request-param.decorator';
import { Invoice } from '@common/schemas/invoice.schema';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { InvoicePdfService } from '../services/invoice-pdf.service';

@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class InvoicePdfController {
  constructor(private readonly invoicePdfService: InvoicePdfService) {}

  @MessagePattern(TCP_REQUEST_MESSAGE.PDF_GENERATOR.CREATE_INVOICE_PDF)
  async generateInvoicePdf(@RequestParams() params: Invoice): Promise<Response<string>> {
    const buffer = await this.invoicePdfService.generateInvoicePdf(params);

    return Response.success<string>(Buffer.from(buffer).toString('base64'));
  }
}
