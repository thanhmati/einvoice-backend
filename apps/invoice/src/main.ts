/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { bootstrapMicroservice } from '@common/utils/bootstrap.util';
import { AppModule } from './app/app.module';

bootstrapMicroservice({
  serviceName: 'invoice-service',
  appModule: AppModule,
  port: process.env.INVOICE_PORT || 3000,
  globalPrefix: AppModule.CONFIGURATION.GLOBAL_PREFIX,
  tcp: {
    host: AppModule.CONFIGURATION.TCP_SERV.TCP_INVOICE_SERVICE.options.host,
    port: AppModule.CONFIGURATION.TCP_SERV.TCP_INVOICE_SERVICE.options.port,
  },
});
