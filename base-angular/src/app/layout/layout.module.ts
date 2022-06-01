import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';

const COMPONENTS = [SiteFooterComponent,SiteHeaderComponent]


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports:[
    ...COMPONENTS
  ]
})
export class LayoutModule { }
