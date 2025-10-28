import { CreateInvoiceRequestDto } from '../../gateway/invoice';

export type CreateInvoiceTcpRequest = CreateInvoiceRequestDto;

export type SendInvoiceTcpReq = {
  invoiceId: string;
  userId: string;
};
