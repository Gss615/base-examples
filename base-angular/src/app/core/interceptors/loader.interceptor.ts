import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable,BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  
  // 目前这个loader只能实现单个请求的loader，如果页面上同时存在多个请求，需要增加此功能
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // this.loaderService.show(); // 请求开始 
    return next.handle(request).pipe(
      delay(2000), // 测试delay会不会影响拿到数据也延迟
      finalize(()=>{
        // this.loaderService.hide() // 请求结束 
      })
    );
  }
}
