import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  auth = getAuth()
  user = this.auth.currentUser

}
