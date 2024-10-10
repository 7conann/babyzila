import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './HomeModule/home/home.component';
export const AppRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

export const appRoutingProviders = [
  provideRouter(AppRoutes)
];
