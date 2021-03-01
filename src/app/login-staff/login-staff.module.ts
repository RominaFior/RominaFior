import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginStaffPageRoutingModule } from './login-staff-routing.module';

import { LoginStaffPage } from './login-staff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginStaffPageRoutingModule
  ],
  declarations: [LoginStaffPage]
})
export class LoginStaffPageModule {}
