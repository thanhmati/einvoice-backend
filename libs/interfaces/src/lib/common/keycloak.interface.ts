export type ExchangeClientTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  id_token: string;
  scope: string;
};

export type CreateKeyCloakUserRequest = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};
