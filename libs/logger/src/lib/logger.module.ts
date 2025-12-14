import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class LoggerModule {
  static forRoot(appName: string) {
    return {
      module: LoggerModule,
      imports: [
        PinoLoggerModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const targets: any[] = [];

            // 1. Pretty Print for non-production (Dev)
            if (configService.get('NODE_ENV') !== 'production') {
              targets.push({
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  translateTime: 'SYS:standard',
                },
              });
            }

            // 2. Loki Push (Enable via env var)
            if (configService.get('LOKI_CONFIG.ENABLE_LOKI_PUSH')) {
              targets.push({
                target: 'pino-loki',
                options: {
                  batching: true,
                  interval: 5,
                  host: configService.get('LOKI_HOST') || 'http://localhost:3100',
                  labels: { application: appName },
                },
              });
            }

            return {
              pinoHttp: {
                transport:
                  targets.length > 0
                    ? {
                        targets,
                      }
                    : undefined,
                autoLogging: false,
                serializers: {
                  req: () => undefined,
                  res: () => undefined,
                },
              },
            };
          },
        }),
      ],
      exports: [PinoLoggerModule],
    };
  }
}
