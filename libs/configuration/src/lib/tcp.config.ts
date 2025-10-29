import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, TcpClientOptions, Transport } from '@nestjs/microservices';
import { IsNotEmpty, IsObject } from 'class-validator';

export enum TCP_SERVICES {
  INVOICE_SERVICE = 'TCP_INVOICE_SERVICE',
  PRODUCT_SERVICE = 'TCP_PRODUCT_SERVICE',
  USER_ACCESS_SERVICE = 'TCP_USER_ACCESS_SERVICE',
  AUTHORIZER_SERVICE = 'TCP_AUTHORIZER_SERVICE',
  PDF_GENERATOR_SERVICE = 'TCP_PDF_GENERATOR_SERVICE',
  MEDIA_SERVICE = 'TCP_MEDIA_SERVICE',
}

export class TcpConfiguration {
  @IsNotEmpty()
  @IsObject()
  TCP_INVOICE_SERVICE: TcpClientOptions;

  @IsNotEmpty()
  @IsObject()
  TCP_PRODUCT_SERVICE: TcpClientOptions;

  @IsNotEmpty()
  @IsObject()
  TCP_USER_ACCESS_SERVICE: TcpClientOptions;

  @IsNotEmpty()
  @IsObject()
  TCP_AUTHORIZER_SERVICE: TcpClientOptions;

  @IsNotEmpty()
  @IsObject()
  TCP_PDF_GENERATOR_SERVICE: TcpClientOptions;

  @IsNotEmpty()
  @IsObject()
  TCP_MEDIA_SERVICE: TcpClientOptions;

  constructor() {
    Object.entries(TCP_SERVICES).forEach(([key, serviceName]) => {
      const host = process.env[`${key}_HOST`] || 'localhost';
      const port = Number(process.env[`${serviceName}_PORT`]) || 3200;

      this[serviceName] = TcpConfiguration.setValue(port, host);
    });
  }

  static setValue(port: number, host: string): TcpClientOptions {
    return { transport: Transport.TCP, options: { host, port } };
  }
}

export function TcpProvider(serviceName: keyof TcpConfiguration): ClientsProviderAsyncOptions {
  return {
    name: serviceName,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return configService.get(`TCP_SERV.${serviceName}`) as TcpClientOptions;
    },
  };
}
