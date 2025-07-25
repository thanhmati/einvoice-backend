import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { Logger } from '@nestjs/common';

export class MongoConfiguration {
  @IsString()
  @IsNotEmpty()
  URL: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsNumber()
  POOL_SIZE: number;

  @IsNumber()
  CONNECT_TIMEOUT_MS: number;

  @IsNumber()
  SOCKET_TIMEOUT_MS: number;

  constructor(data?: Partial<MongoConfiguration>) {
    this.URL = data?.URL || process.env['MONGODB_URI'] || '';
    this.DB_NAME = data?.DB_NAME || process.env['MONGODB_DB_NAME'] || '';
    this.POOL_SIZE = data?.POOL_SIZE || Number(process.env['MONGODB_POOL_SIZE']) || 10;
    this.CONNECT_TIMEOUT_MS = data?.CONNECT_TIMEOUT_MS || Number(process.env['MONGODB_CONNECT_TIMEOUT_MS']) || 15000;
    this.SOCKET_TIMEOUT_MS = data?.SOCKET_TIMEOUT_MS || Number(process.env['MONGODB_SOCKET_TIMEOUT_MS']) || 360000;
  }
}

const logger = new Logger('MongoDB');

export const MongoProvider = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    uri: configService.get('MONGO_CONFIG.URL'),
    dbName: configService.get('MONGO_CONFIG.DB_NAME'),
    maxPoolSize: configService.get('MONGO_CONFIG.POOL_SIZE'),
    connectTimeoutMS: configService.get('MONGO_CONFIG.CONNECT_TIMEOUT_MS'),
    socketTimeoutMS: configService.get('MONGO_CONFIG.SOCKET_TIMEOUT_MS'),
    onConnectionCreate: (connection: Connection) => {
      connection.on('connected', () => logger.log(' 🟢   🟢   🟢   >>  connected'));
      connection.on('open', () => logger.log(' 🟢   🟢   🟢   >>  open'));
      connection.on('disconnected', () => logger.log(' 🪓   🪓   🪓   >>  disconnected'));
      connection.on('reconnected', () => logger.log(' 🧡   🧡   🧡   >>  reconnected'));
      connection.on('disconnecting', () => logger.log(' 🪓   🪓   🪓   >>  disconnecting'));

      return connection;
    },
  }),
  inject: [ConfigService],
});
