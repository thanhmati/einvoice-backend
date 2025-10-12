import { parseToken } from './string.util';

export function getAccessToken(req: any, keepBearer = false): string {
  const token = req.headers?.['authorization'];

  return keepBearer ? token : parseToken(token);
}
