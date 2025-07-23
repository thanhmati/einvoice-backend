import { BaseConfiguration, AppConfiguration, TcpConfiguration, KafkaConfiguration } from '@common/configuration';
import { ValidateNested } from 'class-validator';

class Configuration extends BaseConfiguration {
  @ValidateNested()
  APP_CONFIG = new AppConfiguration();

  @ValidateNested()
  TCP_SERV = new TcpConfiguration();

  @ValidateNested()
  KAFKA_CONFIG = new KafkaConfiguration();
}

export const CONFIGURATION = new Configuration();

export type TConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();
