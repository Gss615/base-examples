import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
/*
  通过操纵 headers 我们能够做许多事，例如：
    认证（authentication）/ 授权（authorization）
    缓存行为；例如，If-Modified-Since
    XSRF (opens new window)保护
  */

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: { 'X-man': 'hello man' }
    })
    return next.handle(req);
  }
}
