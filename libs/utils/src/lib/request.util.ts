import { parseToken } from './string.utils';
import { AuthorizedResult } from '@common/interfaces/grpc/authorizer';

const AUTHORIZATION_HTTP_REQUEST_HEADER = 'authorization';
const ACCESS_TOKEN = 'accessToken';
const USER_DATA = 'userData';

export function getAccessToken(req: any, keepBearer = false): string {
  const token = req.headers?.[AUTHORIZATION_HTTP_REQUEST_HEADER] || req[ACCESS_TOKEN];

  return keepBearer ? token : parseToken(token);
}

export function getUserData(req: any): any {
  return req[USER_DATA];
}

export function setUserData(req: any, userData?: AuthorizedResult): void {
  req[USER_DATA] = userData;
}
