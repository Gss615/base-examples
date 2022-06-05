import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
// 自定义请求头
@Injectable()
export class CustomHeaderInterceptor implements HttpInterceptor {
//   if (!req.headers.has('Content-type')) {
//     req = req.clone({
//         headers: req.headers.set('Content-Type', 'application/json')
//     });
// }
  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('记录请求头header:',this.auth.token,request.responseType,request.headers)
    return next.handle(request).pipe(
      catchError((err:any)=>{
        console.log('err',err)
        return  next.handle(request)
      })
    )
  }
}
