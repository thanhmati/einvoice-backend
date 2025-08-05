import { Controller, UseInterceptors } from '@nestjs/common';
import { KeycloakService } from '../services/keycloak.service';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { MessagePattern } from '@nestjs/microservices';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { RequestParams } from '@common/decorators/request-params.decorator';
import { CreateKeycloakUserTcpReq } from '@common/interfaces/tcp/authorizer';
import { Response } from '@common/interfaces/tcp/common/response.interface';

@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class KeycloakController {
  constructor(private readonly keycloakService: KeycloakService) {}

  @MessagePattern(TCP_REQUEST_MESSAGE.KEYCLOAK.CREATE_USER)
  async createUser(@RequestParams() data: CreateKeycloakUserTcpReq): Promise<Response<string>> {
    const result = await this.keycloakService.createUser(data);
    return Response.success<string>(result);
  }
}
