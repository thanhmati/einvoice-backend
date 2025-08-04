import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, GrpcOptions, Transport } from '@nestjs/microservices';
import { IsNotEmpty, IsObject } from 'class-validator';
import { join } from 'path';

export enum GRPC_SERVICES {
  AUTHORIZER_SERVICE = 'GRPC_AUTHORIZER_SERVICE',
}

export class GrpcConfiguration {
  @IsObject()
  @IsNotEmpty()
  GRPC_AUTHORIZER_SERVICE: GrpcOptions & { name: string };

  constructor() {
    this.GRPC_AUTHORIZER_SERVICE = GrpcConfiguration.setValue({
      key: GRPC_SERVICES.AUTHORIZER_SERVICE,
      protoPath: ['./proto/authorizer.proto'],
      port: 5100,
    });
  }

  private static setValue({
    key,
    protoPath,
    port,
  }: {
    key: GRPC_SERVICES;
    protoPath: string | string[];
    port: number;
  }): GrpcOptions & { name: string } {
    return {
      name: key,
      transport: Transport.GRPC,
      options: {
        package: key,
        protoPath: Array.isArray(protoPath)
          ? protoPath.map((path) => join(__dirname, path))
          : join(__dirname, protoPath),
        url: `127.0.0.1:${port}`,
      },
    };
  }
}

export const GrpcProvider = (serviceName: GRPC_SERVICES): ClientsProviderAsyncOptions => {
  return {
    imports: [ConfigModule],
    name: serviceName,
    useFactory: (configService: ConfigService) => {
      return configService.get(`GRPC_SERV.${serviceName}`) as GrpcOptions & {
        name: string;
      };
    },
    inject: [ConfigService],
  };
};
