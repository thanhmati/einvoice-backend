class Configuration {
  NODE_ENV: string;

  IS_DEV: boolean;

  GLOBAL_PREFIX: string;

  PORT: number;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || 'development';
    this.IS_DEV = this.NODE_ENV === 'development';
    this.GLOBAL_PREFIX = process.env.GLOBAL_PREFIX || 'api/v1';
    this.PORT = process.env.PORT ? Number(process.env.PORT) : 3300;
  }
}

export const CONFIGURATION = new Configuration();

export type TConfiguration = typeof CONFIGURATION;
