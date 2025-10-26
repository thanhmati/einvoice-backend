import { Controller } from '@nestjs/common';
import { AuthorizerService } from '../services/authorizer.service';
import { GrpcMethod } from '@nestjs/microservices';
import { VerifyUserTokenRequest, VerifyUserTokenResponse } from '@common/interfaces/grpc/authorizer';
import { Response } from '@common/interfaces/grpc/common/response.interface';

@Controller()
export class AuthorizerGrpcController {
  constructor(private readonly authorizerService: AuthorizerService) {}

  @GrpcMethod('AuthorizerService', 'verifyUserToken')
  async verifyUserToken(params: VerifyUserTokenRequest): Promise<VerifyUserTokenResponse> {
    const result = await this.authorizerService.verifyUserToken(params.token, params.processId);
    return Response.success(result);
  }
}
