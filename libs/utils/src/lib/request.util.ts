import { parseToken } from './string.util';
import { AuthorizeResponse } from '@common/interfaces/tcp/authorizer';
import { MetadataKeys } from '@common/constants/common.constant';

export function getAccessToken(req: any, keepBearer = false): string {
  const token = req.headers?.['authorization'];

  return keepBearer ? token : parseToken(token);
}

export function setUserData(req: any, userData?: AuthorizeResponse): void {
  req[MetadataKeys.USER_DATA] = userData;
}
