import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /* 
    包含正装请求的http请求 
  */
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  constructor() { }

    /**
   * 
   * 如果正在加载在loadingMap添加该url并且设置为true
   * 如果为false删除loadingMap中的key，直到loadingMap为空时，loadingSub 为 false
   * 这个方法的模式可以确保如果存在多个请求，不会再加载之前设置false
   * 
   * @param loading {boolean}
   * @param url {string}
   */
  setLoading(loading: boolean, url: string): void {
    if (!url) { // 如果没有url，抛出错误
      throw new Error('LoadingService.setLoading 方法需要一个url');
    }
    if (loading === true) {
      this.loadingMap.set(url, loading);
      this.loadingSub.next(true);
    } else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
    }
  }
}
