import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseResponse } from "@src/core/base-response";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const startTime = Date.now();

    return next.handle().pipe(
      map((res: BaseResponse<any>) => {
        const endTime = Date.now();
        const durationInMilliseconds = endTime - startTime;
        const durationInSeconds = durationInMilliseconds / 1000;

        return {
          statusCode  : res.statusCode,
          message     : res.message,
          responseTime: durationInSeconds,
          data        : res.data,
          meta        : res.meta
        };
      })
    );
  }
}

