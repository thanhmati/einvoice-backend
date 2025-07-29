import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice, InvoiceModel, InvoiceModelName } from '@common/schemas/invoice/invoice.schema';
import { INVOICE_STATUS } from '@common/constants/invoice.constant';
import { PaginateInvoiceTcpReq } from '@common/interfaces/tcp/invoice';
import { SortDirection } from '@common/constants/common.constant';

@Injectable()
export class InvoiceRepository {
  private readonly logger = new Logger(InvoiceRepository.name);
  constructor(@InjectModel(InvoiceModelName) private readonly invoiceModel: InvoiceModel) {}

  create(data: Partial<Invoice>) {
    return this.invoiceModel.create({
      ...data,
      status: INVOICE_STATUS.CREATED,
    });
  }

  paginate(params: PaginateInvoiceTcpReq) {
    const { limit, page, skipPagination, sortBy, sortOrder } = params;

    const sort = sortOrder && sortBy ? { [sortBy]: sortOrder === SortDirection.DESC ? -1 : 1 } : { createdAt: -1 };

    return this.invoiceModel.paginate(
      {},
      {
        page,
        limit,
        pagination: !skipPagination,
        sort,
      },
    );
  }

  getById(id: string) {
    return this.invoiceModel.findById(id);
  }

  updateById(id: string, data: Partial<Invoice>) {
    return this.invoiceModel.findByIdAndUpdate(id, data, { new: true });
  }

  deleteById(id: string) {
    return this.invoiceModel.findByIdAndDelete(id);
  }
}
