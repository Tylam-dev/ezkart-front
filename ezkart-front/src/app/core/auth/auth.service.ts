import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Usuario } from './modelos/Usuario';
import { catchError, finalize, Observable, of, shareReplay, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private url = `${environment.apiUrl}/auth`;
    private refresh$?: Observable<unknown>;

    readonly usuario = signal<Usuario | null>(null);

    login(nombreUsuario: string, contrasena: string) {
        return this.http.post<Usuario>(`${this.url}/login`, {
            nombreUsuario: nombreUsuario, 
            Contrasena: contrasena})
        .pipe(tap(u => this.usuario.set(u)))
    }

    cargarSesion(): Observable<Usuario | null> {
        return this.http.get<Usuario>(`${this.url}/me`).pipe(
            tap(u => this.usuario.set(u)),
            catchError(() => { this.usuario.set(null); return of(null); }),
        );
    }

    logout() {
        return this.http
            .post(`${this.url}/logout`, {})
            .pipe(tap(() => this.usuario.set(null)))
    }

    refresh() {
    this.refresh$ ??= this.http.get(`${this.url}/refresh`).pipe(
        finalize(() => (this.refresh$ = undefined)),
        shareReplay(1),
    );
    return this.refresh$;
    }
}
