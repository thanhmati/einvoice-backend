import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'user',
  toJSON: {
    virtuals: true,
  },
})
export class User extends BaseSchema {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: ObjectId, ref: 'Role' })
  roles: ObjectId[];
}

export const UserModelName = User.name;

export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = Model<User>;

export const UserDestination = {
  name: UserModelName,
  schema: UserSchema,
};
