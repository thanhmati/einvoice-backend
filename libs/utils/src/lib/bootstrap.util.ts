import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { initTracing } from '@common/observability/tracing/tracing';

export interface TcpMicroserviceConfig {
  host: string;
  port: number;
}

export interface GrpcMicroserviceConfig {
  name: string;
  protoPath: string;
  url: string;
}

export interface KafkaMicroserviceConfig {
  brokerUrl: string;
  groupId: string;
}

export interface BootstrapOptions {
  /** Service name for tracing (e.g. 'invoice-service') */
  serviceName: string;
  /** The root AppModule class */
  appModule: any;
  /** Port to listen on */
  port: number | string;
  /** Global route prefix (default: 'api') */
  globalPrefix?: string;
  /** TCP microservice connection config */
  tcp?: TcpMicroserviceConfig;
  /** GRPC microservice connection configs */
  grpc?: GrpcMicroserviceConfig[];
  /** Kafka microservice connection config */
  kafka?: KafkaMicroserviceConfig;
}

/**
 * Shared bootstrap function for all microservices.
 * Eliminates duplicated bootstrap logic across apps.
 *
 * @example
 * ```ts
 * bootstrapMicroservice({
 *   serviceName: 'invoice-service',
 *   appModule: AppModule,
 *   port: process.env.INVOICE_PORT || 3000,
 *   tcp: {
 *     host: AppModule.CONFIGURATION.TCP_SERV.TCP_INVOICE_SERVICE.options.host,
 *     port: AppModule.CONFIGURATION.TCP_SERV.TCP_INVOICE_SERVICE.options.port,
 *   },
 * });
 * ```
 */
export async function bootstrapMicroservice(options: BootstrapOptions): Promise<void> {
  const {
    serviceName,
    appModule,
    port,
    globalPrefix = 'api',
    tcp,
    grpc,
    kafka,
  } = options;

  initTracing(serviceName);

  const app = await NestFactory.create(appModule);

  // Connect TCP microservice
  if (tcp) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
      options: {
        host: tcp.host,
        port: tcp.port,
      },
    });
  }

  // Connect GRPC microservices
  if (grpc && grpc.length > 0) {
    for (const grpcConfig of grpc) {
      app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
          package: grpcConfig.name,
          protoPath: grpcConfig.protoPath,
          url: grpcConfig.url,
        },
      });
    }
  }

  // Connect Kafka microservice
  if (kafka) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [kafka.brokerUrl],
        },
        consumer: {
          groupId: kafka.groupId,
          allowAutoTopicCreation: true,
        },
      },
    });
  }

  app.setGlobalPrefix(globalPrefix);

  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
