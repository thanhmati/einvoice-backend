import {
  BaseConfiguration,
  AppConfiguration,
  MongoConfiguration,
  TcpConfiguration,
  GrpcConfiguration,
} from '@common/configuration';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Configuration extends BaseConfiguration {
  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG = new AppConfiguration();

  @ValidateNested()
  @Type(() => MongoConfiguration)
  MONGO_CONFIG = new MongoConfiguration();

  @ValidateNested()
  @Type(() => TcpConfiguration)
  TCP_SERV = new TcpConfiguration();

  @ValidateNested()
  @Type(() => GrpcConfiguration)
  GRPC_SERV = new GrpcConfiguration();
}

export const CONFIGURATION = new Configuration();

export type TConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();
