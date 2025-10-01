import { Prop, Schema } from '@nestjs/mongoose';
import { BaseSchema, createSchema } from './base.schema';
import { Model } from 'mongoose';
import { PERMISSION, ROLE } from '@common/constants/enum/role.enum';

@Schema({
  timestamps: true,
  collection: 'role',
})
export class Role extends BaseSchema {
  @Prop({ type: String, enum: ROLE, default: ROLE.ACCOUNTANT })
  name: ROLE;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [String], enum: PERMISSION, default: [] })
  permissions: PERMISSION[];
}

export const RoleModelName = Role.name;

export const RoleSchema = createSchema(Role);

export type RoleModel = Model<Role>;

export const RoleDestination = {
  name: RoleModelName,
  schema: RoleSchema,
};
