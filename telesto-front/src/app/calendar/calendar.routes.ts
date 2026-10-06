import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./calendar').then((m) => m.Calendar),
    },
];