import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';
import { MongoProvider } from '@common/configuration/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDestination } from '@common/schemas/user.schema';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserGrpcController } from './controllers/user.grpc.controller';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    MongoProvider,
    MongooseModule.forFeature([UserDestination]),
    ClientsModule.registerAsync([TcpProvider(TCP_SERVICES.AUTHORIZER_SERVICE)]),
  ],
  controllers: [UserController, UserGrpcController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
