import { Component, inject } from '@angular/core';
import { getAuth, sendEmailVerification, sendSignInLinkToEmail } from 'firebase/auth';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  USER_KEY = 'userLogged'
  private auth = getAuth()
  authService = inject(AuthService)
  private router = inject(Router)
  userEmail = ''

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

  async loginEmail() {
    try {
      await this.authService.logInWithEmail(this.userEmail)
      localStorage.setItem('emailUserLogged', JSON.stringify(this.userEmail))
    } catch (error) {
      console.log(error)
    }
  }
}
