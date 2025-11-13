import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(private readonly client: ClientKafka) {}

  async onModuleInit() {
    await this.client.connect();
  }

  emit(topic: string, payload: any) {
    return this.client.emit(topic, payload);
  }

  send<TResult = any, TInput = any>(topic: string, payload: TInput) {
    return this.client.send<TResult, TInput>(topic, payload);
  }
}
