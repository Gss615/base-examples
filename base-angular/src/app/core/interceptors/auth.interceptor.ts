import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, of, switchMap, take, throwError } from 'rxjs';
/*
  刷新token有待检验，自己写一个服务试一下吧，github有个现成的，好像还是angular的node serve
*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token = ''
  private AURH_HEADER = ''
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.headers.has('Content-Type')) { 
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      })
    }
    request = this.addAuthenticationToken(request)
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if ( error && error.status === 401) { // 没有权限或者权限失效
          if (this.refreshTokenInProgress) { //  如果正在刷新token，等待token刷新再发送请求
            return this.refreshTokenSubject.pipe(
              filter((res) => res !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(request)))
            )
          } else {
            this.refreshTokenInProgress = true
            this.refreshTokenSubject.next(null)

            return this.refreshAccessToken().pipe(
              switchMap((success: boolean) => {
                this.refreshTokenSubject.next(success)
                return next.handle(this.addAuthenticationToken(request))
              })
            )
          }
        }else{
          return throwError(error);
        }
      })
    )
  }
  private refreshAccessToken(): Observable<any> {
    // 调用接口刷新token
    return of('secre token')
  }
  private addAuthenticationToken(req: HttpRequest<any>): HttpRequest<any> {
    if (!this.token) { // 如果没有token
      return req
    }
    //如果不是本域名下的请求也不需要token
    // if(!req.url.match(/http:\/\/localhost:4200/)){
    //   return req
    // }
    return req.clone({
      headers: req.headers.set(this.AURH_HEADER, `Bearer ${this.token}`)
    })
  }
}
