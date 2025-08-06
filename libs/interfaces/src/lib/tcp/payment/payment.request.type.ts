export type StripeWebhookTcpReq = {
  signature: string;
  rawBodyBase64: string;
};
