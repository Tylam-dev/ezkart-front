import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Paginacion } from '../modelos/Paginacion';
import { Producto, ProductosFiltro } from '../modelos/Producto';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/products`;

  obtener(pagina: number, tamanoPagina: number, filtro: ProductosFiltro = {}) {
    let params = new HttpParams().set('pagina', pagina).set('tamanoPagina', tamanoPagina);
    if (filtro.nombre) params = params.set('filtro.nombre', filtro.nombre);
    if (filtro.codigo) params = params.set('filtro.codigo', filtro.codigo);
    if (filtro.precio != null) params = params.set('filtro.precio', filtro.precio);

    return this.http.get<Paginacion<Producto>>(this.url, { params });
  }

  obtenerPorId(id: string) {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }
}
