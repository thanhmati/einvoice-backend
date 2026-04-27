import { BaseConfiguration } from '@common/configuration/base.config';
import { AppConfiguration } from '@common/configuration/app.config';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TcpConfiguration } from '@common/configuration/tcp.config';
import { TypeOrmConfiguration } from '@common/configuration/type-orm.config';
import { createConfiguration } from '@common/configuration/configuration.helper';

class Configuration extends BaseConfiguration {
  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG = new AppConfiguration();

  @ValidateNested()
  @Type(() => TcpConfiguration)
  TCP_SERV = new TcpConfiguration();

  @ValidateNested()
  @Type(() => TypeOrmConfiguration)
  TYPEORM_CONFIG = new TypeOrmConfiguration();
}

const { CONFIGURATION } = createConfiguration(Configuration);
export { CONFIGURATION };
export type TConfiguration = typeof CONFIGURATION;
