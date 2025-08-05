import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserTcpReq } from '@common/interfaces/tcp/user';
import { createUserRequestMapping } from '../mappers';
import { ERROR_CODE } from '@common/constants/enums/error-code.enum';
import { TCP_SERVICES } from '@common/configuration';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { CreateKeycloakUserTcpReq } from '@common/interfaces/tcp/authorizer';
import { firstValueFrom, map } from 'rxjs';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(TCP_SERVICES.AUTHORIZER_SERVICE) private readonly authorizerClient: TcpClient,
  ) {}

  async create(params: CreateUserTcpReq, processID: string) {
    const isExists = await this.userRepository.exists(params.email);

    if (isExists) {
      throw new BadRequestException(ERROR_CODE.USER_ALREADY_EXISTS);
    }

    const userId = await this.createKeycloakUser(
      { email: params.email, password: params.password, firstName: params.firstName, lastName: params.lastName },
      processID,
    );

    const input = createUserRequestMapping(params, userId);

    return this.userRepository.create(input);
  }

  getByUserId(userId: string) {
    return this.userRepository.getByUserId(userId);
  }

  createKeycloakUser(data: CreateKeycloakUserTcpReq, processID: string) {
    return firstValueFrom(
      this.authorizerClient
        .send<string, CreateKeycloakUserTcpReq>(TCP_REQUEST_MESSAGE.KEYCLOAK.CREATE_USER, {
          data,
          processID,
        })
        .pipe(map((data) => data.data)),
    );
  }
}
