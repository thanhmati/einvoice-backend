import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { ResponseDto } from '@common/interfaces/gateway/common/response.interface';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from '@common/interfaces/gateway/dto/user';
import { ProcessID } from '@common/decorators/processID.decorator';
import { CreateUserTcpReq } from '@common/interfaces/tcp/user';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { map } from 'rxjs';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(@Inject(TCP_SERVICES.USER_SERVICE) private readonly userClient: TcpClient) {}

  @Post()
  @ApiOkResponse({
    type: ResponseDto<string>,
  })
  @ApiOperation({
    summary: 'Create new a user',
  })
  create(@Body() body: CreateUserRequestDto, @ProcessID() processID: string) {
    return this.userClient
      .send<string, CreateUserTcpReq>(TCP_REQUEST_MESSAGE.USER.CREATE, {
        data: body,
        processID,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
