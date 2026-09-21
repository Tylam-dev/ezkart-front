import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Orden } from '../../core/modelos/Orden';
import { Paginacion } from '../../core/modelos/Paginacion';
import { OrdenesService } from '../../core/ordenes/ordenes.service';

@Component({
  imports: [MatExpansionModule, MatPaginatorModule, CurrencyPipe, DatePipe],
  selector: 'app-ordenes',
  styleUrl: './ordenes.css',
  templateUrl: './ordenes.html',
})
export class Ordenes {
  private ordenesService = inject(OrdenesService);

  datos = signal<Paginacion<Orden> | null>(null);
  estados = { C: 'Confirmada', X: 'Cancelada' };

  private tamanoPagina = 10;

  constructor() {
    this.cargar(1);
  }

  cambiarPagina(e: PageEvent) {
    this.tamanoPagina = e.pageSize;
    this.cargar(e.pageIndex + 1);
  }

  private cargar(pagina: number) {
    this.ordenesService
      .obtener(pagina, this.tamanoPagina)
      .subscribe((d) => this.datos.set(d));
  }
}
