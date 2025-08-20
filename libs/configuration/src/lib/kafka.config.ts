import { KafkaOptions, Transport } from '@nestjs/microservices';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { hostname } from 'os';
import { KAFKA_SERVICES, KAFKA_GROUPS } from '@common/constants/enums/kafka.enum';

export class KafkaConfiguration {
  @IsString()
  @IsNotEmpty()
  HOST: string;

  @IsNumber()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  URL: string;

  @IsNumber()
  @IsNotEmpty()
  BROKER_QUANTITY: number;

  constructor(data?: Partial<KafkaConfiguration>) {
    this.HOST = data?.HOST || process.env['KAFKA_HOST'] || 'kafka';
    this.PORT = data?.PORT || Number(process.env['KAFKA_PORT']) || 9092;
    this.URL = data?.URL || process.env['KAFKA_URL'] || `${this.HOST}:${this.PORT}`;

    this.BROKER_QUANTITY = data?.BROKER_QUANTITY || Number(process.env['KAFKA_BROKER_QUANTITY']) || 1;
  }
}

export function KafkaServiceOptions({
  serviceName,
  groupId,
  url,
}: {
  serviceName: KAFKA_SERVICES;
  groupId: KAFKA_GROUPS;
  autoCommit?: boolean;
  url?: string;
}): KafkaOptions {
  const queueConfig = new KafkaConfiguration();

  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: `${serviceName}-${hostname()}`,
        brokers: [url || queueConfig.URL],
      },
      consumer: {
        groupId,
        allowAutoTopicCreation: true,
      },
    },
  };
}
