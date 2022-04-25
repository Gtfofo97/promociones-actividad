/* eslint-disable import/prefer-default-export */
export const state = () => ({
  promociones: [],
  totalItems: 0,
  totalPages: 0,
  filters: {
    cantidad_por_pagina: 10,
    pagina: 1,
    nombre: null,
    activo: null,
    id_establecimiento: null,
    id_tipo_promocion: null,
    codigo: null,
  },
});
