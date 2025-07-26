import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class BaseResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: String })
  _id: ObjectId;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
