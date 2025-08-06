import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

export class RedisConfiguration {
  @IsString()
  @IsNotEmpty()
  HOST: string;

  @IsNumber()
  PORT: number;

  @IsNumber()
  TTL: number;

  constructor(data?: Partial<RedisConfiguration>) {
    this.HOST = data?.HOST || process.env['REDIS_HOST'] || 'redis';
    this.PORT = data?.PORT || Number(process.env['REDIS_PORT']) || 6379;
    this.TTL = data?.TTL || Number(process.env['REDIS_TTL']) || 30 * 60000;
  }
}

export const RedisProvider = CacheModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      stores: [
        createKeyv(`redis://${configService.get('REDIS_CONFIG.HOST')}:${configService.get('REDIS_CONFIG.PORT')}`),
      ],
      ttl: configService.get('REDIS_CONFIG.TTL'),
    };
  },
});
