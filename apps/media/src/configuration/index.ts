import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseConfiguration } from '@common/configuration/base.config';
import { AppConfiguration } from '@common/configuration/app.config';
import { CloudinaryConfiguration } from '@common/configuration/cloudinary.config';
import { TcpConfiguration } from '@common/configuration/tcp.config';

class Configuration extends BaseConfiguration {
  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG = new AppConfiguration();

  @ValidateNested()
  @Type(() => TcpConfiguration)
  TCP_SERV = new TcpConfiguration();

  @ValidateNested()
  @Type(() => CloudinaryConfiguration)
  CLOUDINARY_CONFIG = new CloudinaryConfiguration();
}

export const CONFIGURATION = new Configuration();

export type TConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();
