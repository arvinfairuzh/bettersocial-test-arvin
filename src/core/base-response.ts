export class BaseResponse<T> {
  statusCode: number;
  message: string;
  responseTime: number;
  data: T;
  meta?: {};

  constructor(status: number, message: string, data?: T, meta?: {}) {
    this.statusCode = status;
    this.message = message;
    this.data = data;
    this.meta = meta;

    return this;
  }
}