import { Module } from '@nestjs/common';
import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';
import { AuthorizerController } from './controllers/authorizer.controller';

@Module({
  imports: [],
  controllers: [AuthorizerController],
  providers: [TcpProvider(TCP_SERVICES.AUTHORIZER_SERVICE)],
  exports: [],
})
export class AuthorizerModule {}
