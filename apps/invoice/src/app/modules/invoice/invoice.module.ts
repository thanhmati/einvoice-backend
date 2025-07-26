import { Module } from '@nestjs/common';
import { KafkaModule } from '@common/queue/modules/kafka/kafka.module';
import { KAFKA_GROUPS, KAFKA_SERVICES } from '@common/constants/enums/kafka.enum';

@Module({
  imports: [KafkaModule.forConsumerAsync({ serviceName: KAFKA_SERVICES.INVOICE, groupId: KAFKA_GROUPS.INVOICE })],
  controllers: [],
  providers: [],
})
export class InvoiceModule {}
