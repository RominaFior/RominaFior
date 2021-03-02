import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { IsLoggedGuard } from './shared/is-logged.guard';
import { KitchenGuard } from './shared/kitchen.guard';
import { UserGuard } from './shared/user.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [UserGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    //canActivate: [IsLoggedGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
   canActivate: [IsLoggedGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./verify-email/verify-email.module').then(
        (m) => m.VerifyEmailPageModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'kitchen',
    loadChildren: () =>
      import('./kitchen/kitchen.module').then((m) => m.KitchenPageModule),
    canActivate: [KitchenGuard],
  },
  {
    path: 'register-staff',
    loadChildren: () =>
      import('./register-staff/register-staff.module').then(
        (m) => m.RegisterStaffPageModule
      ),
   // canActivate: [IsLoggedGuard],
  },
  {
    path: 'login-staff',
    loadChildren: () =>
      import('./login-staff/login-staff.module').then(
        (m) => m.LoginStaffPageModule
      ),
   // canActivate: [IsLoggedGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
