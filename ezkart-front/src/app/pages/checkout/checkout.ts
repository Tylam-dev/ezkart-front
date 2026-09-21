import { HttpErrorResponse } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../core/carrito/carrito.service';
import { Orden, ResumenOrden } from '../../core/modelos/Orden';
import { OrdenesService } from '../../core/ordenes/ordenes.service';

@Component({
  imports: [RouterLink, MatButtonModule, CurrencyPipe],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout {
  private ordenesService = inject(OrdenesService);
  private carritoService = inject(CarritoService);

  resumen = signal<ResumenOrden | null>(null);
  ordenCreada = signal<Orden | null>(null);
  confirmando = signal(false);
  error = signal('');

  constructor() {
    this.ordenesService.previsualizar().subscribe({
      next: (r) => this.resumen.set(r),
      error: (e: HttpErrorResponse) => this.error.set(this.mensaje(e, 'No se pudo cargar el resumen')),
    });
  }

  confirmar() {
    this.confirmando.set(true);
    this.error.set('');

    this.ordenesService.finalizar().subscribe({
      next: (orden) => {
        this.ordenCreada.set(orden);
        this.carritoService.limpiar();
        this.confirmando.set(false);
      },
      error: (e: HttpErrorResponse) => {
        this.error.set(this.mensaje(e, 'No se pudo completar la compra'));
        this.confirmando.set(false);
      },
    });
  }

  private mensaje(e: HttpErrorResponse, porDefecto: string) {
    return e.error?.message ?? porDefecto;
  }
}
