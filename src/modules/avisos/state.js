/* eslint-disable import/prefer-default-export */
export const state = () => ({
  avisos: [],
  totalItems: 0,
  totalPages: 0,
  filters: {
    cantidad_por_pagina: 10,
    pagina: 1,
    nombre: null,
    activo: null,
    id_tipo_aviso: null,
  },
});
