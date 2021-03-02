import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}
  subscription: Subscription;
  userInfo: User;
  loginForm: FormGroup;
  isSubmitted = false;
  unauthorized=false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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
    return this.loginForm.controls;
  }
  async submitForm() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      try {
        const user = await this.authSvc.login(
          this.loginForm.get('email').value,
          this.loginForm.get('password').value
        );
        if (user) {
          console.log(user, "desde login");
          this.redirectUser();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        this.redirectUser();
      }
    } catch (error) {
      console.log(error);
    }
  }

  private redirectUser(): void {
    this.subscription = this.authSvc.user$.subscribe((data) => {
      this.userInfo = data;
      if (this.userInfo) {
        const isVerified = this.authSvc.isEmailVerified(this.userInfo);
        if (isVerified) {
           if (this.userInfo.role === 'user') {
            this.router.navigate(['home']);
          } else if (this.userInfo.role === 'admin' || this.userInfo.role === 'kitchen') {
            this.authSvc.logout();
            this.unauthorized = true;
            setTimeout(() => {
              this.unauthorized =false,
              this.loginForm.reset();
            }, 3000);
          }
        } else {
          console.log('entra en login verify');
          this.router.navigate(['verify-email']);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.loginForm.reset();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
