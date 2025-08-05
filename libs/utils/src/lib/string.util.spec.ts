import { getProcessId, parseToken, randomStringNumber } from './string.utils';

describe('String Utils', () => {
  describe('getProcessId', () => {
    it('should return a uuid', () => {
      const id = getProcessId();
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });

    it('should return a prefixed uuid', () => {
      const prefix = 'test';
      const id = getProcessId(prefix);
      expect(id).toMatch(new RegExp(`^${prefix}-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$`));
    });
  });

  describe('parseToken', () => {
    it('should throw an error if token is empty', () => {
      expect(() => parseToken('')).toThrow();
    });

    it('should return the token if it does not contain a space', () => {
      const token = 'test-token';
      expect(parseToken(token)).toBe(token);
    });

    it('should return the second part of the token if it contains a space', () => {
      const token = 'Bearer test-token';
      expect(parseToken(token)).toBe('test-token');
    });
  });

  describe('randomStringNumber', () => {
    it('should return a random string of numbers', () => {
      const length = 10;
      const str = randomStringNumber(length);
      expect(str).toHaveLength(length);
      expect(str).toMatch(/^[0-9]+$/);
    });
  });
});
