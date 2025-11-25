import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(private readonly client: ClientKafka) {}

  async onModuleInit() {
    await this.client.connect();
  }

  emit<T>(topic: string, payload: T) {
    return this.client.emit(topic, payload);
  }
}
