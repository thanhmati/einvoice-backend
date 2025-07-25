import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../base.schema';
import { Client, Item } from './common.schema';
import { INVOICE_STATUS } from '@common/constants/invoice.constant';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'invoice',
  toJSON: {
    virtuals: true,
  },
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

  @Prop({ type: ObjectId, ref: 'User' })
  supervisorId: ObjectId;
}

export const InvoiceModelName = Invoice.name;

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

export type InvoiceModel = Model<Invoice>;

export const InvoiceDestination = {
  name: InvoiceModelName,
  schema: InvoiceSchema,
};
