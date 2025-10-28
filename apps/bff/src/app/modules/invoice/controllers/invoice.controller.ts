import { Body, Controller, Inject, Logger, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateInvoiceRequestDto, InvoiceResponseDto } from '@common/interfaces/gateway/invoice';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { CreateInvoiceTcpRequest, InvoiceTcpResponse, SendInvoiceTcpReq } from '@common/interfaces/tcp/invoice';
import { ProcessId } from '@common/decorators/processId.decorator';
import { map } from 'rxjs';
import { Authorization } from '@common/decorators/authorizer.decorator';
import { UserData } from '@common/decorators/userData.decorator';
import { AuthorizedMetadata } from '@common/interfaces/tcp/authorizer';
import { Permissions } from '@common/decorators/permission.decorator';
import { PERMISSION } from '@common/constants/enum/role.enum';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(@Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceClient: TcpClient) {}

  @Post()
  @ApiOkResponse({ type: ResponseDto<InvoiceResponseDto> })
  @ApiOperation({ summary: 'Create a new invoice' })
  @Authorization({ secured: true })
  @Permissions([PERMISSION.INVOICE_CREATE, PERMISSION.INVOICE_GET_BY_ID])
  create(
    @Body() body: CreateInvoiceRequestDto,
    @ProcessId() processId: string,
    @UserData() userData: AuthorizedMetadata,
  ) {
    Logger.debug('User data', userData);

    return this.invoiceClient
      .send<InvoiceTcpResponse, CreateInvoiceTcpRequest>(TCP_REQUEST_MESSAGE.INVOICE.CREATE, {
        data: body,
        processId,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }

  @Post(':id/send')
  @ApiOkResponse({ type: ResponseDto<string> })
  @ApiOperation({
    summary: 'Send invoice by id',
  })
  @Authorization({ secured: true })
  @Permissions([PERMISSION.INVOICE_SEND])
  send(@Param('id') id: string, @ProcessId() processId: string, @UserData() userData: AuthorizedMetadata) {
    return this.invoiceClient
      .send<string, SendInvoiceTcpReq>(TCP_REQUEST_MESSAGE.INVOICE.SEND, {
        data: { invoiceId: id, userId: userData.userId },
        processId,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
