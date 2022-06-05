// error handle
/*  
 拦截器TODO
 修改header
    -   修改请求头参数
    -   请求头增加token
 格式化response：
    -   将数据格式化为json（对于有时候的数据是json有时候不是json的暂时不考虑）
    -   后端返回的数据格式不统一，比如：有时候返回的数据包裹对象嵌套层数不一样
 然后是其他：路由啊，路由的权限控制啊。。
 这两块搞完了应该整体架构算完了，不对，还有antui框架的引入和全局配置，还有多语言的引入和全局配置和angular的多语言联动
 这应该算完了吧。。。
 整体架构完成后需要再熟悉下angular的基础
 重点是依赖注入：
    顺便再熟悉或者依赖注入在angular整个架构中发挥的作用，以及应该如何应用好依赖注入
    。。。
    再然后是angular的性能优化
        angular的变更检测机制zoneModule

        时间是两天：就周末这两天吧。。。
        因为这也算是整合这一段时间所学，并不是刚开始
        希望 自己能够写好这个总结。
        然后。。把这个种子项目完成！
        加油！！！！


        拦截器需求：
        -   拦截器参数
        -   拦截器日志记录（仅开发模式下！）
        -   动态启用拦截器
        -   增加一个loader服务
        https://llccing.github.io/FrontEnd/blog/translate/Top%2010%20ways%20to%20use%20Interceptors%20in%20Angular.html#_10-url
*/

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { CustomHeaderInterceptor } from './custom-header.interceptor'
import { AuthInterceptor } from './auth.interceptor';

/** 顺序。。。 */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

];


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/




// import { Injectable, Injector } from '@angular/core';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { JwtService } from '../services';

// @Injectable()
// export class HttpTokenInterceptor implements HttpInterceptor {
//   constructor(private jwtService: JwtService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const headersConfig = {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     };

//     const token = this.jwtService.getToken();

//     if (token) {
//       headersConfig['Authorization'] = `Token ${token}`;
//     }

//     const request = req.clone({ setHeaders: headersConfig });
//     return next.handle(request);
//   }
// }



/*
    错误重试代码片段
*/

// import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';

// const MAX_RETRY_NUM = 2;

// export class CatchErrorInjector implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     let count = 0;
//     return next.handle(req).pipe(
//       catchError((err, err$) => {
//         count++;
//         // err$其代表上游的Observable对象，当直接返回这个对象时，会启动catchError的重试机制。
//         const tip = err.status === 200 ? err.body.error.reason : '系统繁忙，请稍后再试';
//         console.log(tip, '后端接口报错');
//         if (err.status === 400 && count < MAX_RETRY_NUM) {
//           console.log(count, '重试次数');
//           return err$;
//         } else {
//           throw err;
//         }
//       }),
//     );
//   }
// }

