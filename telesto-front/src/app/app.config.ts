import { ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp } from "firebase/app";
import { routes } from './app.routes';
import { Auth, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDRDf9VgcOZQLzGrImYgezhA7JfzrWlU24",
  authDomain: "telesto-df935.firebaseapp.com",
  projectId: "telesto-df935",
  storageBucket: "telesto-df935.firebasestorage.app",
  messagingSenderId: "1077639736270",
  appId: "1:1077639736270:web:a7fe28a12fe6f85e01199f",
  measurementId: "G-BL3MFXFKCJ"
};

const app = initializeApp(firebaseConfig);
const authInstance = getAuth(app);

export const FIREBASE_AUTH = new InjectionToken<Auth>('FirebaseAuth', {
  providedIn: 'root',
  factory: () => authInstance
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
