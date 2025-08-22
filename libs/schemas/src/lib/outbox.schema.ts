import { Prop, Schema } from '@nestjs/mongoose';
import { BaseSchema, createSchema } from './base.schema';

export enum OUTBOX_STATUS {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'outbox',
})
export class Outbox extends BaseSchema {
  @Prop({ type: String })
  aggregateId: string;

  @Prop({ type: String })
  aggregateType: string;

  @Prop({ type: String })
  eventType: string;

  @Prop({ type: String })
  topic: string;

  @Prop({ type: Object })
  payload: Record<string, any>;

  @Prop({ type: Object, required: false })
  headers?: Record<string, any>;

  @Prop({ type: String, enum: OUTBOX_STATUS, default: OUTBOX_STATUS.PENDING })
  status: OUTBOX_STATUS;

  @Prop({ type: Number, default: 0 })
  retryCount: number;
}

export const OutboxModelName = Outbox.name;
export const OutboxSchema = createSchema(Outbox);

export const OutboxDestination = {
  name: OutboxModelName,
  schema: OutboxSchema,
};