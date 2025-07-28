import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { BaseResponseDto } from './base.response.dto';

export class SearchState<T> {
  @ApiProperty({
    type: String,
  })
  @IsString()
  searchTerm: string;

  @ApiProperty({
    type: [String],
  })
  @IsArray()
  searchFields: (keyof T)[];
}
