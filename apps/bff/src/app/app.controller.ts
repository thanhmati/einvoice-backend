import { TCP_SERVICES } from '@common/configuration';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { ResponseDto } from '@common/interfaces/gateway/common/response.interface';
import { map } from 'rxjs';
import { ProcessID } from '@common/decorators/processID.decorator';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { KafkaClient } from '@common/queue/modules/kafka/services/kafka-client.service';
import { KAFKA_TOPICS } from '@common/constants/kafka.constant';

@Controller('app')
@ApiTags('App')
export class AppController {
  constructor(
    @Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceService: TcpClient,
    private readonly kafkaClient: KafkaClient,
  ) {}

  @Get()
  async get(@ProcessID() processID: string) {
    this.kafkaClient.send<string>(KAFKA_TOPICS.INVOICE.GET_BY_ID, 'hello');

    return this.invoiceService
      .send<string, number>(TCP_REQUEST_MESSAGE.INVOICE.GET_BY_ID, { data: 1, processID })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
