import { BaseConfiguration } from '@common/configuration/base.config';
import { AppConfiguration } from '@common/configuration/app.config';
import { ValidateNested } from 'class-validator';


class Configuration extends BaseConfiguration {
    @ValidateNested()
    APP_CONFIG = new AppConfiguration();
}

export const CONFIGURATION = new Configuration();

export type TConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();