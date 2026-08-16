import { inject, Injectable } from '@angular/core';
import { ActionCodeSettings, onAuthStateChanged, sendSignInLinkToEmail, signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { FIREBASE_AUTH } from './app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(FIREBASE_AUTH)

  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(!!user);
      });
    });
  }

  async logInWithGoogle() {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(this.auth, provider);
  }

  logInWithEmail(email: string) {
    const actionCodeSettings: ActionCodeSettings = {
      url: 'http://localhost:4200/user',
      handleCodeInApp: true
    }

    return sendSignInLinkToEmail(this.auth, email, actionCodeSettings)
  }

  async logOut() {
    return signOut(this.auth)
  }

}
