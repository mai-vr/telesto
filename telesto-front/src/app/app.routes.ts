import { Routes } from '@angular/router';
import { authGuardGuard } from './auth-guard-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        loadChildren: () => import('./welcome/welcome.routes').then((m) => m.routes)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.routes').then((m) => m.routes)
    },
    {
        path: 'user',
        loadChildren: () => import('./user-profile/user-profile.routes').then((m) => m.routes),
        canActivate: [authGuardGuard]
    },
    {
        path: '**',
        loadChildren: () => import('./not-found/not-found.routes').then((m) => m.routes)
    }
];
