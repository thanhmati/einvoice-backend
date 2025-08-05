import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { MongoProvider } from '@common/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDestination } from '@common/schemas/user.schema';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserGrpcController } from './controllers/user.grpc.controller';

@Module({
  imports: [MongoProvider, MongooseModule.forFeature([UserDestination])],
  controllers: [UserController, UserGrpcController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
