import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductTcpRequest } from '@common/interfaces/tcp/product';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(data: CreateProductTcpRequest) {
    const { sku, name } = data;

    const exists = await this.productRepository.exists(sku, name);
    if (exists) {
      throw new BadRequestException('Product already exists');
    }

    return this.productRepository.create(data);
  }

  getList() {
    return this.productRepository.findAll();
  }
}
