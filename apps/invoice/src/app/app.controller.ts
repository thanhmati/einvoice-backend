import { Controller, Get, Logger, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { ProcessId } from '@common/decorators/processId.decorator';
import { RequestParams } from '@common/decorators/request-param.decorator';

@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('get_invoice')
  getInvoice(
    @ProcessId() processId: string,
    @RequestParams() params: { invoiceId: string; invoiceName: string },
    @RequestParams('invoiceId') invoiceId: string,
  ): Response<string> {
    Logger.debug('processId', processId);
    Logger.debug('params', params);
    Logger.debug('invoiceId', invoiceId);

    return Response.success<string>(`Invoice ${invoiceId}`);
  }
}
