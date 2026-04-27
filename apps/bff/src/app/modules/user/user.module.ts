import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { createTcpProxyModule } from '@common/utils/tcp-proxy-module.util';
import { UserController } from './controllers/user.controller';

export const UserModule = createTcpProxyModule(
  UserController,
  TCP_SERVICES.USER_ACCESS_SERVICE,
);
