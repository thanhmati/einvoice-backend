import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserTcpRequest } from '@common/interfaces/tcp/user';
import { ERROR_CODE } from '@common/constants/enum/error-code.enum';
import { createUserRequestMapping } from '../mappers';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(params: CreateUserTcpRequest) {
    const isExists = await this.userRepository.exists(params.email);

    if (isExists) {
      throw new BadRequestException(ERROR_CODE.USER_ALREADY_EXISTS);
    }

    const input = createUserRequestMapping(params);

    return this.userRepository.create(input);
  }
}
