import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from 'rxjs';

@Controller('app')
@ApiTags('App')
export class AppController {
    constructor(
    @Inject('INVOICE_SERVICE') private readonly invoiceClient: ClientProxy,
  ) {}

  @Get()
  async get(): Promise<any> {
    const invoice$ = this.invoiceClient.send(
      { cmd: 'get_invoice_by_id' },
      1, // giả định ID = 1
    );
    return await firstValueFrom(invoice$);
  }
}