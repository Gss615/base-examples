import { Component } from '@angular/core';
import { slideInAnimation } from './animations';
import { I18nService } from './i18n/i18n.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [slideInAnimation]

})
export class AppComponent {
  constructor(
    private  i18nService:I18nService
  ){}
  title = 'base-angular';
  getAnimationData(outlet: any) {
    return outlet?.activatedRouteData?.['animation'];
  }
  ngOnInit(){
    this.i18nService.init('en-US', ['en-US', 'fr-FR']);

  }
}
// 使用示例
// this._loading.loadingSub
//   .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
//   .subscribe((loading) => {
//     this.loading = loading;
//   });