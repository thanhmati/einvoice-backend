import { Injectable } from '@nestjs/common';
import path from 'path';
import { PdfService } from '../../pdf/services/pdf.service';
import { InvoiceTcpResponse } from '@common/interfaces/tcp/invoice';

@Injectable()
export class InvoicePdfService {
  constructor(private readonly pdfService: PdfService) {}

  async generateInvoicePdf(invoice: InvoiceTcpResponse): Promise<Uint8Array<ArrayBufferLike>> {
    const templatePath = path.join(__dirname, 'templates', 'invoice.template.ejs');
    const subtotal = invoice.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

    const data = {
      client: invoice.client,
      status: invoice.status,
      items: invoice.items,
      vatAmount: invoice.vatAmount,
      totalAmount: invoice.totalAmount,
      subtotal,
    };

    return this.pdfService.generatePdfFromEjs(templatePath, data);
  }
}
