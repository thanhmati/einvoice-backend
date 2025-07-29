import { PaginationResponse } from '../../gateway/common/pagination.response.dto';
import { Invoice } from '@common/schemas/invoice/invoice.schema';

export type PaginateInvoiceTcpRes = PaginationResponse<Invoice>;

export type GetDetailInvoiceTcpRes = Invoice;
