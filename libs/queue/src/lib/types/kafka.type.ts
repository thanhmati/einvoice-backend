import { KAFKA_GROUPS } from '@common/constants/enums/kafka.enum';
import { EachMessagePayload } from 'kafkajs';

export type KafkaConsumerOptions = {
  url: string[];
  serviceName: string;
  groupId: KAFKA_GROUPS;
};

export type KafkaProducerOptions = {
  url: string[];
  serviceName: string;
};

export type KafkaPayload<T> = {
  message: T;
  context: MessageContext;
};

export type MessageContext = EachMessagePayload;
