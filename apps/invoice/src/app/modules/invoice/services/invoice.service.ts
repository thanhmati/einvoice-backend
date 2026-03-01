import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { CreateInvoiceTcpRequest, SendInvoiceTcpReq } from '@common/interfaces/tcp/invoice';
import { invoiceRequestMapping } from '../mappers';
import { INVOICE_STATUS } from '@common/constants/enum/invoice.enum';
import { ERROR_CODE } from '@common/constants/enum/error-code.enum';
import { KafkaService } from '@common/kafka/kafka.service';
import { InvoiceSentPayload } from '@common/interfaces/queue/invoice';
import { InvoiceSendSagaContext } from '@common/interfaces/saga/saga-step.interface';
import { InvoiceSendSagaSteps } from '../sagas/invoice-send-saga-steps.service';
import { SagaOrchestrationService } from '@common/saga-orchestration/saga-orchestration.service';
import { SAGA_TYPE } from '@common/constants/enum/saga.enum';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);

  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly kafkaClient: KafkaService,
    private readonly sagaSteps: InvoiceSendSagaSteps,
    private readonly sagaOrchestrator: SagaOrchestrationService,
  ) {}

  create(params: CreateInvoiceTcpRequest) {
    const input = invoiceRequestMapping(params);

    return this.invoiceRepository.create(input);
  }

  async sendById(params: SendInvoiceTcpReq, processId: string) {
    const { invoiceId, userId } = params;

    const invoice = await this.invoiceRepository.getById(invoiceId);

    if (invoice.status !== INVOICE_STATUS.CREATED) {
      throw new BadRequestException(ERROR_CODE.INVOICE_CAN_NOT_BE_SENT);
    }

    // Execute saga
    const context: InvoiceSendSagaContext = {
      sagaId: '',
      invoiceId,
      userId,
      processId,
    };

    const steps = this.sagaSteps.getSteps(invoice);

    try {
      await this.sagaOrchestrator.execute(SAGA_TYPE.INVOICE_SEND, steps, context);

      this.kafkaClient.emit<InvoiceSentPayload>('invoice-sent', {
        id: invoiceId,
        paymentLink: context.paymentLink,
      });
    } catch (error) {
      this.logger.error(`Failed to send invoice ${invoiceId}: ${error.message}`);
      throw error;
    }
  }

  updateInvoicePaid(invoiceId: string) {
    return this.invoiceRepository.updateById(invoiceId, { status: INVOICE_STATUS.PAID });
  }

  getAll() {
    return this.invoiceRepository.getAll();
  }

  getById(id: string) {
    return this.invoiceRepository.getById(id);
  }
}
