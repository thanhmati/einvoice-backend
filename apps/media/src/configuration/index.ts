import { BaseConfiguration, AppConfiguration, CloudinaryConfiguration } from '@common/configuration';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Configuration extends BaseConfiguration {
  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG = new AppConfiguration();

  @ValidateNested()
  @Type(() => CloudinaryConfiguration)
  CLOUDINARY_CONFIG = new CloudinaryConfiguration();
}

export const CONFIGURATION = new Configuration();

export type TConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();
