import { Module } from '@nestjs/common';
import { KeycloakService } from './services/keycloak.service';

@Module({
  imports: [],
  controllers: [],
  providers: [KeycloakService],
})
export class KeyCloakModule {}
