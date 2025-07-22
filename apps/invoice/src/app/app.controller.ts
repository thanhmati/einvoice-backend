import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';

@Controller('app')
@UseInterceptors(TcpLoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.GET_BY_ID)
  getInvoiceById(params: { data: number }) {
    return Response.success<number>(params.data);
  }
}
