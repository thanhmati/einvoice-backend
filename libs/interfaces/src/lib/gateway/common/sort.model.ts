import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base.response.dto';
import { SortDirection, SortDirectionType } from '@common/constants/common.constant';

export class SortState {
  @ApiProperty({
    required: false,
    default: 'id',
  })
  column?: string;  // Id by default

  @ApiProperty({
    required: false,
    default: SortDirection.ASC,
  })
  direction?: SortDirectionType = 'asc'; // asc by default;
}
