import { Module } from '@nestjs/common';
import { MongoProvider } from '@common/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductDestination } from '@common/schemas/product.schema';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [MongoProvider, MongooseModule.forFeature([ProductDestination])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule { }
