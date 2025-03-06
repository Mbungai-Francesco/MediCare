import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'artists',
    loadComponent: () => import('./pages/artists/artists.page').then( m => m.ArtistsPage),
  },
  {
    path: 'artists/:id',
    loadComponent: () => import('./pages/artist/artist.page').then( m => m.ArtistPage)
  }
];
