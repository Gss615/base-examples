import { NgModule, SkipSelf, Optional } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from '../app-routing.module'

import { PagesModule } from '../pages/pages.module'

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule, // angular 动画
        PagesModule,
        AppRoutingModule // route module 放在最后
    ],
    exports: [
        AppRoutingModule
    ]
})

export class CoreModule {
    constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule 只能被appModule引入')
        }
    }
}