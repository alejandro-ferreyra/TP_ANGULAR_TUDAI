import { Routes } from '@angular/router';
import { StorefrontComponent } from './pages/storefront/storefront';
import { AdminComponent } from './pages/admin/admin';

export const routes: Routes = [
  { path: '', component: StorefrontComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' },
];
