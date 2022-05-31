import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if(!request.url)
    return next.handle(request).pipe(
      retry(2),
      catchError((err: HttpErrorResponse) => {
        if (err.status !== 401) {  // 如果使用auth拦截器，那里会处理 401 重新 发起token，这里处理401之外的错误
          console.log(err.message)  //  可以调用全局提示插件，提示错误后者其他。
        }
        return throwError(err)
      })
    );
  }
}
