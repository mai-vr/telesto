import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.routes').then((m) => m.routes)
    },
    {
        path: 'user',
        loadChildren: () => import('./user-profile/user-profile.routes').then((m) => m.routes)
    }
];
