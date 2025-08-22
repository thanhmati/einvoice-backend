import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Outbox, OutboxModelName, OUTBOX_STATUS } from '@common/schemas/outbox.schema';

@Injectable()
export class OutboxRepository {
  constructor(@InjectModel(OutboxModelName) private readonly outboxModel: Model<Outbox>) {}

  create(data: Partial<Outbox>) {
    return this.outboxModel.create({ ...data, status: OUTBOX_STATUS.PENDING });
  }

  findPending(limit = 100) {
    return this.outboxModel
      .find({ status: OUTBOX_STATUS.PENDING })
      .sort({ createdAt: 1 })
      .limit(limit);
  }

  markSent(id: string) {
    return this.outboxModel.findByIdAndUpdate(id, { status: OUTBOX_STATUS.SENT });
  }

  markFailed(id: string) {
    return this.outboxModel.findByIdAndUpdate(id, { status: OUTBOX_STATUS.FAILED });
  }
}