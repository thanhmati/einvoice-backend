import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductRequestDto, ProductResponseDto } from '@common/interfaces/gateway/product';
import { ProcessId } from '@common/decorators/processId.decorator';
import { CreateProductTcpRequest, ProductTcpResponse } from '@common/interfaces/tcp/product';
import { TCP_REQUEST_MESSSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { map } from 'rxjs';
import { Authorization } from '@common/decorators/authorizer.decorator';
import { UserData } from '@common/decorators/user-data.decorator';
import { AuthorizedMetadata } from '@common/interfaces/tcp/authorizer';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(@Inject(TCP_SERVICES.PRODUCT_SERVICE) private readonly productClient: TcpClient) {}

  @Post()
  @ApiOkResponse({ type: ResponseDto<ProductResponseDto> })
  @ApiOperation({ summary: 'Create a new product' })
  create(@Body() body: CreateProductRequestDto, @ProcessId() processId: string) {
    return this.productClient
      .send<ProductTcpResponse, CreateProductTcpRequest>(TCP_REQUEST_MESSSAGE.PRODUCT.CREATE, {
        data: body,
        processId,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }

  @Get()
  @ApiOkResponse({ type: ResponseDto<ProductResponseDto[]> })
  @ApiOperation({ summary: 'Get list products' })
  @Authorization({ secured: true })
  getList(@ProcessId() processId: string, @UserData() userData: AuthorizedMetadata) {
    Logger.debug({ userData });

    return this.productClient
      .send<ProductTcpResponse[]>(TCP_REQUEST_MESSSAGE.PRODUCT.GET_LIST, { processId })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
