import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleResponseDto } from '@common/interfaces/gateway/role';
import { ProcessId } from '@common/decorators/processId.decorator';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { map } from 'rxjs';
import { Authorization } from '@common/decorators/authorizer.decorator';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(@Inject(TCP_SERVICES.USER_ACCESS_SERVICE) private readonly userAccessClient: TcpClient) {}

  @Get()
  @ApiOkResponse({
    type: ResponseDto<RoleResponseDto[]>,
  })
  @ApiOperation({
    summary: 'Get all roles',
  })
  @Authorization({ secured: false })
  getAll(@ProcessId() processId: string) {
    return this.userAccessClient
      .send<RoleResponseDto[]>(TCP_REQUEST_MESSAGE.ROLE.GET_ALL, { processId })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
