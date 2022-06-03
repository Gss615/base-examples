import { NgModule, SkipSelf, Optional } from '@angular/core'
import zh from "@angular/common/locales/zh";
import {NZ_I18N, zh_CN} from "ng-zorro-antd/i18n";
import {DOCUMENT, registerLocaleData} from '@angular/common';

registerLocaleData(zh);

@NgModule({
    declarations: [],
    imports: [
        
    ],
    exports: [
    ],
    providers: [
        {provide: NZ_I18N, useValue: zh_CN}
      ],
})

export class CoreModule {
    constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule 只能被appModule引入')
        }
    }
}