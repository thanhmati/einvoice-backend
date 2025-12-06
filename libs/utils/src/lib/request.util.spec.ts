import { getAccessToken, setUserData } from './request.util';
import { AuthorizeResponse } from '@common/interfaces/tcp/authorizer';
import { MetadataKeys } from '@common/constants/common.constant';

// Mock the string util
jest.mock('./string.util', () => ({
  parseToken: jest.fn((token: string) => {
    if (!token) {
      return token;
    }
    if (token.includes(' ')) {
      return token.split(' ')[1];
    }
    return token;
  }),
}));

describe('Request Utils', () => {
  describe('getAccessToken', () => {
    it('should extract token without "Bearer" prefix by default', () => {
      const mockReq = {
        headers: {
          authorization: 'Bearer abc123token',
        },
      };

      const result = getAccessToken(mockReq);
      expect(result).toBe('abc123token');
    });

    it('should keep "Bearer" prefix when keepBearer is true', () => {
      const mockReq = {
        headers: {
          authorization: 'Bearer abc123token',
        },
      };

      const result = getAccessToken(mockReq, true);
      expect(result).toBe('Bearer abc123token');
    });

    it('should handle missing headers', () => {
      const mockReq = {};

      const result = getAccessToken(mockReq);
      expect(result).toBeUndefined();
    });

    it('should handle missing authorization header', () => {
      const mockReq = {
        headers: {},
      };

      const result = getAccessToken(mockReq);
      expect(result).toBeUndefined();
    });
  });

  describe('setUserData', () => {
    it('should set user data on request object', () => {
      const mockReq: any = {};
      const userData: AuthorizeResponse = {
        userId: 123,
        email: 'test@example.com',
      } as any;

      setUserData(mockReq, userData);

      expect(mockReq[MetadataKeys.USER_DATA]).toEqual(userData);
    });

    it('should set undefined user data on request object', () => {
      const mockReq: any = {};

      setUserData(mockReq, undefined);

      expect(mockReq[MetadataKeys.USER_DATA]).toBeUndefined();
    });

    it('should overwrite existing user data', () => {
      const mockReq: any = {
        [MetadataKeys.USER_DATA]: { userId: 999 },
      };
      const newUserData: AuthorizeResponse = {
        userId: 123,
        email: 'new@example.com',
      } as any;

      setUserData(mockReq, newUserData);

      expect(mockReq[MetadataKeys.USER_DATA]).toEqual(newUserData);
    });
  });
});
