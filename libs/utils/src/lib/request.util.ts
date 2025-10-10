import { parseToken } from './string.util';
import { AuthorizedResult } from '@common/interfaces/tcp/authorizer';
import { MetadataKeys } from '@common/constants/common.constant';

export function getAccessToken(req: any, keepBearer = false): string {
  const token = req.headers?.['authorization'];

  return keepBearer ? token : parseToken(token);
}

export function setUserData(req: any, userData?: AuthorizedResult): void {
  req[MetadataKeys.USER_DATA] = userData;
}
