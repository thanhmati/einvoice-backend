/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { bootstrapMicroservice } from '@common/utils/bootstrap.util';
import { AppModule } from './app/app.module';

bootstrapMicroservice({
  serviceName: 'authorizer-service',
  appModule: AppModule,
  port: process.env.AUTHORIZER_PORT || 3000,
  tcp: {
    host: AppModule.CONFIGURATION.TCP_SERV.TCP_AUTHORIZER_SERVICE.options.host,
    port: AppModule.CONFIGURATION.TCP_SERV.TCP_AUTHORIZER_SERVICE.options.port,
  },
  grpc: [
    {
      name: AppModule.CONFIGURATION.GRPC_SERV.GRPC_AUTHORIZER_SERVICE.name,
      protoPath: AppModule.CONFIGURATION.GRPC_SERV.GRPC_AUTHORIZER_SERVICE.options.protoPath,
      url: AppModule.CONFIGURATION.GRPC_SERV.GRPC_AUTHORIZER_SERVICE.options.url,
    },
  ],
});
