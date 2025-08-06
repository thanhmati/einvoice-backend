export type CreateCheckoutSessionRequest = {
  lineItems: {
    price: number;
    quantity: number;
    name: string;
  }[];
  invoiceId: string;
  clientEmail: string;
};
