import { LoginRequestDto } from '../../gateway/dto/authorizer';

export type CreateKeycloakUserTcpReq = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type LoginTcpRequest = LoginRequestDto;
