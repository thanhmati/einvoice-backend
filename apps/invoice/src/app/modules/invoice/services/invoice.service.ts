import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { CreateInvoiceTcpReq, PaginateInvoiceTcpReq, UpdateInvoiceTcpReq } from '@common/interfaces/tcp/invoice';
import { invoiceRequestMapping } from '../mappers';
import { ERROR_CODE } from '@common/constants/enums/error-code.enum';
import { INVOICE_STATUS } from '@common/constants/invoice.constant';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  create(params: CreateInvoiceTcpReq) {
    const input = invoiceRequestMapping(params);

    return this.invoiceRepository.create(input);
  }

  paginate(params: PaginateInvoiceTcpReq) {
    return this.invoiceRepository.paginate(params);
  }

  async getById(id: string) {
    const invoice = await this.invoiceRepository.getById(id);

    if (!invoice) {
      throw new NotFoundException(ERROR_CODE.INVOICE_NOT_FOUND);
    }

    return invoice;
  }

  async updateById(params: UpdateInvoiceTcpReq) {
    const { id, ...data } = params;

    const invoice = await this.getById(id);

    if (invoice.status !== INVOICE_STATUS.CREATED) {
      throw new BadRequestException(ERROR_CODE.INVOICE_CAN_NOT_BE_UPDATED);
    }

    const input = invoiceRequestMapping(data);

    return this.invoiceRepository.updateById(id, input);
  }

  async deleteById(id: string) {
    const invoice = await this.getById(id);

    if (invoice.status !== INVOICE_STATUS.CREATED) {
      throw new BadRequestException(ERROR_CODE.INVOICE_CAN_NOT_BE_DELETED);
    }

    return this.invoiceRepository.deleteById(id);
  }

  async sendById(id: string) {
    const invoice = await this.getById(id);

    if (invoice.status !== INVOICE_STATUS.CREATED) {
      throw new BadRequestException(ERROR_CODE.INVOICE_CAN_NOT_BE_SENT);
    }

    const invoiceSent = await this.invoiceRepository.updateById(id, { status: INVOICE_STATUS.SENT });

    return invoiceSent;
  }
}
