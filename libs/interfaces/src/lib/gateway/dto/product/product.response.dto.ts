import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../../common/base.response.dto';

export class ProductResponseDto extends BaseResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  unit: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  vatRate: number;
}
