import { Observable } from 'rxjs';
import { VerifyUserTokenResponse } from './authorizer-response.dto';

export type VerifyUserTokenRequest = {
  token: string;
};

export interface AuthorizerService {
  verifyUserToken(params: VerifyUserTokenRequest): Observable<VerifyUserTokenResponse>;
}
