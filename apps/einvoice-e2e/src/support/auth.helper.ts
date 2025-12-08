import { CreateUserRequestDto } from '@common/interfaces/gateway/user';
import { ROLE_ID } from '@common/constants/enum/role.enum';
import axios from 'axios';
import { LoginRequestDto, LoginResponseDto } from '@common/interfaces/gateway/authorizer';

export interface TestUserCredentials {
  email: string;
}
export const getAccessToken = async (): Promise<{ accessToken: string; user: TestUserCredentials }> => {
  const testEmail = `test${Date.now()}@example.com`;
  const testPassword = 'Password@123';

  const testUser: CreateUserRequestDto = {
    firstName: 'Test',
    lastName: 'User',
    email: testEmail,
    password: testPassword,
    roles: [ROLE_ID.ADMINISTRATOR],
  };

  // 1. Register
  try {
    await axios.post('/user', testUser);
  } catch (e: any) {
    console.warn('Registration failed/skipped (user might exist)', e.response?.data?.message || e.message);
  }

  // 2. Login
  try {
    const loginPayload: LoginRequestDto = {
      username: testEmail,
      password: testPassword,
    };
    const res = await axios.post<{ data: LoginResponseDto }>('/authorizer/login', loginPayload);
    const accessToken = res.data.data.accessToken;

    console.log('Access token: ', accessToken);

    if (!accessToken) {
      throw new Error('No access token received');
    }

    return { accessToken, user: { email: testEmail } };
  } catch (e: any) {
    console.error('Login failed', e.response?.data || e.message);
    throw e;
  }
};
