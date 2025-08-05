import { Module } from '@nestjs/common';
import { KeycloakService } from './services/keycloak.service';
import { KeycloakGrpcController } from './controllers/keycloak.grpc.controller';
import { ClientsModule } from '@nestjs/microservices';
import { GRPC_SERVICES, GrpcProvider } from '@common/configuration';
import { KeycloakHttpService } from './services/keycloak-http.service';
import { KeycloakController } from './controllers/keycloak.controller';

@Module({
  imports: [ClientsModule.registerAsync([GrpcProvider(GRPC_SERVICES.USER_ACCESS_SERVICE)])],
  controllers: [KeycloakGrpcController, KeycloakController],
  providers: [KeycloakService, KeycloakHttpService],
})
export class KeyCloakModule {}
