import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { CreateInvoiceTcpRequest } from '@common/interfaces/tcp/invoice';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  create(data: CreateInvoiceTcpRequest) {
    return this.invoiceRepository.create(data);
  }
}
