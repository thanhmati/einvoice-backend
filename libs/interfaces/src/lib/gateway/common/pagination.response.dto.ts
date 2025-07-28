import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base.response.dto';

export class PaginationResponse<T extends BaseResponseDto> {
  @ApiProperty()
  docs: T[];

  @ApiProperty()
  totalDocs: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  hasPrevPage: boolean;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  page?: number | undefined;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  prevPage?: number | null | undefined;

  @ApiProperty()
  nextPage?: number | null | undefined;
}
