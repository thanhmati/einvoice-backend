import axios from 'axios';
import { getAccessToken } from '../support/auth.helper';
import { CreateInvoiceRequestDto, InvoiceResponseDto } from '@common/interfaces/gateway/invoice';

describe('Invoice E2E (HTTP)', () => {
  let accessToken: string;

  beforeAll(async () => {
    const authData = await getAccessToken();
    accessToken = authData.accessToken;
  });

  it('should create an invoice and send it', async () => {
    const createPayload: CreateInvoiceRequestDto = {
      client: {
        name: 'Client A',
        email: 'vebacod587@lawior.com',
        address: '123 St',
      },
      items: [
        {
          productId: 'prod_1',
          name: 'Product 1',
          quantity: 2,
          unitPrice: 100,
          vatRate: 0.1,
          total: 220, // (2*100) + 10% VAT
        },
      ],
    };

    const createRes = await axios.post<{ data: InvoiceResponseDto }>(`/invoice`, createPayload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    expect(createRes.status).toBe(201);
    const invoice = createRes.data.data;
    expect(invoice).toBeDefined();

    const sendRes = await axios.post(
      `/invoice/${invoice.id}/send`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    expect(sendRes.status).toBe(201);
  }, 10000);
});
