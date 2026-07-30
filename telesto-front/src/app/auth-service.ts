import { inject, Injectable } from '@angular/core';
import { signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { FIREBASE_AUTH } from './app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(FIREBASE_AUTH)

  async logInWithGoogle() {
    const provider = new GoogleAuthProvider();
    // provider.setCustomParameters({ prompt: 'select_account' });

    return signInWithPopup(this.auth, provider);
  }

  async logOut() {
    return signOut(this.auth)
  }

}
