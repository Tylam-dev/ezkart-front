import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Producto } from '../../core/modelos/Producto';

@Component({
  imports: [MatCardModule, CurrencyPipe],
  selector: 'app-producto-card',
  styleUrl: './producto-card.css',
  templateUrl: './producto-card.html',
})
export class ProductoCard {
  producto = input.required<Producto>();
}
