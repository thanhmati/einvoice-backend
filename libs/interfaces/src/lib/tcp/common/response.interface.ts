import { HttpStatus } from '@nestjs/common';
import { HTTP_MESSAGE } from '@common/constants/enums/http-message.enum';

export class Response<T> {
  code: string;
  data?: T;
  error?: string;
  statusCode?: number;

  constructor(data: Partial<Response<T>>) {
    this.code = data.code ?? HTTP_MESSAGE.OK;
    this.data = data.data;
    this.error = data.error;
    this.statusCode = data.statusCode ?? HttpStatus.OK;
  }

  static success<T>(data: T) {
    return new Response({
      code: HTTP_MESSAGE.OK,
      data,
      statusCode: HttpStatus.OK,
    });
  }
}

export type ResponseType<T> = Response<T>;
