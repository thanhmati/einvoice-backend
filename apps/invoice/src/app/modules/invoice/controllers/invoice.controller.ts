import { Controller, UseInterceptors } from '@nestjs/common';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { MessagePattern } from '@nestjs/microservices';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { RequestParams } from '@common/decorators/request-params.decorator';
import {
  CreateInvoiceTcpReq,
  GetDetailInvoiceTcpRes,
  PaginateInvoiceTcpReq,
  PaginateInvoiceTcpRes,
  UpdateInvoiceTcpReq,
} from '@common/interfaces/tcp/invoice';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { HTTP_MESSAGE } from '@common/constants/enums/http-message.enum';
import { InvoiceService } from '../services/invoice.service';

@UseInterceptors(TcpLoggingInterceptor)
@Controller()
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

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

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.GET_BY_ID)
  async getById(@RequestParams() id: string): Promise<Response<GetDetailInvoiceTcpRes>> {
    const result = await this.invoiceService.getById(id);
    return Response.success<GetDetailInvoiceTcpRes>(result);
  }

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.UPDATE)
  async updateById(@RequestParams() params: UpdateInvoiceTcpReq): Promise<Response<string>> {
    await this.invoiceService.updateById(params);
    return Response.success<string>(HTTP_MESSAGE.UPDATED);
  }

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.DELETE)
  async deleteById(@RequestParams() id: string): Promise<Response<string>> {
    await this.invoiceService.deleteById(id);
    return Response.success<string>(HTTP_MESSAGE.DELETED);
  }

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.SEND)
  async sendById(@RequestParams() id: string): Promise<Response<string>> {
    await this.invoiceService.sendById(id);
    return Response.success<string>(HTTP_MESSAGE.SENT);
  }
}
