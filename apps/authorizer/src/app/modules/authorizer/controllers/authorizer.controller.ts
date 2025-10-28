import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { Controller, Logger, UseInterceptors } from '@nestjs/common';
import { AuthorizerService } from '../services/authorizer.service';
import { MessagePattern } from '@nestjs/microservices';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { RequestParams } from '@common/decorators/request-param.decorator';
import { AuthorizeResponse, LoginTcpRequest, LoginTcpResponse } from '@common/interfaces/tcp/authorizer';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { ProcessId } from '@common/decorators/processId.decorator';

@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class AuthorizerController {
  constructor(private readonly authorizerService: AuthorizerService) {}

  @MessagePattern(TCP_REQUEST_MESSAGE.AUTHORIZER.LOGIN)
  async login(@RequestParams() params: LoginTcpRequest) {
    const result = await this.authorizerService.login(params);
    return Response.success<LoginTcpResponse>(result);
  }

  @MessagePattern(TCP_REQUEST_MESSAGE.AUTHORIZER.VERIFY_USER_TOKEN)
  async verifyUserToken(@RequestParams() token: string, @ProcessId() processId: string) {
    const result = await this.authorizerService.verifyUserToken(token, processId);
    return Response.success<AuthorizeResponse>(result);
  }
}
