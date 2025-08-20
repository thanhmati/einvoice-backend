import { MongoProvider } from '@common/configuration/mongo.config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleDestination } from '@common/schemas/role.schema';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './services/role.service';

@Module({
  imports: [MongoProvider, MongooseModule.forFeature([RoleDestination])],
  controllers: [],
  providers: [RoleRepository, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
