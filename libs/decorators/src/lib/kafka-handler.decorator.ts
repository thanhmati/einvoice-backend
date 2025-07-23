import { applyDecorators, SetMetadata } from '@nestjs/common';

export interface KafkaHandlerMetadata {
  topic: string;
  autoCommit?: boolean;
}

export const KAFKA_HANDLER_METADATA = 'KAFKA_HANDLER_METADATA';

export function KafkaHandler(topic: string, options?: Omit<KafkaHandlerMetadata, 'topic'>): MethodDecorator {
  return applyDecorators(
    SetMetadata(KAFKA_HANDLER_METADATA, {
      topic,
      ...options,
    } as KafkaHandlerMetadata),
  );
}
