import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserTcpReq } from '@common/interfaces/tcp/user';
import { userRequestMapping } from '../mappers';
import { ERROR_CODE } from '@common/constants/enums/error-code.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(params: CreateUserTcpReq) {
    const isExists = await this.userRepository.exists(params.email);

    if (isExists) {
      throw new BadRequestException(ERROR_CODE.USER_ALREADY_EXISTS);
    }

    const input = userRequestMapping(params);

    return this.userRepository.create(input);
  }
}
