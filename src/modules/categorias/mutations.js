/* eslint-disable no-param-reassign */
const setCategorias = (state, categorias) => {
  state.categorias = categorias;
};

const setTotalItems = (state, totalItems) => {
  state.totalItems = totalItems;
};

const setTotalPages = (state, totalPages) => {
  state.totalPages = totalPages;
};

const setCantidadPorPagina = (state, cantidadPorPagina) => {
  state.filters.cantidad_por_pagina = cantidadPorPagina;
};

const setPagina = (state, pagina) => {
  state.filters.pagina = pagina;
};

const setNombre = (state, nombre) => {
  state.filters.nombre = nombre;
};

const setActivo = (state, activo) => {
  state.filters.activo = activo;
};

export {
  setCategorias,
  setTotalItems,
  setTotalPages,
  setCantidadPorPagina,
  setPagina,
  setNombre,
  setActivo,
};
