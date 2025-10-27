import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, GrpcOptions, Transport } from '@nestjs/microservices';
import { IsNotEmpty, IsObject } from 'class-validator';
import { join } from 'path';

export enum GRPC_SERVICES {
  AUTHORIZER_SERVICE = 'GRPC_AUTHORIZER_SERVICE',
  USER_ACCESS_SERVICE = 'GRPC_USER_ACCESS_SERVICE',
}

export class GrpcConfiguration {
  @IsObject()
  @IsNotEmpty()
  GRPC_AUTHORIZER_SERVICE: GrpcOptions & { name: string };

  @IsObject()
  @IsNotEmpty()
  GRPC_USER_ACCESS_SERVICE: GrpcOptions & { name: string };

  constructor() {
    this.GRPC_AUTHORIZER_SERVICE = GrpcConfiguration.setValue({
      key: GRPC_SERVICES.AUTHORIZER_SERVICE,
      protoPath: ['./proto/authorizer.proto'],
      host: process.env['AUTHORIZER_SERVICE_HOST'] || 'localhost',
      port: Number(process.env['AUTHORIZER_SERVICE_PORT']) || 5100,
    });

    this.GRPC_USER_ACCESS_SERVICE = GrpcConfiguration.setValue({
      key: GRPC_SERVICES.USER_ACCESS_SERVICE,
      protoPath: ['./proto/user-access.proto'],
      host: process.env['USER_ACCESS_SERVICE_HOST'] || 'localhost',
      port: Number(process.env['USER_ACCESS_SERVICE_PORT']) || 5100,
    });
  }

  private static setValue({
    key,
    protoPath,
    port = 5100,
    host = '127.0.0.1',
  }: {
    key: GRPC_SERVICES;
    protoPath: string | string[];
    port?: number;
    host?: string;
  }): GrpcOptions & { name: string } {
    return {
      name: key,
      transport: Transport.GRPC,
      options: {
        package: key,
        protoPath: Array.isArray(protoPath)
          ? protoPath.map((path) => join(__dirname, path))
          : join(__dirname, protoPath),
        url: `${host}:${port}`,
      },
    };
  }
}

export const GrpcProvider = (serviceName: GRPC_SERVICES): ClientsProviderAsyncOptions => {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return configService.get(`GRPC_SERV.${serviceName}`) as GrpcOptions & { name: string };
    },
    name: serviceName,
  };
};
