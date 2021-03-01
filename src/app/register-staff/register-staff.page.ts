import { Component, OnDestroy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-register-staff',
  templateUrl: './register-staff.page.html',
  styleUrls: ['./register-staff.page.scss'],
})
export class RegisterStaffPage implements OnDestroy {
  subscription: Subscription;
  userInfo: User;
  role: string;
  created = false;
  constructor(
    private authSvc: AuthService,
    private afs: AngularFirestore
  ) {}

  async onRegister(email, password) {
    try {
      const user = await this.authSvc.registerEmployee(
        email.value,
        password.value
      );
      if (user) {
        this.created = !this.created;
        this.updateUserData(user);
        console.log(user, "user de onReg");
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  onChange(event) {
    console.log(event.target.value);
    this.role = event.target.value;
  }

  private updateUserData(user: User) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );
      const data: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: true,
        displayName: user.displayName,
        role: this.role,
      };

      return userRef.set(data, { merge: true });
  }

  ngOnDestroy(): void {
    if (this.subscription != undefined) {
       this.subscription.unsubscribe();
    }
  }
}