import { IsNotEmpty, IsObject } from 'class-validator';
import { ClientsProviderAsyncOptions, TcpClientOptions, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

export enum TCP_SERVICES {
  INVOICE_SERVICE = 'TCP_INVOICE_SERVICE',
  PDF_GENERATOR_SERVICE = 'TCP_PDF_GENERATOR_SERVICE',
}

export class TcpConfiguration {
  @IsObject()
  @IsNotEmpty()
  TCP_INVOICE_SERVICE: TcpClientOptions;

  @IsObject()
  @IsNotEmpty()
  TCP_PDF_GENERATOR_SERVICE: TcpClientOptions;

  constructor() {
    this.TCP_INVOICE_SERVICE = TcpConfiguration.setValue(3200);
    this.TCP_PDF_GENERATOR_SERVICE = TcpConfiguration.setValue(3201);
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
