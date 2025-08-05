import { Controller, UseInterceptors } from '@nestjs/common';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { UserService } from '../services/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { CreateUserTcpReq } from '@common/interfaces/tcp/user';
import { RequestParams } from '@common/decorators/request-params.decorator';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { HTTP_MESSAGE } from '@common/constants/enums/http-message.enum';
import { ProcessID } from '@common/decorators/processID.decorator';

@UseInterceptors(TcpLoggingInterceptor)
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(TCP_REQUEST_MESSAGE.USER.CREATE)
  async create(@RequestParams() params: CreateUserTcpReq, @ProcessID() processID: string): Promise<Response<string>> {
    await this.userService.create(params, processID);

    return Response.success<string>(HTTP_MESSAGE.CREATED);
  }
}
