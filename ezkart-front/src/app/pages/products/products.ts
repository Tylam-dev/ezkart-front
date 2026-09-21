import { Component, inject, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { Paginacion } from '../../core/modelos/Paginacion';
import { Producto } from '../../core/modelos/Producto';
import { ProductosService } from '../../core/productos/productos.service';

@Component({
  imports: [ProductoCard, MatPaginatorModule],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products {
  private productosService = inject(ProductosService);

  datos = signal<Paginacion<Producto> | null>(null);

  constructor() {
    this.cargar(1, 10);
  }

  cargar(pagina: number, tamanoPagina: number) {
    this.productosService.obtener(pagina, tamanoPagina).subscribe((d) => this.datos.set(d));
  }

  cambiarPagina(e: PageEvent) {
    this.cargar(e.pageIndex + 1, e.pageSize);
  }
}
