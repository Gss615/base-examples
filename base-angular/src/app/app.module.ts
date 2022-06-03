import { NgModule } from '@angular/core';
import { CoreModule } from '@core';

import { AppComponent } from './app.component';
// import { httpInterceptorProviders } from './core/interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module'
import { TranslateModule } from '@ngx-translate/core';
import { I18nModule } from './i18n/i18n.module'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { PagesModule } from './pages/pages.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    TranslateModule.forRoot(),
    I18nModule,
    PagesModule,
    AppRoutingModule
  ],
  providers: [
    // httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
