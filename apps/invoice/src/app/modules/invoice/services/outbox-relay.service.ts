import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OutboxRepository } from '../repositories/outbox.repository';
import { KafkaClient } from '@common/queue/modules/kafka/services/kafka-client.service';

@Injectable()
export class OutboxRelayService {
  private readonly logger = new Logger(OutboxRelayService.name);

  constructor(
    private readonly outboxRepository: OutboxRepository,
    private readonly kafkaClient: KafkaClient,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async relayPending() {
    const messages = await this.outboxRepository.findPending(200);

    for (const msg of messages) {
      try {
        await this.kafkaClient.send(msg.topic, {
          ...msg.payload,
          headers: msg.headers || {},
        });
        await this.outboxRepository.markSent(String(msg._id));
      } catch (error) {
        this.logger.error('Failed to relay outbox message', error);
        await this.outboxRepository.markFailed(String(msg._id));
      }
    }
  }
}