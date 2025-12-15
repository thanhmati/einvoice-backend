import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createKeyv } from '@keyv/redis';

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
    const host = configService.get('REDIS_CONFIG.HOST');
    const port = configService.get('REDIS_CONFIG.PORT');
    const ttl = configService.get('REDIS_CONFIG.TTL');
    return {
      stores: [createKeyv(`redis://${host}:${port}`)],
      ttl,
    };
  },
});
