import { Controller, UseInterceptors } from '@nestjs/common';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { MessagePattern } from '@nestjs/microservices';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { RequestParams } from '@common/decorators/request-params.decorator';
import { CreateInvoiceTcpReq, PaginateInvoiceTcpReq, PaginateInvoiceTcpRes } from '@common/interfaces/tcp/invoice';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { HTTP_MESSAGE } from '@common/constants/enums/http-message.enum';
import { InvoiceService } from '../services/invoice.service';

@UseInterceptors(TcpLoggingInterceptor)
@Controller()
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.CREATE)
  async create(@RequestParams() params: CreateInvoiceTcpReq): Promise<Response<string>> {
    await this.invoiceService.create(params);
    return Response.success<string>(HTTP_MESSAGE.CREATED);
  }

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.PAGINATE)
  async paginate(@RequestParams() params: PaginateInvoiceTcpReq): Promise<Response<PaginateInvoiceTcpRes>> {
    const result = await this.invoiceService.paginate(params);
    return Response.success<PaginateInvoiceTcpRes>(result);
  }
}
