import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductTcpReq } from '@common/interfaces/tcp/product';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  create(data: CreateProductTcpReq) {
    return this.productRepository.create(data);
  }
}
