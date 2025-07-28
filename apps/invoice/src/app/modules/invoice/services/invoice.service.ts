import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { CreateInvoiceTcpReq, PaginateInvoiceTcpReq } from '@common/interfaces/tcp/invoice';
import { invoiceRequestMapping } from '../mappers';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) { }

  create(params: CreateInvoiceTcpReq) {
    const input = invoiceRequestMapping(params);

    return this.invoiceRepository.create(input);
  }

  paginate(params: PaginateInvoiceTcpReq) {
    return this.invoiceRepository.paginate(params);
  }
}
