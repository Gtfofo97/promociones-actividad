/* eslint-disable no-param-reassign */
const setEstablecimientos = (state, establecimientos) => {
  state.establecimientos = establecimientos;
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

const setIdCategoria = (state, idCategoria) => {
  state.filters.id_categoria = idCategoria;
};

export {
  setEstablecimientos,
  setTotalItems,
  setTotalPages,
  setCantidadPorPagina,
  setPagina,
  setNombre,
  setActivo,
  setIdCategoria,
};
