import { KafkaHandler } from '@common/decorators/kafka-handler.decorator';
import { Injectable, Logger } from '@nestjs/common';
import { KAFKA_TOPICS } from '@common/constants/kafka.constant';
import { KafkaPayload } from '@common/queue/types/kafka.type';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  getData(): { message: string } {
    this.logger.debug('call api');

    return { message: 'Hello API' };
  }

  @KafkaHandler(KAFKA_TOPICS.INVOICE.GET_BY_ID)
  getInvoiceByIdKafka(payload: KafkaPayload<string>) {
    this.logger.log('Kafka message: ', payload.message);
  }
}
