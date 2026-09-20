export interface Producto {
  id: string;
  codigo: string;
  nombre: string;
  precio: number;
  existencia: number;
  version: number;
}

export interface ProductosFiltro {
  codigo?: string;
  nombre?: string;
  precio?: number;
}
