import { Module } from '@nestjs/common';
import { KeyCloakModule } from './modules/keycloak/keycloak.module';
import { CONFIGURATION } from '../configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ ...CONFIGURATION })],
    }),
    KeyCloakModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
