import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

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
