import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ComposeComponent } from './compose/compose.component';

import { LayoutModule } from '../layout/layout.module';

import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IconsProviderModule } from '../shared/modules/ng-zorro-antd/icons-provider.module';
@NgModule({
  declarations: [
    PagesComponent,
    NotFoundComponent,
    ComposeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    LayoutModule,
    SharedModule
  ]
})
export class PagesModule { }
