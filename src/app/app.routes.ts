import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout.componet';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.routes').then(m => m.HOME_ROUTES),
        data: { preload: true }
      },
      {
        path: 'ingredientes',
        loadChildren: () => import('./pages/ingredientes/ingredientes.routes').then(m => m.INGREDIENTES_ROUTES),
        data: { preload: true }
      },
    ]
  },
  { path: '**', redirectTo: 'home' }
];
