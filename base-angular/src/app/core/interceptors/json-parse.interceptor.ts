import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
//主要用来测试解析json
@Injectable()
export class JsonParseInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.responseType === 'json') {
      return this.handleJsonResponse(request, next);
    }
    return next.handle(request);
  }

  private handleJsonResponse(httpRequest: HttpRequest<any>, next: HttpHandler) {
    // httpRequest = httpRequest.clone({ responseType: 'text' });
    return next.handle(httpRequest).pipe(map(event => this.parseJsonResponse(event)));
  }
  private parseJsonResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse && typeof event.body === 'string') {
      return event.clone({ body: JSON.parse(event.body) });
    } else {
      return event;
    }
  }
}
