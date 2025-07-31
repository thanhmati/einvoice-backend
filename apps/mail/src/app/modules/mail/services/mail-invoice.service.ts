import { TCP_SERVICES } from '@common/configuration';
import { InvoiceCreatedPayload } from '@common/interfaces/queue/invoice';
import { Inject, Injectable } from '@nestjs/common';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { MailService } from './mail.service';
import { firstValueFrom, map } from 'rxjs';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { MailTemplateService } from '../../mail-template/services/mail-template.service';
import { GetDetailInvoiceTcpRes } from '@common/interfaces/tcp/invoice';

@Injectable()
export class MailInvoiceService {
  constructor(
    @Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceClient: TcpClient,
    private readonly mailService: MailService,
    private readonly mailTemplateService: MailTemplateService,
  ) {}

  async sendInvoiceCreated(payload: InvoiceCreatedPayload) {
    const { id: invoiceId } = payload;

    const invoice = await this.getInvoiceById(invoiceId);
    const html = await this.mailTemplateService.render('invoice', {
      clientName: invoice.client.name,
      senderName: 'Tan Thanh DEV',
      invoiceCode: `#${invoice.id}`,
    });

    const attachment = await this.mailService.getAttachmentFromUrl(
      invoice.fileUrl,
      `invoice-${invoice.id}.pdf`,
      'application/pdf',
    );

    this.mailService.sendMail({
      html,
      subject: 'Send Invoice',
      to: invoice.client.email,
      attachments: [attachment],
    });
  }

  private getInvoiceById(id: string) {
    return firstValueFrom(
      this.invoiceClient
        .send<GetDetailInvoiceTcpRes, string>(TCP_REQUEST_MESSAGE.INVOICE.GET_BY_ID, {
          data: id,
        })
        .pipe(map((data) => data.data)),
    );
  }
}
