import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceRepository } from '../repositories/invoice.repository';
import {
  CreateInvoiceTcpReq,
  InvoiceTcpResponse,
  PaginateInvoiceTcpReq,
  SendInvoiceTcpReq,
  UpdateInvoiceTcpReq,
} from '@common/interfaces/tcp/invoice';
import { createCheckoutSessionMapping, invoiceRequestMapping } from '../mappers';
import { ERROR_CODE } from '@common/constants/enums/error-code.enum';
import { INVOICE_STATUS } from '@common/constants/invoice.constant';
import { TCP_SERVICES } from '@common/configuration';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { firstValueFrom, map } from 'rxjs';
import { UploadFileTcpReq } from '@common/interfaces/tcp/media';
import { KafkaClient } from '@common/queue/modules/kafka/services/kafka-client.service';
import { InvoiceSentPayload } from '@common/interfaces/queue/invoice';
import { KAFKA_TOPICS } from '@common/constants/kafka.constant';
import { ObjectId } from 'mongodb';
import { PaymentService } from '../../payment/services/payment.service';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    @Inject(TCP_SERVICES.PDF_GENERATOR_SERVICE) private readonly pdfGeneratorClient: TcpClient,
    @Inject(TCP_SERVICES.MEDIA_SERVICE) private readonly mediaClient: TcpClient,
    private readonly KafkaClient: KafkaClient,
    @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService,
  ) {}

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

  async sendById(params: SendInvoiceTcpReq, processID: string) {
    const { invoiceId, userId } = params;

    const invoice = await this.getById(invoiceId);

    if (invoice.status !== INVOICE_STATUS.CREATED) {
      throw new BadRequestException(ERROR_CODE.INVOICE_CAN_NOT_BE_SENT);
    }

    const pdfBase64 = await this.generatorInvoicePdf({ ...invoice.toObject(), status: INVOICE_STATUS.SENT }, invoiceId);
    const pdfUrl = await this.uploadFile({ fileBase64: pdfBase64, fileName: `invoice-${invoiceId}` }, processID);
    const checkoutSession = await this.paymentService.createCheckoutSession(createCheckoutSessionMapping(invoice));

    const invoiceSent = await this.invoiceRepository.updateById(invoiceId, {
      status: INVOICE_STATUS.SENT,
      fileUrl: pdfUrl,
      supervisorId: new ObjectId(userId),
    });

    this.KafkaClient.send<InvoiceSentPayload>(KAFKA_TOPICS.INVOICE.SENT, {
      id: invoiceId,
      paymentLink: checkoutSession.url,
    });

    return invoiceSent;
  }

  generatorInvoicePdf(data: InvoiceTcpResponse, processID: string) {
    return firstValueFrom(
      this.pdfGeneratorClient
        .send<string, InvoiceTcpResponse>(TCP_REQUEST_MESSAGE.PDF_GENERATOR.CREATE_INVOICE_PDF, {
          data,
          processID,
        })
        .pipe(map((data) => data.data)),
    );
  }

  uploadFile(data: UploadFileTcpReq, processID: string) {
    return firstValueFrom(
      this.mediaClient
        .send<string, UploadFileTcpReq>(TCP_REQUEST_MESSAGE.MEDIA.UPLOAD_FILE, {
          data,
          processID,
        })
        .pipe(map((data) => data.data)),
    );
  }

  paySuccess(invoiceId: string) {
    return this.invoiceRepository.updateById(invoiceId, {
      status: INVOICE_STATUS.PAID,
    });
  }
}
