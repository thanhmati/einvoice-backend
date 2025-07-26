import { TCP_SERVICES } from '@common/configuration';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { Body, Controller, Get, Inject } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductTcpReq } from '@common/interfaces/tcp/product';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { CreateProductRequestDto } from '@common/interfaces/gateway/dto/product';
import { ProcessID } from '@common/decorators/processID.decorator';
import { map } from 'rxjs';
import { ResponseDto } from '@common/interfaces/gateway/common/response.interface';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(@Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceClient: TcpClient) {}

  @Get()
  @ApiOkResponse({
    type: ResponseDto<string>,
  })
  @ApiOperation({
    summary: 'Create new a product',
  })
  create(@Body() body: CreateProductRequestDto, @ProcessID() processID: string) {
    return this.invoiceClient
      .send<string, CreateProductTcpReq>(TCP_REQUEST_MESSAGE.PRODUCT.CREATE, {
        data: body,
        processID,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
