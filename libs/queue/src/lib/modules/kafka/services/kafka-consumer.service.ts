import { Injectable, Logger, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { Consumer, EachMessagePayload, Kafka } from 'kafkajs';
import { KafkaConsumerOptions, KafkaPayload } from '../../../types/kafka.type';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { KAFKA_HANDLER_METADATA, KafkaHandlerMetadata } from '@common/decorators/kafka-handler.decorator';
import { hostname } from 'os';
import { KAFKA_CONSUMER_OPTIONS } from '../../../constants/kafka.constant';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaConsumerService.name);
  private consumer: Consumer;
  private kafka: Kafka;

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    @Inject(KAFKA_CONSUMER_OPTIONS) private readonly options: KafkaConsumerOptions,
  ) {
    this.kafka = new Kafka({
      clientId: this.options.serviceName + '-' + hostname(),
      brokers: this.options.url,
    });

    this.consumer = this.kafka.consumer({
      groupId: this.options.groupId,
      allowAutoTopicCreation: true,
    });
  }

  async onModuleInit() {
    await this.consumer.connect();

    const providers = this.discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.instance && typeof wrapper.instance === 'object');

    for (const wrapper of providers) {
      const { instance } = wrapper;

      const prototype = Object.getPrototypeOf(instance);

      const methodNames = Object.getOwnPropertyNames(prototype).filter(
        (method) => typeof instance[method] === 'function' && method !== 'constructor',
      );

      for (const methodName of methodNames) {
        const handler = instance[methodName];

        const metaData = this.reflector.get<KafkaHandlerMetadata>(KAFKA_HANDLER_METADATA, handler);

        if (metaData?.topic) {
          this.logger.log(`Registering Kafka handler: [${metaData.topic}] -> ${wrapper.metatype?.name}.${methodName}`);

          await this.consumer.subscribe({ topic: metaData.topic, fromBeginning: false });

          await this.consumer.run({
            eachMessage: async (context: EachMessagePayload) => {
              const { topic: msgTopic, message } = context;
              if (msgTopic !== metaData.topic) return;

              try {
                const value = message.value?.toString();
                const parsed = value ? JSON.parse(value) : null;
                const payload: KafkaPayload<any> = {
                  context,
                  message: parsed,
                };

                await handler.call(instance, payload);
              } catch (error) {
                this.logger.error(`Error handling message for topic ${msgTopic}:`, error);
              }
            },
          });
        }
      }
    }
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}
