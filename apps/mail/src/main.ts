/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { bootstrapMicroservice } from '@common/utils/bootstrap.util';
import { AppModule } from './app/app.module';
import { QUEUE_GROUPS } from '@common/constants/enum/queue.enum';

bootstrapMicroservice({
  serviceName: 'mail-service',
  appModule: AppModule,
  port: process.env.MAIL_PORT || 3000,
  kafka: {
    brokerUrl: AppModule.CONFIGURATION.KAFKA_CONFIG.URL,
    groupId: QUEUE_GROUPS.MAIL,
  },
});
