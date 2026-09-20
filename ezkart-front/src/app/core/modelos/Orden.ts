export type EstadoOrden = 'C' | 'X';

export interface Orden {
  id: string;
  fechaCreacion: string;
  estadoOrden: EstadoOrden;
  total: number;
  descuentoTemporadaId: string | null;
}

export interface OrdenesFiltro {
  estadoOrden?: EstadoOrden;
  fechaDesde?: string;
  fechaHasta?: string;
}
