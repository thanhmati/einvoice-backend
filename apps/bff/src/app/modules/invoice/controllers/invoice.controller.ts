import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateInvoiceRequestDto, InvoiceResponseDto } from '@common/interfaces/gateway/invoice';
import { ProcessId } from '@common/decorators/processId.decorator';
import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { CreateInvoiceTcpRequest, InvoiceTcpResponse } from '@common/interfaces/tcp/invoice';
import { map } from 'rxjs';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(@Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceClient: TcpClient) {}

  @Post()
  @ApiOkResponse({ type: ResponseDto<InvoiceResponseDto> })
  @ApiOperation({ summary: 'Create new a invoice' })
  create(@Body() body: CreateInvoiceRequestDto, @ProcessId() processId: string) {
    return this.invoiceClient
      .send<InvoiceTcpResponse, CreateInvoiceTcpRequest>(TCP_REQUEST_MESSAGE.INVOICE.CREATE, {
        data: body,
        processId,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
