import { ResponseType } from './response.interface';
import { Observable } from 'rxjs';

export interface TcpClient {
  send<TResult = any, TInput = any>(pattern: any, data?: TInput): Observable<ResponseType<TResult>>;
  emit<TResult = any, TInput = any>(pattern: any, data?: TInput): Observable<ResponseType<TResult>>;
}
