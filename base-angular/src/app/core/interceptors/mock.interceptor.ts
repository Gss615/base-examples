import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
// 假数据制作中心
@Injectable()
export class MockInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/mock')) {
      return next.handle(request)
    }
    const body = {
      data: {
        name: '',
      }
    }
    return of(new HttpResponse({ status: 200, body }));
  }
}
