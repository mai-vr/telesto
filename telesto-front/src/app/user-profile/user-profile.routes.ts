import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./user-profile').then((m) => m.UserProfile),
    },
];