import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';

@Controller('app')
@UseInterceptors(TcpLoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('get_invoice_by_id')
  getInvoiceById(params: { data: number }) {
    return Response.success<number>(params.data);
  }
}
