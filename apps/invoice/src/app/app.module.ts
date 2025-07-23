import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '@common/middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION, TConfiguration } from '../configuration';
import { KafkaModule } from '@common/queue/modules/kafka/kafka.module';
import { KAFKA_GROUPS, KAFKA_SERVICES } from '@common/constants/enums/kafka.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ ...CONFIGURATION })],
    }),
    KafkaModule.forConsumerAsync({ serviceName: KAFKA_SERVICES.INVOICE, groupId: KAFKA_GROUPS.INVOICE }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
