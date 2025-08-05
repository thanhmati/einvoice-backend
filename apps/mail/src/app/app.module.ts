import { Module } from '@nestjs/common';
import { MailModule } from './modules/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION, TConfiguration } from '../configuration';
import { KafkaModule } from '@common/queue/modules/kafka/kafka.module';
import { KAFKA_GROUPS, KAFKA_SERVICES } from '@common/constants/enums/kafka.enum';
import { MailTemplateModule } from './modules/mail-template/mail-template.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ ...CONFIGURATION })],
    }),
    MailModule,
    MailTemplateModule,
    KafkaModule.forConsumerAsync({ groupId: KAFKA_GROUPS.MAIL, serviceName: KAFKA_SERVICES.MAIL }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;
}
