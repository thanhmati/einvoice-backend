import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DatabaseType } from 'typeorm';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export class TypeOrmConfiguration {
  @IsString()
  @IsNotEmpty()
  HOST: string;

  @IsNumber()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  USERNAME: string;

  @IsString()
  @IsNotEmpty()
  PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DATABASE: string;

  @IsString()
  @IsNotEmpty()
  TYPE: DatabaseType;

  constructor(data?: Partial<TypeOrmConfiguration>) {
    this.HOST = data?.HOST || process.env['TYPEORM_HOST'] || 'localhost';
    this.PORT = data?.PORT || Number(process.env['TYPEORM_PORT']) || 5432;
    this.USERNAME = data?.USERNAME || process.env['TYPEORM_USERNAME'] || 'postgres';
    this.PASSWORD = data?.PASSWORD || process.env['TYPEORM_PASSWORD'] || 'postgres';
    this.DATABASE = data?.DATABASE || process.env['TYPEORM_DATABASE'] || 'einvoice-app';
    this.TYPE = data?.TYPE || (process.env['TYPEORM_TYPE'] as DatabaseType) || 'postgres';
  }
}

export const TypeOrmProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: configService.get<string>('TYPEORM_CONFIG.TYPE') as DatabaseType,
      host: configService.get<string>('TYPEORM_CONFIG.HOST'),
      port: configService.get<number>('TYPEORM_CONFIG.PORT'),
      username: configService.get<string>('TYPEORM_CONFIG.USERNAME'),
      password: configService.get<string>('TYPEORM_CONFIG.PASSWORD'),
      database: configService.get<string>('TYPEORM_CONFIG.DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    } as TypeOrmModuleOptions;
  },
});
