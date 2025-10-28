import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductRequestDto, ProductResponseDto } from '@common/interfaces/gateway/product';
import { ProcessId } from '@common/decorators/processId.decorator';
import { CreateProductTcpRequest, ProductTcpResponse } from '@common/interfaces/tcp/product';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { map } from 'rxjs';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(@Inject(TCP_SERVICES.PRODUCT_SERVICE) private readonly productClient: TcpClient) {}

  @Post()
  @ApiOkResponse({ type: ResponseDto<ProductResponseDto> })
  @ApiOperation({ summary: 'Create a new product' })
  create(@Body() body: CreateProductRequestDto, @ProcessId() processId: string) {
    return this.productClient
      .send<ProductTcpResponse, CreateProductTcpRequest>(TCP_REQUEST_MESSAGE.PRODUCT.CREATE, {
        data: body,
        processId,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }

  @Get()
  @ApiOkResponse({ type: ResponseDto<ProductResponseDto[]> })
  @ApiOperation({ summary: 'Get list products' })
  getList(@ProcessId() processId: string) {
    return this.productClient
      .send<ProductTcpResponse[]>(TCP_REQUEST_MESSAGE.PRODUCT.GET_LIST, { processId })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
