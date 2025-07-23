import { KAFKA_CONSUMER_OPTIONS, KAFKA_PRODUCER_OPTIONS } from '../../constants/kafka.constant';
import { KafkaConsumerOptions, KafkaProducerOptions } from '../../types/kafka.type';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaClient } from './services/kafka-client.service';
import { hostname } from 'os';
import { KAFKA_GROUPS } from '@common/constants/enums/kafka.enum';
import { KafkaConsumerService } from './services/kafka-consumer.service';
import { DiscoveryModule } from '@nestjs/core';

@Global()
@Module({
  imports: [DiscoveryModule, ConfigModule],
})
export class KafkaModule {
  static forProducerAsync(
    options: Pick<Partial<KafkaProducerOptions>, 'url'> & Omit<KafkaProducerOptions, 'url'>,
  ): DynamicModule {
    return {
      module: KafkaModule,
      global: true,
      imports: [ConfigModule],
      providers: [
        KafkaClient,
        {
          provide: KAFKA_PRODUCER_OPTIONS,
          useFactory: (configService: ConfigService): KafkaProducerOptions => {
            const url: string[] = options?.url || configService.get<string>('KAFKA_CONFIG.URL')?.split(',') || [];

            return {
              url,
              serviceName: options.serviceName,
            };
          },
          inject: [ConfigService],
        },
      ],
      exports: [KafkaClient],
    };
  }

  static forConsumerAsync(
    options: Pick<Partial<KafkaConsumerOptions>, 'url'> & Omit<KafkaConsumerOptions, 'url'>,
  ): DynamicModule {
    return {
      module: KafkaModule,
      imports: [ConfigModule],
      global: true,
      providers: [
        KafkaConsumerService,
        {
          provide: KAFKA_CONSUMER_OPTIONS,
          useFactory: (configService: ConfigService): KafkaConsumerOptions => {
            const url: string[] = options?.url || [configService.get<string>('KAFKA_CONFIG.URL') || ''];
            return {
              url,
              serviceName: options?.serviceName || hostname() || '',
              groupId: options?.groupId || KAFKA_GROUPS.DEFAULT,
            };
          },
          inject: [ConfigService],
        },
      ],
      exports: [KafkaConsumerService],
    };
  }
}
