import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-user-profile',
  imports: [Sidebar],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  auth = getAuth()
  user = this.auth.currentUser

}
