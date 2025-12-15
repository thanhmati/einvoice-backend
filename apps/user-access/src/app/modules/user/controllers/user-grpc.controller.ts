import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { UserById } from '@common/interfaces/grpc/user-access';
import { Response } from '@common/interfaces/grpc/common/response.interface';
import { User } from '@common/schemas/user.schema';

@Controller()
export class UserGrpcController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserAccessService', 'getByUserId')
  async getByUserId(payload: UserById): Promise<Response<User>> {
    const result = await this.userService.getUserByUserId(payload.userId);

    return Response.success<User>(result);
  }
}
