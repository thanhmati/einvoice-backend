import { GRPC_SERVICES } from '@common/configuration/grpc.config';
import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { HTTP_MESSAGE } from '@common/constants/enum/http-message.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisOptions, TcpClientOptions, Transport } from '@nestjs/microservices';
import { HealthCheckService, MemoryHealthIndicator, MicroserviceHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly configService: ConfigService,
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
  ) {}

  checkMemoryHeap() {
    return this.health.check([() => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024)]);
  }

  checkReadiness() {
    const tcpServices = [
      { key: TCP_SERVICES.INVOICE_SERVICE, configKey: 'TCP_SERV.TCP_INVOICE_SERVICE' },
      { key: TCP_SERVICES.PRODUCT_SERVICE, configKey: 'TCP_SERV.TCP_PRODUCT_SERVICE' },
      { key: TCP_SERVICES.USER_ACCESS_SERVICE, configKey: 'TCP_SERV.TCP_USER_ACCESS_SERVICE' },
      { key: TCP_SERVICES.AUTHORIZER_SERVICE, configKey: 'TCP_SERV.TCP_AUTHORIZER_SERVICE' },
      { key: TCP_SERVICES.PDF_GENERATOR_SERVICE, configKey: 'TCP_SERV.TCP_PDF_GENERATOR_SERVICE' },
      { key: TCP_SERVICES.MEDIA_SERVICE, configKey: 'TCP_SERV.TCP_MEDIA_SERVICE' },
    ];

    const grpcServices = [
      { key: GRPC_SERVICES.AUTHORIZER_SERVICE, configKey: 'GRPC_SERV.GRPC_AUTHORIZER_SERVICE' },
      { key: GRPC_SERVICES.USER_ACCESS_SERVICE, configKey: 'GRPC_SERV.GRPC_USER_ACCESS_SERVICE' },
    ];

    const tcpChecks = tcpServices.map((service) => () => this.checkTcpService(service.key, service.configKey));
    const grpcChecks = grpcServices.map((service) => () => this.checkGrpcService(service.key, service.configKey));

    return this.health.check([...tcpChecks, ...grpcChecks, () => this.checkRedisServer()]);
  }

  private checkTcpService(key: string, configKey: string) {
    return this.microservice.pingCheck<TcpClientOptions>(key, {
      transport: Transport.TCP,
      options: {
        host: this.configService.get(`${configKey}.options.host`),
        port: this.configService.get(`${configKey}.options.port`),
      },
    });
  }

  private checkGrpcService(key: string, configKey: string) {
    const url = this.configService.get(`${configKey}.options.url`);
    const [host, port] = url.split(':');
    return this.microservice.pingCheck<TcpClientOptions>(key, {
      transport: Transport.TCP,
      options: {
        host,
        port: Number(port),
      },
    });
  }

  private checkRedisServer() {
    return this.microservice.pingCheck<RedisOptions>('redis', {
      transport: Transport.REDIS,
      options: {
        host: this.configService.get('REDIS_CONFIG.HOST'),
        port: this.configService.get('REDIS_CONFIG.PORT'),
      },
    });
  }

  checkStartup() {
    return {
      status: HTTP_MESSAGE.OK,
    };
  }
}
