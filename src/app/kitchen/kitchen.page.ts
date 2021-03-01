import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.page.html',
  styleUrls: ['./kitchen.page.scss'],
})
export class KitchenPage implements OnInit {
  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit() {}
  async onLogout() {
    try {
      this.authSvc.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
