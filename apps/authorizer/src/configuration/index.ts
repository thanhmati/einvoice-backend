import { BaseConfiguration, AppConfiguration } from '@common/configuration';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { KeycloakConfiguration } from '@common/configuration';

class Configuration extends BaseConfiguration {
  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG = new AppConfiguration();

  @ValidateNested()
  @Type(() => KeycloakConfiguration)
  KEYCLOAK_CONFIG = new KeycloakConfiguration();
}

export const CONFIGURATION = new Configuration();

export type TConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();
