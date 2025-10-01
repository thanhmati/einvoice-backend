import { RoleModel, RoleModelName } from '@common/schemas/role.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoleRepository {
  constructor(@InjectModel(RoleModelName) private readonly roleModel: RoleModel) {}

  getAll() {
    return this.roleModel.find().exec();
  }

  getById(id: string) {
    return this.roleModel.findById(id).exec();
  }

  getByName(name: string) {
    return this.roleModel.findOne({ name }).exec();
  }
}
