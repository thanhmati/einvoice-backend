import { Module } from '@nestjs/common';

import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [TcpProvider(TCP_SERVICES.USER_ACCESS_SERVICE)],
  exports: [],
})
export class UserModule {}
