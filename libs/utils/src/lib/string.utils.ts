import { v4 } from 'uuid';
import { UnauthorizedException } from '@nestjs/common';

export function getProcessId(prefix?: string): string {
  const pid = v4();

  if (prefix) {
    return `${prefix}-${pid}`;
  }

  return pid;
}

export function parseToken(token: string): string {
  if (!token?.trim()) {
    throw new UnauthorizedException('Token is required');
  }

  if (token.includes(' ')) {
    return token.split(' ')[1];
  }
  return token;
}
