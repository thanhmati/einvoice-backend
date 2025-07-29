import { SortDirection } from '@common/constants/common.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsEnum, IsBoolean, IsNumber } from 'class-validator';

export class PaginateRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({ type: String, enum: SortDirection })
  @IsOptional()
  @IsEnum(SortDirection)
  sortOrder?: SortDirection;

  @ApiProperty({
    required: false,
    default: false,
  })
  @Transform(({ value }) => JSON.parse(`${value}`))
  @IsBoolean()
  skipPagination?: boolean;
}
