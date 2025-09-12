import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repositories/product.repository';
import { TypeOrmProvider } from '@common/configuration/type-orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@common/schemas/product.entity';

@Module({
  imports: [TypeOrmProvider, TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
