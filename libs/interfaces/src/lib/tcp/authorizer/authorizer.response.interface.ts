import { User } from '@common/schemas/user.schema';
import { LoginResponseDto } from '../../gateway/authorizer';
import { PERMISSION } from '@common/constants/enum/role.enum';
import { JwtPayload } from 'jsonwebtoken';

export type LoginTcpResponse = LoginResponseDto;

export class AuthorizedMetadata {
  userId: string | undefined;
  user: User | undefined;
  permissions: PERMISSION[] | undefined;
  jwt: JwtPayload | undefined;

  constructor(payload?: Partial<AuthorizedMetadata>) {
    Object.assign(this, payload);
  }
}

export class AuthorizeResponse {
  valid = false;
  metadata = new AuthorizedMetadata();

  constructor(payload?: Partial<AuthorizeResponse>) {
    Object.assign(this, payload);
  }
}
