import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, TcpClientOptions, Transport } from '@nestjs/microservices';
import { IsNotEmpty, IsObject } from 'class-validator';

export enum TCP_SERVICES {
  INVOICE_SERVICE = 'TCP_INVOICE_SERVICE',
}

export class TcpConfiguration {
  @IsNotEmpty()
  @IsObject()
  TCP_INVOICE_SERVICE: TcpClientOptions;

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
