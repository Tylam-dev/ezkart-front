import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Orden, ResumenOrden } from '../modelos/Orden';
import { Paginacion } from '../modelos/Paginacion';

@Injectable({ providedIn: 'root' })
export class OrdenesService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/orders`;

  obtener(pagina: number, tamanoPagina: number) {
    const params = new HttpParams().set('pagina', pagina).set('tamanoPagina', tamanoPagina);

    return this.http.get<Paginacion<Orden>>(this.url, { params });
  }

  previsualizar() {
    return this.http.get<ResumenOrden>(`${this.url}/preview`);
  }

  finalizar() {
    return this.http.post<Orden>(this.url, {});
  }
}
