import { Product, ProductModel, ProductModelName } from '@common/schemas/product.schema';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  constructor(@Inject(ProductModelName) private readonly productModel: ProductModel) {}

  create(data: Partial<Product>) {
    return this.productModel.create(data);
  }
}
