import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDestination } from '@common/schemas/user.schema';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [MongooseModule.forFeature([UserDestination])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [],
})
export class UserModule {}
