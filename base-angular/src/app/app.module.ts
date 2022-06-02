import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
// import { Logger } from '@shared';
import { PagesModule } from './pages/pages.module'

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './core/interceptors';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module'
import { TranslateModule } from '@ngx-translate/core';
import { I18nModule } from './i18n/i18n.module'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'


registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    TranslateModule.forRoot(),
    I18nModule,
    PagesModule,
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
