export type EstadoOrden = 'C' | 'X';

export interface Orden {
  id: string;
  fechaCreacion: string;
  estadoOrden: EstadoOrden;
  total: number;
  descuentoTemporadaId: string | null;
  detalles: OrdenDetalle[];
  subtotal: number;
  montoDescuento: number;
}

export interface OrdenesFiltro {
  estadoOrden?: EstadoOrden;
  fechaDesde?: string;
  fechaHasta?: string;
}

export interface OrdenDetalle {
  productoId: string;
  codigo: string;
  nombre: string;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
}

export interface ResumenOrden {
  detalles: OrdenDetalle[];
  subtotal: number;
  descuentoTemporadaId: string | null;
  nombreDescuento: string | null;
  porcentajeDescuento: number;
  montoDescuento: number;
  total: number;
}
