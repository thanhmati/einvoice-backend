import { Product } from '@common/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(@InjectRepository(Product) private readonly repo: Repository<Product>) {}

  async create(data: Partial<Product>): Promise<Product> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<Product[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Product | null> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Product>): Promise<Product | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async exists(sku: string, name: string): Promise<boolean> {
    const result = await this.repo.findOne({
      where: [{ sku }, { name }],
    });
    return !!result;
  }
}
