import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // { path: '', redirectTo: 'page', pathMatch: 'full' },
  // { path: 'page', component: PagesComponent },
  // { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
