export interface Paginacion<T> {
  items: T[];
  pagina: number;
  tamanoPagina: number;
  totalItems: number;
  totalPaginas: number;
  tienePaginaAnterior: boolean;
  tienePaginaSiguiente: boolean;
}

export interface PaginacionQuery<F = object> {
  pagina?: number;
  tamanoPagina?: number;
  filtro?: F;
}
