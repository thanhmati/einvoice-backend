import { Prop, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema, createSchema } from './base.schema';
import { INVOICE_STATUS } from '@common/constants/enum/invoice.enum';

export class Client {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  address: string;
}

export class Item {
  @Prop({ type: String })
  productId: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: Number })
  unitPrice: number;

  @Prop({ type: Number })
  vatRate: number;

  @Prop({ type: Number })
  total: number;
}

@Schema({
  collection: 'invoice',
})
export class Invoice extends BaseSchema {
  @Prop({ type: Client })
  client: Client;

  @Prop({ type: Number })
  totalAmount: number;

  @Prop({ type: Number })
  vatAmount: number;

  @Prop({ type: String, enum: INVOICE_STATUS, default: INVOICE_STATUS.CREATED })
  status: INVOICE_STATUS;

  @Prop({ type: [Item] })
  items: Item[];

  @Prop({ type: String, required: false })
  supervisorId?: string;

  @Prop({ type: String, required: false })
  fileUrl?: string;
}

export const InvoiceSchema = createSchema(Invoice);

export const InvoiceModelName = Invoice.name;
export const InvoiceDestination = {
  name: InvoiceModelName,
  schema: InvoiceSchema,
};

export type InvoiceModel = Model<Invoice>;
