import axios from 'axios';
import { accessToken } from '../support/shared';
import { randomStringNumber } from '@common/utils/string.utils';
import { HTTP_MESSAGE } from '@common/constants/enums/http-message.enum';

describe('Product (e2e)', () => {
  let productIdCreated: string;

  it('should create a new product successfully', async () => {
    const { status, data } = await axios.post(
      `/product`,
      {
        name: `Product ${randomStringNumber(4)}`,
        description: 'Product description',
        sku: `PRO_${randomStringNumber(6)}`,
        unit: 'string',
        price: 100,
        vatRate: 10,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    expect(status).toBe(201);
    expect(data.data).toBe(HTTP_MESSAGE.CREATED);
  });

  it('should get all products successfully', async () => {
    const { status, data } = await axios.get(`/product`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    productIdCreated = data.data[0].id;

    expect(status).toBe(200);
    expect(data.data?.length).toBeGreaterThan(0);
  });

  it('should get a product successfully', async () => {
    const { status } = await axios.get(`/product/${productIdCreated}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(status).toBe(200);
  });
});
