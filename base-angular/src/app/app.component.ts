import { Component } from '@angular/core';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [slideInAnimation]

})
export class AppComponent {
  title = 'base-angular';
  getAnimationData(outlet: any) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
// 使用示例
// this._loading.loadingSub
//   .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
//   .subscribe((loading) => {
//     this.loading = loading;
//   });