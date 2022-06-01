import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, map, Observable, tap } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

	constructor(private _loading: LoadingService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		this._loading.setLoading(true, request.url);
		return next.handle(request)
			.pipe(
				catchError((err: HttpErrorResponse) => {
					throw err;
				}),
				finalize(() => {
					this._loading.setLoading(false, request.url);
				})
			);
	}
}
