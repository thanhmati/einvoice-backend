import { v4 } from 'uuid';

export const getProcessId = (prefix?: string) => {
  return prefix ? `${prefix}-${v4()}` : v4();
};
