import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { createTcpProxyModule } from '@common/utils/tcp-proxy-module.util';
import { ProductController } from './controllers/product.controller';

export const ProductModule = createTcpProxyModule(
  ProductController,
  TCP_SERVICES.PRODUCT_SERVICE,
);
