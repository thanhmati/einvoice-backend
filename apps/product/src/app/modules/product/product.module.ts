import { TypeOrmProvider } from '@common/configuration/type-orm.config';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmProvider],
  controllers: [],
  providers: [],
  exports: [],
})
export class ProductModule {}
