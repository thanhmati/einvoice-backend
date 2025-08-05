import { Controller, UseInterceptors } from '@nestjs/common';
import { GrpcLoggingInterceptor } from '@common/interceptors/grpcLogging.interceptor';
import { GrpcMethod } from '@nestjs/microservices';
import { Response } from '@common/interfaces/grpc/common/response.interface';
import { UserById } from '@common/interfaces/grpc/user-access';
import { UserService } from '../services/user.service';
import { User } from '@common/schemas/user.schema';

@Controller()
@UseInterceptors(GrpcLoggingInterceptor)
export class UserGrpcController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserAccessService', 'getByUserId')
  async getByUserId(payload: UserById): Promise<Response<User>> {
    const result = await this.userService.getByUserId(payload.userId);

    return Response.successData<User>(result);
  }
}
