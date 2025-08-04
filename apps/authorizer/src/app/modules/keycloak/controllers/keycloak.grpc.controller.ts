import { GrpcLoggingInterceptor } from '@common/interceptors/grpcLogging.interceptor';
import { Controller, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthorizeResponse, UserTokenRequest } from '@common/interfaces/grpc/authorizer';
import { KeycloakService } from '../services/keycloak.service';

@Controller()
@UseInterceptors(GrpcLoggingInterceptor)
export class KeycloakGrpcController {
  constructor(private readonly keycloakService: KeycloakService) {}

  @GrpcMethod('KeycloakService', 'verifyUserToken')
  async verifyToken(payload: UserTokenRequest): Promise<AuthorizeResponse> {
    return this.keycloakService.verifyToken(payload.token);
  }
}
