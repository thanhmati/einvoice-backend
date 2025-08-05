import { GrpcLoggingInterceptor } from '@common/interceptors/grpcLogging.interceptor';
import { Controller, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthorizeResponse, UserTokenRequest } from '@common/interfaces/grpc/authorizer';
import { KeycloakService } from '../services/keycloak.service';
import { Response } from '@common/interfaces/grpc/common/response.interface';

@Controller()
@UseInterceptors(GrpcLoggingInterceptor)
export class KeycloakGrpcController {
  constructor(private readonly keycloakService: KeycloakService) {}

  @GrpcMethod('KeycloakService', 'verifyUserToken')
  async verifyToken(payload: UserTokenRequest): Promise<Response<AuthorizeResponse>> {
    const result = await this.keycloakService.verifyToken(payload.token, payload.processID);
    return Response.successData<AuthorizeResponse>(result);
  }
}
