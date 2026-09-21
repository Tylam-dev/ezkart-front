import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Paginacion } from '../modelos/Paginacion';
import { Producto } from '../modelos/Producto';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/products`;

  obtener(pagina: number, tamanoPagina: number) {
    const params = new HttpParams().set('pagina', pagina).set('tamanoPagina', tamanoPagina);

    return this.http.get<Paginacion<Producto>>(this.url, { params });
  }
}
