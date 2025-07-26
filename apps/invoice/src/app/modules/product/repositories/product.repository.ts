import { Product, ProductModel, ProductModelName } from '@common/schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductRepository {
  constructor(@InjectModel(ProductModelName) private readonly productModel: ProductModel) { }

  create(data: Partial<Product>) {
    return this.productModel.create(data);
  }

  async exists(sku: string, name: string) {
    const result = await this.productModel.exists({ $or: [{ sku }, { name }] });
    return !!result;
  }

  findAll() {
    return this.productModel.find();
  }

  findById(id: string) {
    return this.productModel.findById(id);
  }
}
