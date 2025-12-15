import { ApiProperty } from '@nestjs/swagger';

export class BaseEntityResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
