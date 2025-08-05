import { parseToken } from './string.utils';
import { AuthorizedResult } from '@common/interfaces/grpc/authorizer';
import { MetadataKeys } from '@common/constants/decorators.constant';

export function getAccessToken(req: any, keepBearer = false): string {
  const token = req.headers?.['authorization'] || req[MetadataKeys.ACCESS_TOKEN];

  return keepBearer ? token : parseToken(token);
}

export function getUserData(req: any): any {
  return req[MetadataKeys.USER_DATA];
}

export function setUserData(req: any, userData?: AuthorizedResult): void {
  req[MetadataKeys.USER_DATA] = userData;
}
