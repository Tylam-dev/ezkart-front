import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Usuario } from './modelos/Usuario';
import { catchError, Observable, of, tap } from 'rxjs';

@Service()
export class AuthService {
    private http = inject(HttpClient);
    public usuario = signal<Usuario | null>(null);

    login(nombreUsuario: string, contrasenia: string) {
        return this.http.post(`${environment.apiUrl}/auth/login`, {nombreUsuario, contrasenia})
    }

    cargarSesion(): Observable<Usuario | null> {
        return this.http.get<Usuario>(`${environment.apiUrl}/auth/me`).pipe(
            tap(u => this.usuario.set(u)),
            catchError(() => { this.usuario.set(null); return of(null); }),
        );
    }
}
