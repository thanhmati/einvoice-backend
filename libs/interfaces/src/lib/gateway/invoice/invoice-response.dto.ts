import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { INVOICE_STATUS } from '@common/constants/enum/invoice.enum';
import { BaseResponseDto } from '../common/base-response.dto';

class ClientResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;
}

class ItemResponseDto {
  @ApiProperty({ type: String })
  productId: ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  unitPrice: number;

  @ApiProperty()
  vatRate: number;

  @ApiProperty()
  total: number;
}

export class InvoiceResponseDto extends BaseResponseDto {
  @ApiProperty({ type: ClientResponseDto })
  client: ClientResponseDto;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  vatAmount: number;

  @ApiProperty({ type: String, enum: INVOICE_STATUS })
  status: INVOICE_STATUS;

  @ApiProperty({ type: [ItemResponseDto] })
  items: ItemResponseDto[];

  @ApiPropertyOptional({ type: String })
  supervisorId?: ObjectId;

  @ApiPropertyOptional()
  fileUrl?: string;
}
