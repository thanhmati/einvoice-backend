export class AppConfiguration {
  PORT: number;

  constructor() {
    this.PORT = process.env['PORT'] ? Number(process.env['PORT']) : 3300;
  }
}
