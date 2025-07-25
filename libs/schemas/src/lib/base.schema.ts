import { Prop, Virtual } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

export class BaseSchema {
  _id: ObjectId;

  @Virtual({
    get: (doc: any) => doc._id.toString(),
  })
  id: string;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;
}
