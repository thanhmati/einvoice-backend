import { v4 } from 'uuid';

export function getProcessId(prefix?: string): string {
  const pid = v4();

  if (prefix) {
    return `${prefix}-${pid}`;
  }

  return pid;
}
