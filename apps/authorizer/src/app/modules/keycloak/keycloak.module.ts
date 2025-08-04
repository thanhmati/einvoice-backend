import { Module } from '@nestjs/common';
import { KeycloakService } from './services/keycloak.service';
import { KeycloakGrpcController } from './controllers/keycloak.grpc.controller';

@Module({
  imports: [],
  controllers: [KeycloakGrpcController],
  providers: [KeycloakService],
})
export class KeyCloakModule {}
