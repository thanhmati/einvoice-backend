import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class LogiConfiguration {
  @IsString()
  @IsNotEmpty()
  HOST: string;

  @IsBoolean()
  @IsNotEmpty()
  ENABLE_LOKI_PUSH: boolean;

  constructor() {
    this.HOST = process.env['LOKI_HOST'] || 'http://localhost:3100';
    this.ENABLE_LOKI_PUSH = process.env['ENABLE_LOKI_PUSH'] === 'true' || false;
  }
}
