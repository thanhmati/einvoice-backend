import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { Model } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'product',
  toJSON: {
    virtuals: true,
  },
})
export class Product extends BaseSchema {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  sku: string;

  @Prop({ type: String })
  unit: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  vatRate: number;
}

export const ProductModelName = Product.name;

export const ProductSchema = SchemaFactory.createForClass(Product);

export type ProductModel = Model<Product>;

export const ProductDestination = {
  name: ProductModelName,
  schema: ProductSchema,
};
