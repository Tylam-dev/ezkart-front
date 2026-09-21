import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AgregarProductoCarrito, Carrito } from '../modelos/Carrito';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/cart`;

  readonly carrito = signal<Carrito | null>(null);

  cargar() {
    return this.http.get<Carrito>(this.url).pipe(tap((c) => this.carrito.set(c)));
  }

  agregar(producto: AgregarProductoCarrito) {
    return this.http
      .post<Carrito>(`${this.url}/items`, producto)
      .pipe(tap((c) => this.carrito.set(c)));
  }

  eliminar(productoId: string) {
    return this.http.delete<void>(`${this.url}/items/${productoId}`).pipe(
      tap(() =>
        this.carrito.update((c) =>
          c && { ...c, items: c.items.filter((i) => i.productoId !== productoId) },
        ),
      ),
    );
  }

  limpiar() {
    this.carrito.set(null);
  }
}
