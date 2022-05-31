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
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }
  private errorHandler(response: any): Observable<HttpEvent<any>> {
    // if (!environment.production) {
    //   // Do something with the error
    //   log.error('Request error', response);
    // }
    throw response;
  }
}
// https://github.com/keithstric/angular-boilerplate-plain/tree/master/src/app/core/services
// https://github.com/ngx-rocket/starter-kit/tree/main/src/app