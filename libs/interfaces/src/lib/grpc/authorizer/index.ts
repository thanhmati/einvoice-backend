import { User } from '@common/schemas/user.schema';
import { JwtPayload } from 'jsonwebtoken';
import { Response } from '../common/response.interface';
import { Observable } from 'rxjs';

export class UserTokenRequest {
  token: string;
  processID: string;
}

export class AuthorizedMetadata {
  userId: string | undefined;
  user: User | undefined;
  permissions: string[] | undefined;
  jwt: JwtPayload | undefined;

  constructor(payload?: Partial<AuthorizedMetadata>) {
    Object.assign(this, payload);
  }
}

export class AuthorizedResult {
  valid: boolean;
  metadata?: AuthorizedMetadata;
}

export class AuthorizeResponse {
  valid = false;
  metadata = new AuthorizedMetadata();

  constructor(payload?: Partial<AuthorizeResponse>) {
    Object.assign(this, payload);
  }
}

export interface KeycloakService {
  verifyUserToken(data: UserTokenRequest): Observable<Response<AuthorizedResult>>;
}
