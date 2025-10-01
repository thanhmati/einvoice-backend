import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION, TConfiguration } from '../configuration';
import { RoleModule } from './modules/role/role.module';
import { MongoProvider } from '@common/configuration/mongo.config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [() => CONFIGURATION] }), MongoProvider, RoleModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;
}
