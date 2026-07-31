import { Component, inject } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

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
  private router = inject(Router)

  async loginGoogle() {
    try {
      const loginResult = await this.authService.logInWithGoogle()
      const userData = loginResult.user

      const userDataSaved = {
        name: userData.displayName,
        email: userData.email,
        photo: userData.photoURL
      }
      localStorage.setItem(this.USER_KEY, JSON.stringify(userDataSaved))
      this.router.navigate(['/user'])

    } catch (error) {
      console.log(error)
    }
  }

  async loginFacebook() {
    try {
      await this.authService.logInWithFacebook()
      this.router.navigate(['/user'])
    } catch (error) {
      console.log(error)
    }
  }

  async loginGitHub() {
    try {
      await this.authService.logInWithGitHub()
      this.router.navigate(['/user'])
    } catch (error) {
      console.log(error)
    }
  }
}
