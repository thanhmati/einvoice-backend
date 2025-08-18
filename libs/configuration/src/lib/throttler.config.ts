import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';

export const ThrottlerProvider = ThrottlerModule.forRoot({
  throttlers: [{ ttl: 60000, limit: 10 }],
  errorMessage: 'Too many requests, please try again later',
  storage: new ThrottlerStorageRedisService(),
});
