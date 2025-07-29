import {
  BaseConfiguration,
  AppConfiguration,
  KafkaConfiguration,
  MongoConfiguration,
  TcpConfiguration,
} from '@common/configuration';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Configuration extends BaseConfiguration {
  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG = new AppConfiguration();

  @ValidateNested()
  @Type(() => KafkaConfiguration)
  KAFKA_CONFIG = new KafkaConfiguration();

  @ValidateNested()
  @Type(() => MongoConfiguration)
  MONGO_CONFIG = new MongoConfiguration();

  @ValidateNested()
  @Type(() => TcpConfiguration)
  TCP_SERV = new TcpConfiguration();
}

export const CONFIGURATION = new Configuration();

export type TConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();
