import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './core/auth/auth.service';
import { credencialesInterceptor } from './interceptores/credenciales.interceptor';
import { refreshTokenInterceptor } from './interceptores/refreshToken.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([credencialesInterceptor, refreshTokenInterceptor])),
    provideAppInitializer(() => inject(AuthService).cargarSesion())
  ]
};
