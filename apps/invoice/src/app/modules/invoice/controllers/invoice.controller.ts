import { Controller, UseInterceptors } from '@nestjs/common';
import { InvoiceService } from '../services/invoice.service';
import { MessagePattern } from '@nestjs/microservices';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { TcpServerTracingInterceptor } from '@common/interceptors/tracing-server.interceptor';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { RequestParams } from '@common/decorators/request-param.decorator';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { CreateInvoiceTcpRequest, InvoiceTcpResponse, SendInvoiceTcpReq } from '@common/interfaces/tcp/invoice';
import { HTTP_MESSAGE } from '@common/constants/enum/http-message.enum';

@Controller()
@UseInterceptors(TcpServerTracingInterceptor, TcpLoggingInterceptor)
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.CREATE)
  async create(@RequestParams() params: CreateInvoiceTcpRequest): Promise<Response<InvoiceTcpResponse>> {
    const result = await this.invoiceService.create(params);

    return Response.success<InvoiceTcpResponse>(result);
  }

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.SEND)
  async sendById(@RequestParams() params: SendInvoiceTcpReq): Promise<Response<string>> {
    await this.invoiceService.sendById(params);
    return Response.success<string>(HTTP_MESSAGE.OK);
  }

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.UPDATE_INVOICE_PAID)
  async updateInvoicePaid(@RequestParams() invoiceId: string): Promise<Response<string>> {
    await this.invoiceService.updateInvoicePaid(invoiceId);
    return Response.success<string>(HTTP_MESSAGE.UPDATED);
  }

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.GET_BY_ID)
  async getInvoiceById(@RequestParams() invoiceId: string) {
    const invoice = await this.invoiceService.getById(invoiceId);
    return Response.success<InvoiceTcpResponse>(invoice);
  }
}
