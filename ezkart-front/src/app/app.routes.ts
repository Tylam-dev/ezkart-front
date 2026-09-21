import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Products } from './pages/products/products';
import { ProductoDetalle } from './pages/producto-detalle/producto-detalle';
import { Layout } from './layout/layout/layout';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [guestGuard] },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: Products },
      { path: 'products/:id', component: ProductoDetalle },
    ],
  },
];
