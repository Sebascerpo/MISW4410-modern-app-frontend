import { Routes } from '@angular/router';
import { IngredientesComponent } from './pages/ingredientes/ingredientes.component';
import { AppLayoutComponent } from './layout/app-layout.componet';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'ingredientes', component: IngredientesComponent },
    ]
  },
  { path: '**', redirectTo: 'home' }
];
