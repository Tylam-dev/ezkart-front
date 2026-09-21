import { HttpErrorResponse } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarritoService } from '../../core/carrito/carrito.service';
import { Producto } from '../../core/modelos/Producto';
import { ProductosService } from '../../core/productos/productos.service';

@Component({
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CurrencyPipe,
  ],
  selector: 'app-producto-detalle',
  styleUrl: './producto-detalle.css',
  templateUrl: './producto-detalle.html',
})
export class ProductoDetalle {
  private route = inject(ActivatedRoute);
  private productosService = inject(ProductosService);
  private carritoService = inject(CarritoService);

  producto = signal<Producto | null>(null);
  noEncontrado = signal(false);
  agregando = signal(false);
  mensaje = signal('');
  error = signal('');

  cantidad = new FormControl(1, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(1)],
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.productosService.obtenerPorId(id).subscribe({
      next: (p) => this.producto.set(p),
      error: () => this.noEncontrado.set(true),
    });
  }

  agregar(p: Producto) {
    if (this.cantidad.invalid) return;

    this.agregando.set(true);
    this.mensaje.set('');
    this.error.set('');

    this.carritoService
      .agregar({ productoId: p.id, codigo: p.codigo, cantidad: this.cantidad.value })
      .subscribe({
        next: () => {
          this.mensaje.set('Producto agregado al carrito');
          this.agregando.set(false);
        },
        error: (e: HttpErrorResponse) => {
          this.error.set(e.error?.message ?? 'No se pudo agregar el producto');
          this.agregando.set(false);
        },
      });
  }
}
