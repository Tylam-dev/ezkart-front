import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Products } from './pages/products/products';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'products', component: Products, canActivate: [authGuard] },
];
