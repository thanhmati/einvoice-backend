import { BaseConfiguration, AppConfiguration, KafkaConfiguration, MongoConfiguration } from '@common/configuration';
import { ValidateNested } from 'class-validator';

class Configuration extends BaseConfiguration {
  @ValidateNested()
  APP_CONFIG = new AppConfiguration();

  @ValidateNested()
  KAFKA_CONFIG = new KafkaConfiguration();

  @ValidateNested()
  MONGO_CONFIG = new MongoConfiguration();
}

export const CONFIGURATION = new Configuration();

export type TConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();
