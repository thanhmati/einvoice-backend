import { BaseConfiguration } from '@common/configuration/base.config';
import { AppConfiguration } from '@common/configuration/app.config';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TcpConfiguration } from '@common/configuration/tcp.config';
import { CloudinaryConfiguration } from '@common/configuration/cloudinary.config';
import { createConfiguration } from '@common/configuration/configuration.helper';

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

const { CONFIGURATION } = createConfiguration(Configuration);
export { CONFIGURATION };
export type TConfiguration = typeof CONFIGURATION;
