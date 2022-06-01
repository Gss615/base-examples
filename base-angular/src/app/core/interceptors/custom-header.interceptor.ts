import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
// 自定义请求头
@Injectable()
export class CustomHeaderInterceptor implements HttpInterceptor {
//   if (!req.headers.has('Content-type')) {
//     req = req.clone({
//         headers: req.headers.set('Content-Type', 'application/json')
//     });
// }
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('记录请求头header:',request.responseType)
    return next.handle(request);
  }
}
