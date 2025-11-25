import { Inject, Injectable } from '@nestjs/common';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { firstValueFrom, map } from 'rxjs';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { InvoiceTcpResponse } from '@common/interfaces/tcp/invoice';
import { InvoiceSentPayload } from '@common/interfaces/queue/invoice';
import { MailTemplateService } from '../../mail-template/services/mail-template.service';
import { MailService } from './mail.service';

@Injectable()
export class MailInvoiceService {
  constructor(
    @Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceClient: TcpClient,
    private readonly mailTemplateService: MailTemplateService,
    private readonly mailService: MailService,
  ) {}

  async sendInvoice(payload: InvoiceSentPayload) {
    const invoice = await this.getInvoiceById(payload.id);
    const html = await this.mailTemplateService.render('invoice', {
      clientName: invoice.client.name,
      senderName: 'Tan Thanh DEV',
      invoiceCode: `#${invoice.id}`,
      paymentLink: payload.paymentLink,
    });

    this.mailService.sendMail({
      html,
      subject: 'Send Invoice',
      to: invoice.client.email,
      attachments: [{ filename: `invoice-${invoice.id}.pdf`, path: invoice.fileUrl }],
    });
  }

  private getInvoiceById(id: string) {
    return firstValueFrom(
      this.invoiceClient
        .send<InvoiceTcpResponse, string>(TCP_REQUEST_MESSAGE.INVOICE.GET_BY_ID, {
          data: id,
        })
        .pipe(map((data) => data.data)),
    );
  }
}
