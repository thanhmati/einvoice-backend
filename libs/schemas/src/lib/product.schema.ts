import { Prop, Schema } from '@nestjs/mongoose';
import { BaseSchema, createSchema } from './base.schema';
import { Model } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'product',
})
export class Product extends BaseSchema {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, required: false })
  description?: string;

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

export const ProductSchema = createSchema(Product);

export type ProductModel = Model<Product>;

export const ProductDestination = {
  name: ProductModelName,
  schema: ProductSchema,
};
