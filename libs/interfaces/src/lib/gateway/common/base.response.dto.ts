import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional({ nullable: true })
  deletedAt?: Date;
}
