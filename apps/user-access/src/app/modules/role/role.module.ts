import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleDestination } from '@common/schemas/role.schema';
import { RoleService } from './services/role.service';
import { RoleRepository } from './repositories/role.repository';

@Module({
  imports: [MongooseModule.forFeature([RoleDestination])],
  controllers: [],
  providers: [RoleService, RoleRepository],
  exports: [],
})
export class RoleModule {}
