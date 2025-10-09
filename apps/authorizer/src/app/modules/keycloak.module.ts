import { Module } from '@nestjs/common';
import { KeycloakController } from './keycloak/controllers/keycloak.controller';
import { KeycloakHttpService } from './keycloak/services/keycloak-http.service';

@Module({
  imports: [],
  controllers: [KeycloakController],
  providers: [KeycloakHttpService],
  exports: [KeycloakHttpService],
})
export class KeycloakModule {}
