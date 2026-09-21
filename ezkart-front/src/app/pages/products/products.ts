import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { Paginacion } from '../../core/modelos/Paginacion';
import { Producto, ProductosFiltro } from '../../core/modelos/Producto';
import { ProductosService } from '../../core/productos/productos.service';

@Component({
  imports: [
    ProductoCard,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products {
  private productosService = inject(ProductosService);
  private fb = inject(FormBuilder);

  datos = signal<Paginacion<Producto> | null>(null);

  form = this.fb.group({
    nombre: [''],
    codigo: [''],
    precio: [null as number | null],
  });
  private filtro: ProductosFiltro = {};
  private tamanoPagina = 10;

  constructor() {
    this.cargar(1);
  }

  buscar() {
    const { nombre, codigo, precio } = this.form.getRawValue();

    this.filtro = {
      nombre: nombre?.trim() || undefined,
      codigo: codigo?.trim() || undefined,
      precio: precio ?? undefined,
    };
    this.cargar(1);
  }

  limpiar() {
    this.form.reset();
    this.buscar();
  }

  cambiarPagina(e: PageEvent) {
    this.tamanoPagina = e.pageSize;
    this.cargar(e.pageIndex + 1);
  }

  private cargar(pagina: number) {
    this.productosService
      .obtener(pagina, this.tamanoPagina, this.filtro)
      .subscribe((d) => this.datos.set(d));
  }
}
