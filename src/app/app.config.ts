import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutes } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(AppRoutes),
    importProvidersFrom(BrowserAnimationsModule)
  ]
};
