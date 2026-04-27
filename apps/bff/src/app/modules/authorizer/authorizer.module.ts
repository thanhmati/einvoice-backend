import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { createTcpProxyModule } from '@common/utils/tcp-proxy-module.util';
import { AuthorizerController } from './controllers/authorizer.controller';

export const AuthorizerModule = createTcpProxyModule(
  AuthorizerController,
  TCP_SERVICES.AUTHORIZER_SERVICE,
);
