import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor(private authSvc: AuthService, private router: Router) {}
  subscription: Subscription;
  userInfo: User;
  error: string;
  ngOnInit() {}

  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        this.redirectUser();
      }
    } catch (error) {
      this.error = error;
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
          if (this.userInfo?.role == 'admin') {
            this.router.navigate(['admin']);
          } else if (this.userInfo?.role == 'kitchen') {
            this.router.navigate(['kitchen']);
          } else if (this.userInfo.role === 'user') {
            console.log("rol user");
            this.router.navigate(['home']);
          } else {
            this.router.navigate(['login']);
          }
        }
      } else {
        console.log("entra en login verify");
        this.router.navigate(['verify-email']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
