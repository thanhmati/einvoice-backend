/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { bootstrapMicroservice } from '@common/utils/bootstrap.util';
import { AppModule } from './app/app.module';

bootstrapMicroservice({
  serviceName: 'pdf-generator-service',
  appModule: AppModule,
  port: process.env.PDF_GENERATOR_PORT || 3000,
  tcp: {
    host: AppModule.CONFIGURATION.TCP_SERV.TCP_PDF_GENERATOR_SERVICE.options.host,
    port: AppModule.CONFIGURATION.TCP_SERV.TCP_PDF_GENERATOR_SERVICE.options.port,
  },
});
