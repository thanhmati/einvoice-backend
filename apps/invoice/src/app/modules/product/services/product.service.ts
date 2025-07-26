import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductTcpReq } from '@common/interfaces/tcp/product';
import { ERROR_CODE } from '@common/constants/enums/error-code.enum';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) { }

  async create(data: CreateProductTcpReq) {
    const { sku, name } = data;

    const exists = await this.productRepository.exists(sku, name);

    if (exists) {
      throw new BadRequestException(ERROR_CODE.PRODUCT_ALREADY_EXISTS);
    }

    return this.productRepository.create(data);
  }

  async getAll() {
    return this.productRepository.findAll();
  }

  async getById(id: string) {
    return this.productRepository.findById(id);
  }
}
