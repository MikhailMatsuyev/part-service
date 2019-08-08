import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { AppConfig } from './app.config';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { CoreStoreModule } from './core/store/store.module';
import { AppEffectsModules } from './core/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InlineSVGModule } from 'ng-inline-svg';
import { AuthHttpInterceptor } from './core/services/authhttpinterceptor.service';
import { ErrorInterceptor } from './core/services/errorinterceptor.service';
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';

export function onInitApp(config: AppConfig): Function {
  return async () => await config.init();
}

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'NotificationsHub';
  c.url = 'https://uniter.andersenlab.com';
  c.logging = false;
  c.executeEventsInZone = false;
  return c;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    PagesModule,
    HttpClientModule,
    AppRoutingModule,
    CoreStoreModule,
    AppEffectsModules,
    BrowserAnimationsModule,
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    FlexLayoutModule,
    InlineSVGModule.forRoot(),
    SignalRModule.forRoot(createConfig)
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: onInitApp,
      deps: [AppConfig],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
