import { TCP_SERVICES } from '@common/configuration';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductTcpReq, ProductTcpRes } from '@common/interfaces/tcp/product';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { CreateProductRequestDto, ProductResponseDto } from '@common/interfaces/gateway/dto/product';
import { ProcessID } from '@common/decorators/processID.decorator';
import { map } from 'rxjs';
import { ResponseDto } from '@common/interfaces/gateway/common/response.interface';
import { Authorization } from '@common/decorators/authorizer.decorator';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(@Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceClient: TcpClient) {}

  @Post()
  @ApiOkResponse({
    type: ResponseDto<string>,
  })
  @ApiOperation({
    summary: 'Create new a product',
  })
  @Authorization({ secured: true })
  create(@Body() body: CreateProductRequestDto, @ProcessID() processID: string) {
    return this.invoiceClient
      .send<string, CreateProductTcpReq>(TCP_REQUEST_MESSAGE.PRODUCT.CREATE, {
        data: body,
        processID,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }

  @Get()
  @ApiOkResponse({
    type: ResponseDto<ProductResponseDto[]>,
  })
  @ApiOperation({
    summary: 'Get all products',
  })
  getAll(@ProcessID() processID: string) {
    return this.invoiceClient
      .send<ProductTcpRes[]>(TCP_REQUEST_MESSAGE.PRODUCT.GET_ALL, {
        processID,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }

  @Get(':id')
  @ApiOkResponse({
    type: ResponseDto<ProductResponseDto>,
  })
  @ApiOperation({
    summary: 'Get a product by id',
  })
  getById(@Param('id') id: string, @ProcessID() processID: string) {
    return this.invoiceClient
      .send<ProductTcpRes, string>(TCP_REQUEST_MESSAGE.PRODUCT.GET_BY_ID, {
        data: id,
        processID,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
