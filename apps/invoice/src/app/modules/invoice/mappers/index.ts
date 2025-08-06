import { CreateCheckoutSessionRequest } from '@common/interfaces/common/stripe.interface';
import { CreateInvoiceTcpReq } from '@common/interfaces/tcp/invoice';
import { Invoice } from '@common/schemas/invoice/invoice.schema';
import { ObjectId } from 'mongodb';

export const invoiceRequestMapping = (data: CreateInvoiceTcpReq): Partial<Invoice> => {
  return {
    ...data,
    items: data.items.map((item) => ({ ...item, productId: new ObjectId(item.productId) })),
    totalAmount: data.items.reduce((acc, item) => acc + item.total, 0),
    vatAmount: data.items.reduce((acc, item) => acc + item.unitPrice * item.quantity * (item.vatRate / 100), 0),
  };
};

export const createCheckoutSessionMapping = (invoice: Invoice): CreateCheckoutSessionRequest => {
  return {
    invoiceId: invoice.id,
    clientEmail: invoice.client.email,
    lineItems: invoice.items.map((item) => ({
      name: item.name,
      price: item.total,
      quantity: item.quantity,
    })),
  };
};
