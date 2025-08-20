import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ClientsModule } from '@nestjs/microservices';
import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';

@Module({
  imports: [ClientsModule.registerAsync([TcpProvider(TCP_SERVICES.INVOICE_SERVICE)])],
  controllers: [ProductController],
  providers: [],
})
export class ProductModule {}
