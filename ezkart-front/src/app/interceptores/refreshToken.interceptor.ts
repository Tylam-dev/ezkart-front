import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const esRutaAuth = req.url.includes('/auth/login') || req.url.includes('/auth/refresh');

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status !== 401 || esRutaAuth) return throwError(() => err);

      return auth.refresh().pipe(
        switchMap(() => next(req)),
        catchError((e) => {
          auth.usuario.set(null);
          router.navigate(['/login']);
          return throwError(() => e);
        }),
      );
    }),
  );
};
