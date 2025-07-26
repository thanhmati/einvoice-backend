import { Controller, UseInterceptors } from '@nestjs/common';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { MessagePattern } from '@nestjs/microservices';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { RequestParams } from '@common/decorators/request-params.decorator';
import { CreateProductTcpReq, ProductTcpRes } from '@common/interfaces/tcp/product';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { HTTP_MESSAGE } from '@common/constants/enums/http-message.enum';
import { ProductService } from '../services/product.service';

@UseInterceptors(TcpLoggingInterceptor)
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @MessagePattern(TCP_REQUEST_MESSAGE.PRODUCT.CREATE)
  async create(@RequestParams() params: CreateProductTcpReq): Promise<Response<string>> {
    await this.productService.create(params);
    return Response.success<string>(HTTP_MESSAGE.CREATED);
  }

  @MessagePattern(TCP_REQUEST_MESSAGE.PRODUCT.GET_ALL)
  async getAll(): Promise<Response<ProductTcpRes[]>> {
    const result = await this.productService.getAll();
    return Response.success<ProductTcpRes[]>(result);
  }

  @MessagePattern(TCP_REQUEST_MESSAGE.PRODUCT.GET_BY_ID)
  async getById(@RequestParams() id: string): Promise<Response<ProductTcpRes>> {
    const result = await this.productService.getById(id);
    return Response.success<ProductTcpRes>(result);
  }
}
