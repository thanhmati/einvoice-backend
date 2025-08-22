import { Prop, Schema } from '@nestjs/mongoose';
import { BaseSchema, createSchema } from '../base.schema';

export enum INVOICE_SAGA_STATE {
  PENDING = 'PENDING',
  GENERATING_PDF = 'GENERATING_PDF',
  UPLOADING_FILE = 'UPLOADING_FILE',
  AUTHORIZING_PAYMENT = 'AUTHORIZING_PAYMENT',
  SENT = 'SENT',
  COMPLETED = 'COMPLETED',
  COMPENSATING = 'COMPENSATING',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'invoice_saga',
})
export class InvoiceSaga extends BaseSchema {
  @Prop({ type: String })
  invoiceId: string;

  @Prop({ type: String, enum: INVOICE_SAGA_STATE, default: INVOICE_SAGA_STATE.PENDING })
  state: INVOICE_SAGA_STATE;

  @Prop({ type: String })
  currentStep: string;

  @Prop({ type: Number, default: 0 })
  retryCount: number;

  @Prop({ type: Object, required: false })
  context?: Record<string, any>;
}

export const InvoiceSagaModelName = InvoiceSaga.name;
export const InvoiceSagaSchema = createSchema(InvoiceSaga);

export const InvoiceSagaDestination = {
  name: InvoiceSagaModelName,
  schema: InvoiceSagaSchema,
};