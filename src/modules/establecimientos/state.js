/* eslint-disable import/prefer-default-export */
export const state = () => ({
  establecimientos: [],
  totalItems: 0,
  totalPages: 0,
  filters: {
    cantidad_por_pagina: 10,
    pagina: 1,
    nombre: null,
    activo: null,
    id_categoria: null,
  },
});
