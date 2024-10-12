import { provideRouter, Routes } from '@angular/router';
import { PlansComponent } from './PlansModule/Components/plans/plans.component';
import { SettingsComponent } from './SettingsModule/Components/settings/settings.component';
import { LoginComponent } from './LoginModule/Components/login/login.component';
import { DashboardComponent } from './DashboardModule/Components/dashboard/dashboard.component';
import { AnaliticsComponent } from './AnaliticsModule/Components/analitics/analitics.component';
import { ChatComponent } from './chatModule/components/chat/chat.component';

export const AppRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'plans',
        component: PlansComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'analitics',
        component: AnaliticsComponent
      },
      {
        path: '',
        redirectTo: 'plans',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: '**',
    redirectTo: 'Login',
  },
];

export const appRoutingProviders = [
  provideRouter(AppRoutes)
];

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   async canActivate(): Promise<boolean> {
//     const session = await this.authService.isAuthenticated();
//     if (!session) {
//       this.router.navigate(['/login']);
//       return false;
//     }
//     return true;
//   }
// }

// // No seu routes array:
// {
//   path: 'protected',
//   component: ProtectedComponent,
//   canActivate: [AuthGuard]
// }
