import { Component, inject } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  USER_KEY = 'userLogged'
  private auth = getAuth()
  authService = inject(AuthService)

  async login() {
    try {
      const loginResult = await this.authService.logInWithGoogle()
      const userData = loginResult.user

      const userDataSaved = {
        name: userData.displayName,
        email: userData.email,
        photo: userData.photoURL
      }
      localStorage.setItem(this.USER_KEY, JSON.stringify(userDataSaved))

    } catch (error) {
      console.log(error)
    }
  }
}
