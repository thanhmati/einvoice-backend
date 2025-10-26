import { AuthorizeResponse } from '../../tcp/authorizer';

export type VerifyUserTokenResponse = {
  code: string;
  error: string;
  data?: AuthorizeResponse;
};
