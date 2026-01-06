import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { TcpServerTracingInterceptor } from '@common/interceptors/tracing-server.interceptor';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { RoleService } from '../services/role.service';
import { Role } from '@common/schemas/role.schema';

@Controller()
@UseInterceptors(TcpLoggingInterceptor, TcpServerTracingInterceptor)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern(TCP_REQUEST_MESSAGE.ROLE.GET_ALL)
  async getAll() {
    const roles = await this.roleService.getAll();
    return Response.success<Role[]>(roles);
  }
}
