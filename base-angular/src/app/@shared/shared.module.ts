import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SHARED_ZORRO_MODULES } from './modules/ng-zorro-antd/shared-zorro.module';

// TODO  注册是什么，和引入有什么区别
const MODULES = [
  CommonModule,
  // FormsModule,
  // ReactiveFormsModule,
  // PipesModule,
  // ComponentsModule,
  // DirectivesModule,
  // CardTableWrapModule,
  // BizComponentsModule,
  ...SHARED_ZORRO_MODULES
];


@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class SharedModule { }
