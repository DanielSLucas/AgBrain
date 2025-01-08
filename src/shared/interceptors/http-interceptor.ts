import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  private readonly logger = new Logger(HttpInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const id = randomUUID();
    const {
      method,
      originalUrl: url,
      params,
      query,
      body,
      headers,
    } = context.switchToHttp().getRequest();

    const startDate = new Date().toISOString();

    return next.handle().pipe(
      map((data) => {
        const endDate = new Date().toISOString();

        this.logger.log(
          JSON.stringify({
            id,
            startDate,
            endDate,
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
        return data;
      }),
    );
  }
}
