import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const ThrottlerProvider = ThrottlerModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    throttlers: [{ ttl: 60000, limit: 1000 }],
    errorMessage: 'Too many requests, please try again later',
    storage: new ThrottlerStorageRedisService({
      host: configService.get('REDIS_CONFIG.HOST'),
      port: configService.get('REDIS_CONFIG.PORT'),
    }),
  }),
  inject: [ConfigService],
});
