import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleDestination } from '@common/schemas/role.schema';
import { RoleService } from './services/role.service';
import { RoleRepository } from './repositories/role.repository';
import { RoleController } from './controllers/role.controller';

@Module({
  imports: [MongooseModule.forFeature([RoleDestination])],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [],
})
export class RoleModule {}
