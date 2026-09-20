export interface CarritoItem {
  productoId: string;
  codigo: string;
  nombre: string;
  cantidad: number;
  agotado: boolean;
}

export interface Carrito {
  items: CarritoItem[];
}

export interface AgregarProductoCarrito {
  productoId: string;
  codigo: string;
  cantidad: number;
}

export interface ActualizarCantidadCarrito {
  codigo: string;
  cantidad: number;
}
