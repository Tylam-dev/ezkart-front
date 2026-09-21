import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Producto } from '../../core/modelos/Producto';
import { ProductosService } from '../../core/productos/productos.service';

@Component({
  imports: [RouterLink, MatButtonModule, CurrencyPipe],
  selector: 'app-producto-detalle',
  styleUrl: './producto-detalle.css',
  templateUrl: './producto-detalle.html',
})
export class ProductoDetalle {
  private route = inject(ActivatedRoute);
  private productosService = inject(ProductosService);

  producto = signal<Producto | null>(null);
  noEncontrado = signal(false);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.productosService.obtenerPorId(id).subscribe({
      next: (p) => this.producto.set(p),
      error: () => this.noEncontrado.set(true),
    });
  }
}
