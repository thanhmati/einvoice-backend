import { DEFAULT_PAGE_SIZE } from '@common/constants/common.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export const PageSizes = [3, 5, 10, 15, 50, 100];

export class PaginatorState {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageIndex?: number = 1;

  @ApiProperty({ default: DEFAULT_PAGE_SIZE })
  @Type(() => Number)
  @IsInt()
  @Min(PageSizes[0])
  pageSize: number = DEFAULT_PAGE_SIZE;

  total = 0;

  pageSizes: number[] = [];

  recalculatePaginator(total: number): PaginatorState {
    this.total = total;
    return this;
  }
}
