import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterStaffPage } from './register-staff.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterStaffPageRoutingModule {}
