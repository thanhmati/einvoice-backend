import { IsString, IsNotEmpty } from 'class-validator';

export class MailConfiguration {
  @IsString()
  @IsNotEmpty()
  HOST: string;

  @IsString()
  @IsNotEmpty()
  PORT: string;

  @IsString()
  @IsNotEmpty()
  USER: string;

  @IsString()
  @IsNotEmpty()
  PASS: string;

  @IsString()
  @IsNotEmpty()
  SENDER_NAME: string;

  @IsString()
  @IsNotEmpty()
  SENDER_EMAIL: string;

  constructor() {
    this.HOST = process.env['MAIL_HOST'] || '';
    this.PORT = process.env['MAIL_PORT'] || '';
    this.USER = process.env['MAIL_USER'] || '';
    this.PASS = process.env['MAIL_PASS'] || '';
    this.SENDER_NAME = process.env['MAIL_SENDER_NAME'] || '';
    this.SENDER_EMAIL = process.env['MAIL_SENDER_EMAIL'] || '';
  }
}
