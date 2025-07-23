import { KafkaProducerOptions } from '../../../types/kafka.type';
import { KAFKA_PRODUCER_OPTIONS } from '../../../constants/kafka.constant';
import { Inject, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { CompressionTypes, Kafka, Producer } from 'kafkajs';
import { hostname } from 'os';

@Injectable()
export class KafkaClient implements OnModuleInit, OnModuleDestroy {
  private producer: Producer | undefined;

  constructor(
    @Inject(KAFKA_PRODUCER_OPTIONS)
    private readonly options: KafkaProducerOptions,
  ) {}

  async onModuleInit() {
    const kafka = new Kafka({
      clientId: this.options.serviceName + '-' + hostname(),
      brokers: this.options.url,
    });

    this.producer = kafka.producer({
      allowAutoTopicCreation: true,
      retry: {
        retries: 3,
      },
    });
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer?.disconnect();
  }

  async send<T>(topic: string, message: T) {
    await this.producer?.send({
      topic,
      compression: CompressionTypes.GZIP,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
