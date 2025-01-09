import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  private readonly logger = new Logger(HttpInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        this.logRequestResponse(request, data);

        return data;
      }),
      catchError((error) => {
        this.logRequestResponse(request, error.response);
        this.logger.debug(error.stack);

        return throwError(() => error);
      }),
    );
  }

  logRequestResponse(request: any, data: any) {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const { method, originalUrl: url, params, query, body, headers } = request;

    this.logger.log(
      JSON.stringify({
        id,
        createdAt,
        method,
        url,
        request: {
          headers,
          params,
          query,
          body,
        },
        response: data,
      }),
    );
  }
}
