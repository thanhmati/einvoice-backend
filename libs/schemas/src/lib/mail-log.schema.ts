import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { MAIL_STATUS } from '@common/constants/mail.constant';
import { Model } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'mail_log',
  toJSON: {
    virtuals: true,
  },
})
export class MailLog extends BaseSchema {
  @Prop({ type: String })
  to: string;

  @Prop({ type: String })
  subject: string;

  @Prop({ type: MAIL_STATUS, enum: MAIL_STATUS, default: MAIL_STATUS.SENT })
  status: MAIL_STATUS;
}

export const MailLogModelName = MailLog.name;

export const MailLogSchema = SchemaFactory.createForClass(MailLog);

export type MailLogModel = Model<MailLog>;

export const MailLogDestination = {
  name: MailLogModelName,
  schema: MailLogSchema,
};
