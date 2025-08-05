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
    this.TCP_INVOICE_SERVICE = TcpConfiguration.setValue(3201);
    this.TCP_PDF_GENERATOR_SERVICE = TcpConfiguration.setValue(3202);
    this.TCP_MEDIA_SERVICE = TcpConfiguration.setValue(3203);
    this.TCP_MAIL_SERVICE = TcpConfiguration.setValue(3204);
    this.TCP_USER_SERVICE = TcpConfiguration.setValue(3205);
    this.TCP_AUTHORIZER_SERVICE = TcpConfiguration.setValue(3206);
  }

  private static setValue(port?: number): TcpClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        port: port || 3200,
        host: '127.0.0.1',
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
