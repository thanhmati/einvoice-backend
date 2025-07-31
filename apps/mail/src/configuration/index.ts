import { BaseConfiguration, AppConfiguration, MailConfiguration } from '@common/configuration';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Configuration extends BaseConfiguration {
  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG = new AppConfiguration();

  @ValidateNested()
  @Type(() => MailConfiguration)
  MAIL_CONFIG = new MailConfiguration();
}

export const CONFIGURATION = new Configuration();

export type TConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();
