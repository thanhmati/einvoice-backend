import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  getData(): { message: string } {
    this.logger.debug('call api');
    return { message: 'Hello API' };
  }
}
