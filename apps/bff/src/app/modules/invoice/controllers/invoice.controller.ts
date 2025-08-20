import { ProcessID } from '@common/decorators/processID.decorator';
import { ResponseDto } from '@common/interfaces/gateway/common/response.interface';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateInvoiceRequestDto,
  InvoiceResponseDto,
  PaginateInvoiceRequestDto,
  UpdateInvoiceRequestDto,
} from '@common/interfaces/gateway/dto/invoice';
import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import {
  CreateInvoiceTcpReq,
  GetDetailInvoiceTcpRes,
  PaginateInvoiceTcpReq,
  PaginateInvoiceTcpRes,
  SendInvoiceTcpReq,
  UpdateInvoiceTcpReq,
} from '@common/interfaces/tcp/invoice';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enums/tcp-request-message.enum';
import { map } from 'rxjs';
import { PaginationResponse } from '@common/interfaces/gateway/common/pagination.response.dto';
import { Invoice } from '@common/schemas/invoice/invoice.schema';
import { Authorization } from '@common/decorators/authorizer.decorator';
import { AuthorizedMetadata } from '@common/interfaces/grpc/authorizer';
import { UserData } from '@common/decorators/user-data.decorator';
import { PERMISSION } from '@common/constants/role.constant';
import { Permissions } from '@common/decorators/permission.decorator';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(@Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceClient: TcpClient) {}

  @Post()
  @ApiOkResponse({
    type: ResponseDto<string>,
  })
  @ApiOperation({
    summary: 'Create new a invoice',
  })
  @Permissions(PERMISSION.INVOICE_CREATE)
  @Authorization({ secured: true })
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
  @Authorization({ secured: true })
  @Permissions(PERMISSION.INVOICE_GET_ALL)
  paginate(@Query() query: PaginateInvoiceRequestDto, @ProcessID() processID: string) {
    return this.invoiceClient
      .send<PaginateInvoiceTcpRes, PaginateInvoiceTcpReq>(TCP_REQUEST_MESSAGE.INVOICE.PAGINATE, {
        data: query,
        processID,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseDto<InvoiceResponseDto> })
  @ApiOperation({
    summary: 'Get detail invoice by id',
  })
  @Authorization({ secured: true })
  @Permissions(PERMISSION.INVOICE_GET_BY_ID)
  getById(@Param('id') id: string, @ProcessID() processID: string) {
    return this.invoiceClient
      .send<GetDetailInvoiceTcpRes, string>(TCP_REQUEST_MESSAGE.INVOICE.GET_BY_ID, {
        data: id,
        processID,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }

  @Put(':id')
  @ApiOkResponse({ type: ResponseDto<string> })
  @ApiOperation({
    summary: 'Update invoice by id',
  })
  @Authorization({ secured: true })
  @Permissions(PERMISSION.INVOICE_UPDATE)
  update(@Param('id') id: string, @Body() body: UpdateInvoiceRequestDto, @ProcessID() processID: string) {
    return this.invoiceClient
      .send<string, UpdateInvoiceTcpReq>(TCP_REQUEST_MESSAGE.INVOICE.UPDATE, {
        data: { id, ...body },
        processID,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponseDto<string> })
  @ApiOperation({
    summary: 'Delete invoice by id',
  })
  @Authorization({ secured: true })
  @Permissions(PERMISSION.INVOICE_DELETE)
  delete(@Param('id') id: string, @ProcessID() processID: string) {
    return this.invoiceClient
      .send<string, string>(TCP_REQUEST_MESSAGE.INVOICE.DELETE, {
        data: id,
        processID,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }

  @Post(':id/send')
  @ApiOkResponse({ type: ResponseDto<string> })
  @ApiOperation({
    summary: 'Send invoice by id',
  })
  @Authorization({ secured: true })
  @Permissions(PERMISSION.INVOICE_SEND)
  send(@Param('id') id: string, @ProcessID() processID: string, @UserData() userData: AuthorizedMetadata) {
    return this.invoiceClient
      .send<string, SendInvoiceTcpReq>(TCP_REQUEST_MESSAGE.INVOICE.SEND, {
        data: { invoiceId: id, userId: userData.userId },
        processID,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
