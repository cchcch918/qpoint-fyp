import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgZorroAntdModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpInterceptorService,
    //   multi: true
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
