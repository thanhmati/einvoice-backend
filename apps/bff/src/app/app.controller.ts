import { TCP_SERVICES } from '@common/configuration';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { ResponseDto } from '@common/interfaces/gateway/common/response.interface';
import { map } from 'rxjs';
import { ProcessID } from '@common/decorators/processID.decorator';

@Controller('app')
@ApiTags('App')
export class AppController {
  constructor(@Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceService: TcpClient) { }

  @Get()
  async get(@ProcessID() processID: string) {
    return this.invoiceService
      .send<string, number>('get_invoice_by_id', { data: 1, processID })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
