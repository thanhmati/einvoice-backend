import { Module } from '@nestjs/common';
import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';
import { RoleController } from './controllers/role.controller';

@Module({
  imports: [],
  controllers: [RoleController],
  providers: [TcpProvider(TCP_SERVICES.USER_ACCESS_SERVICE)],
  exports: [],
})
export class RoleModule {}
