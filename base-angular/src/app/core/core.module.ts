import { NgModule, SkipSelf, Optional } from '@angular/core'


@NgModule({
    declarations: [],
    imports: [
        
    ],
    exports: [
    ]
})

export class CoreModule {
    constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule 只能被appModule引入')
        }
    }
}