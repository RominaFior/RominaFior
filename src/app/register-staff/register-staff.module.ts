import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterStaffPageRoutingModule } from './register-staff-routing.module';

import { RegisterStaffPage } from './register-staff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterStaffPageRoutingModule
  ],
  declarations: [RegisterStaffPage]
})
export class RegisterStaffPageModule {}
