import { Module } from '@nestjs/common';
import { AuthorizerService } from './services/authorizer.service';
import { AuthorizerController } from './controllers/authorizer.controller';
import { KeycloakModule } from '../keycloak.module';
import { ClientsModule } from '@nestjs/microservices';
import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';

@Module({
  imports: [KeycloakModule, ClientsModule.registerAsync([TcpProvider(TCP_SERVICES.USER_ACCESS_SERVICE)])],
  controllers: [AuthorizerController],
  providers: [AuthorizerService],
})
export class AuthorizerModule {}
