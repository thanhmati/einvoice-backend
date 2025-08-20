import { IsNotEmpty, IsObject } from 'class-validator';
import { ClientsProviderAsyncOptions, TcpClientOptions, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

export enum TCP_SERVICES {
  INVOICE_SERVICE = 'TCP_INVOICE_SERVICE',
  PDF_GENERATOR_SERVICE = 'TCP_PDF_GENERATOR_SERVICE',
  MEDIA_SERVICE = 'TCP_MEDIA_SERVICE',
  MAIL_SERVICE = 'TCP_MAIL_SERVICE',
  USER_SERVICE = 'TCP_USER_SERVICE',
  AUTHORIZER_SERVICE = 'TCP_AUTHORIZER_SERVICE',
}

export class TcpConfiguration {
  @IsObject()
  @IsNotEmpty()
  TCP_INVOICE_SERVICE: TcpClientOptions;

  @IsObject()
  @IsNotEmpty()
  TCP_PDF_GENERATOR_SERVICE: TcpClientOptions;

  @IsObject()
  @IsNotEmpty()
  TCP_MEDIA_SERVICE: TcpClientOptions;

  @IsObject()
  @IsNotEmpty()
  TCP_MAIL_SERVICE: TcpClientOptions;

  @IsObject()
  @IsNotEmpty()
  TCP_USER_SERVICE: TcpClientOptions;

  @IsObject()
  @IsNotEmpty()
  TCP_AUTHORIZER_SERVICE: TcpClientOptions;

  constructor() {
    Object.entries(TCP_SERVICES).forEach(([key, service]) => {
      const port = Number(process.env[`${service}_PORT`]);
      const host = process.env[`${key}_HOST`];

      this[service] = TcpConfiguration.setValue(port, host);
    });
  }

  private static setValue(port?: number, host?: string): TcpClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        port: port || 3200,
        host: host || '127.0.0.1',
      },
    };
  }
}

export function TcpProvider(serviceName: keyof TcpConfiguration): ClientsProviderAsyncOptions {
  return {
    imports: [ConfigModule],
    name: serviceName,
    useFactory: async (configService: ConfigService) => {
      return configService.get(`TCP_SERV.${serviceName}`) as TcpClientOptions;
    },
    inject: [ConfigService],
  };
}
