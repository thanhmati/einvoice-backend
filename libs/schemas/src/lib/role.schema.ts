import { Prop, Schema } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { PERMISSION, ROLE } from '@common/constants/role.constant';

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'role',
  toJSON: {
    virtuals: true,
  },
})
export class Role extends BaseSchema {
  @Prop({ type: String, enum: ROLE, default: ROLE.ACCOUNTANT })
  name: ROLE;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [String], enum: PERMISSION, default: [] })
  permissions: PERMISSION[];
}
