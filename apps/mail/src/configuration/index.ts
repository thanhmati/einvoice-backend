import { BaseConfiguration } from '@common/configuration/base.config';
import { AppConfiguration } from '@common/configuration/app.config';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { KafkaConfiguration } from '@common/configuration/kafka.config';
import { MailConfiguration } from '@common/configuration/mail.config';
import { TcpConfiguration } from '@common/configuration/tcp.config';
import { createConfiguration } from '@common/configuration/configuration.helper';

class Configuration extends BaseConfiguration {
  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG = new AppConfiguration();

  @ValidateNested()
  @Type(() => KafkaConfiguration)
  KAFKA_CONFIG = new KafkaConfiguration();

  @ValidateNested()
  @Type(() => MailConfiguration)
  MAIL_CONFIG = new MailConfiguration();

  @ValidateNested()
  @Type(() => TcpConfiguration)
  TCP_SERV = new TcpConfiguration();
}

const { CONFIGURATION } = createConfiguration(Configuration);
export { CONFIGURATION };
export type TConfiguration = typeof CONFIGURATION;
