import { ProcessID } from '@common/decorators/processID.decorator';
import { ResponseDto } from '@common/interfaces/gateway/common/response.interface';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateInvoiceRequestDto, InvoiceResponseDto, PaginateInvoiceRequestDto, } from '@common/interfaces/gateway/dto/invoice';
import { TCP_SERVICES } from '@common/configuration';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { CreateInvoiceTcpReq, PaginateInvoiceTcpReq, PaginateInvoiceTcpRes } from '@common/interfaces/tcp/invoice';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { map } from 'rxjs';
import { PaginationResponse } from '@common/interfaces/gateway/common/pagination.response.dto';
import { Invoice } from '@common/schemas/invoice/invoice.schema';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(@Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceClient: TcpClient) { }

  @Post()
  @ApiOkResponse({
    type: ResponseDto<string>,
  })
  @ApiOperation({
    summary: 'Create new a invoice',
  })
  create(@Body() body: CreateInvoiceRequestDto, @ProcessID() processID: string) {
    return this.invoiceClient
      .send<string, CreateInvoiceTcpReq>(TCP_REQUEST_MESSAGE.INVOICE.CREATE, {
        data: body,
        processID,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }

  @Get('')
  @ApiOkResponse({
    type: ResponseDto<PaginationResponse<Invoice>>,
  })
  @ApiOperation({
    summary: 'Get list invoice with pagination',
  })
  paginate(@Query() query: PaginateInvoiceRequestDto, @ProcessID() processID: string) {
    console.log({ query })

    return this.invoiceClient
      .send<PaginateInvoiceTcpRes, PaginateInvoiceTcpReq>(
        TCP_REQUEST_MESSAGE.INVOICE.PAGINATE,
        {
          data: query,
          processID,
        },
      )
      .pipe(map((data) => new ResponseDto(data)));
  }
}
