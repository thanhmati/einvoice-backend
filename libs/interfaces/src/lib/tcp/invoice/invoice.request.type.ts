import { CreateInvoiceRequestDto, PaginateInvoiceRequestDto, UpdateInvoiceRequestDto } from '../../gateway/dto/invoice';

export type CreateInvoiceTcpReq = CreateInvoiceRequestDto;

export type PaginateInvoiceTcpReq = PaginateInvoiceRequestDto;

export type UpdateInvoiceTcpReq = UpdateInvoiceRequestDto & { id: string };
