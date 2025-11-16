import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class KafkaConfiguration {
  @IsString()
  @IsNotEmpty()
  HOST: string;

  @IsNumber()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  URL: string;

  constructor(data?: Partial<KafkaConfiguration>) {
    this.HOST = data?.HOST || process.env['KAFKA_HOST'] || 'localhost';
    this.PORT = data?.PORT || Number(process.env['KAFKA_PORT']) || 9092;
    this.URL = data?.URL || process.env['KAFKA_URL'] || `${this.HOST}:${this.PORT}`;
  }
}
