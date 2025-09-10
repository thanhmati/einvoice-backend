import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { firstValueFrom, map } from 'rxjs';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('TCP_INVOICE_SERVICE') private readonly invoiceClient: TcpClient,
  ) {}

  @Get()
  getData() {
    const result = this.appService.getData();
    return new ResponseDto({ data: result });
  }

  @Get('invoice')
  async getInvoice() {
    return this.invoiceClient
      .send<string, number>('get_invoice', { processId: '1232', data: 1 })
      .pipe(map((data) => new ResponseDto<string>(data)));
  }
}
