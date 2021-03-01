import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-login-staff',
  templateUrl: './login-staff.page.html',
  styleUrls: ['./login-staff.page.scss'],
})
export class LoginStaffPage implements OnDestroy {
  subscription: Subscription;
  userInfo: User;
  constructor(private authSvc: AuthService, private router: Router) {}

  async onLoginEmployee(email, password) {
    try {
      const user = await this.authSvc.loginEmployee(
        email.value,
        password.value
      );
        this.redirectUser();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private redirectUser(): void {
      this.subscription = this.authSvc.user$.subscribe((data) => {
        this.userInfo = data;
        if (this.userInfo?.role === 'admin') {
          this.router.navigate(['admin']);
        } else if (this.userInfo?.role === 'kitchen') {
          this.router.navigate(['kitchen']);
        }
      });
    }

  ngOnDestroy(): void {
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }
}
