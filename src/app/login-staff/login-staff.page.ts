import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-staff',
  templateUrl: './login-staff.page.html',
  styleUrls: ['./login-staff.page.scss'],
})
export class LoginStaffPage implements OnInit, OnDestroy {
  subscription: Subscription;
  userInfo: User;
  loginStaffForm: FormGroup;
  isSubmitted = false;
  constructor(
    public authSvc: AuthService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginStaffForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  get errorControl() {
    return this.loginStaffForm.controls;
  }

  private redirectUser(): void {
    this.subscription = this.authSvc.user$.subscribe((data) => {
      this.userInfo = data;
      if (this.userInfo?.role === 'admin') {
        this.router.navigate(['admin']);
      } else if (this.userInfo?.role === 'kitchen') {
        this.router.navigate(['kitchen']);
      } else if (this.userInfo?.role === 'user'){
        this.authSvc.logout();
      }
    });
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.loginStaffForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      try {
        await this.authSvc.loginEmployee(
          this.loginStaffForm.get('email').value,
          this.loginStaffForm.get('password').value
        );
        this.redirectUser();
      } catch (error) {
        console.log('Error->', error);
      }
    }
  }

  ngOnDestroy(): void {
     this.loginStaffForm.reset();
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }
}
