import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ComposeComponent } from './compose/compose.component';

import { LoginModule } from './login/login.module';


@NgModule({
  declarations: [
    PagesComponent,
    NotFoundComponent,
    ComposeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LoginModule
  ]
})
export class PagesModule { }
