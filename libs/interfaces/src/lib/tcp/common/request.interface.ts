export class Request<T> {
  processID?: string;
  data?: T;
  error?: string;

  constructor(data: Partial<Request<T>>) {
    Object.assign(this, data);
  }
}

export type RequestType<T> = Request<T>;
