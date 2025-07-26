import { Controller, UseInterceptors } from '@nestjs/common';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { MessagePattern } from '@nestjs/microservices';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { RequestParams } from '@common/decorators/request-params.decorator';
import { CreateProductTcpReq } from '@common/interfaces/tcp/product';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { HTTP_MESSAGE } from '@common/constants/enums/http-message.enum';
import { ProductService } from '../services/product.service';

@UseInterceptors(TcpLoggingInterceptor)
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern(TCP_REQUEST_MESSAGE.PRODUCT.CREATE)
  async create(@RequestParams() params: CreateProductTcpReq): Promise<Response<string>> {
    await this.productService.create(params);
    return Response.success<string>(HTTP_MESSAGE.CREATED);
  }
}
