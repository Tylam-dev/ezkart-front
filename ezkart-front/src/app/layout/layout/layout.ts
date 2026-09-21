import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { CarritoService } from '../../core/carrito/carrito.service';

@Component({
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  auth = inject(AuthService);
  carrito = inject(CarritoService);
  private router = inject(Router);

  cargarCarrito() {
    this.carrito.cargar().subscribe();
  }

  eliminarDelCarrito(productoId: string) {
    this.carrito.eliminar(productoId).subscribe({ error: () => this.cargarCarrito() });
  }

  cerrarSesion() {
    this.auth.logout().subscribe(() => {
      this.carrito.limpiar();
      this.router.navigate(['/login']);
    });
  }
}
