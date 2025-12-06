import { UnauthorizedException } from '@nestjs/common';
import { getProcessId, parseToken } from './string.util';

// Mock uuid
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid-1234'),
}));

describe('String Utils', () => {
  describe('getProcessId', () => {
    it('should generate UUID without prefix', () => {
      const result = getProcessId();
      expect(result).toBe('mocked-uuid-1234');
    });

    it('should generate UUID with prefix', () => {
      const result = getProcessId('test-prefix');
      expect(result).toBe('test-prefix-mocked-uuid-1234');
    });
  });

  describe('parseToken', () => {
    it('should throw UnauthorizedException if token is null', () => {
      expect(() => parseToken(null as any)).toThrow(UnauthorizedException);
      expect(() => parseToken(null as any)).toThrow('Token is required');
    });

    it('should throw UnauthorizedException if token is empty string', () => {
      expect(() => parseToken('')).toThrow(UnauthorizedException);
      expect(() => parseToken('')).toThrow('Token is required');
    });

    it('should throw UnauthorizedException if token is whitespace only', () => {
      expect(() => parseToken('   ')).toThrow(UnauthorizedException);
      expect(() => parseToken('   ')).toThrow('Token is required');
    });

    it('should extract token from "Bearer {token}" format', () => {
      const result = parseToken('Bearer abc123token');
      expect(result).toBe('abc123token');
    });

    it('should return token as-is if no space', () => {
      const result = parseToken('abc123token');
      expect(result).toBe('abc123token');
    });

    it('should handle multiple spaces and extract second part', () => {
      const result = parseToken('Bearer token-with-more-parts');
      expect(result).toBe('token-with-more-parts');
    });
  });
});
