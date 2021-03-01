import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginStaffPage } from './login-staff.page';

const routes: Routes = [
  {
    path: '',
    component: LoginStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginStaffPageRoutingModule {}
