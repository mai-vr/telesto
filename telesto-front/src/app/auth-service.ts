import { inject, Injectable } from '@angular/core';
import { 
  ActionCodeSettings, 
  sendSignInLinkToEmail, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';
import { FIREBASE_AUTH } from './app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(FIREBASE_AUTH);

  // Un Observable que emite el estado del usuario en tiempo real
  get user$(): Observable<User | null> {
    return new Observable((observer) => {
      // Escucha los cambios de sesión de Firebase
      const unsubscribe = onAuthStateChanged(
        this.auth,
        (user) => observer.next(user),
        (error) => observer.error(error),
        () => observer.complete()
      );
      // Limpieza cuando el suscriptor se desasocia
      return () => unsubscribe();
    });
  }

  // Método asíncrono para comprobar el estado actual desde la perspectiva del Guard
  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe(); // Se ejecuta una vez y se cancela
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
    };

    return sendSignInLinkToEmail(this.auth, email, actionCodeSettings);
  }

  async logOut() {
    return signOut(this.auth);
  }
}