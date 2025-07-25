import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Schema({
  versionKey: false,
  _id: false,
})
export class Client {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  address: string;
}

@Schema({
  versionKey: false,
  _id: false,
})
export class Item {
  @Prop({ type: ObjectId, ref: 'Product' })
  productId: ObjectId;

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
