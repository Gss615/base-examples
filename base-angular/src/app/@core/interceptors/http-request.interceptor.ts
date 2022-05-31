import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private _loading: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._loading.setLoading(true, request.url);
    return next.handle(request)
      .pipe(
				tap<HttpEvent<any>>((httpEvent: HttpEvent<any>) => {
					if (httpEvent instanceof HttpResponse) {
						this._cache.put(request, httpEvent);
					}
					return cachedResponse ? cachedResponse : httpEvent;
				}),
				catchError((err: HttpErrorResponse) => {
					throw err;
				}),
				finalize(() => {
					this._loading.setLoading(false, request);
				})
			);
  }
}
