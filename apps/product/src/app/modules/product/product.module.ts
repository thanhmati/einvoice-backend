import { TypeOrmProvider } from '@common/configuration/type-orm.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@common/entities/product.entity';

@Module({
  imports: [TypeOrmProvider, TypeOrmModule.forFeature([Product])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ProductModule {}
