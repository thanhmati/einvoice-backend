import { CreateUserTcpReq } from '@common/interfaces/tcp/user';
import { User } from '@common/schemas/user.schema';
import { ObjectId } from 'mongodb';

export const userRequestMapping = (data: CreateUserTcpReq): Partial<User> => {
  return {
    ...data,
    roles: data.roles.map((id) => new ObjectId(id)),
  };
};
