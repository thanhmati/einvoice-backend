import { IsBoolean, IsNotEmpty, IsString, validateSync } from 'class-validator';
import { Logger } from '@nestjs/common';

export class BaseConfiguration {
  @IsString()
  NODE_ENV: string;

  @IsBoolean()
  IS_DEV: boolean;

  @IsString()
  @IsNotEmpty()
  GLOBAL_PREFIX: string;

  constructor() {
    this.NODE_ENV = process.env['NODE_ENV'] || 'development';
    this.IS_DEV = this.NODE_ENV === 'development';
    this.GLOBAL_PREFIX = process.env['GLOBAL_PREFIX'] || '';
  }

  validate() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      const _errors = errors.map((error) => {
        return error.children;
      });

      Logger.error(_errors, errors);

      throw new Error('Configuration is invalid');
    }
  }
}
