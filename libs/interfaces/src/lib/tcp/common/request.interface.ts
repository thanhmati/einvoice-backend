export class Request<T> {
  processId?: string;
  data?: T;

  constructor(data: Partial<Request<T>>) {
    Object.assign(this, data);
  }
}

export type RequestType<T> = Request<T>;
