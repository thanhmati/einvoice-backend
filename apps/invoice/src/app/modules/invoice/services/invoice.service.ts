import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoiceService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
