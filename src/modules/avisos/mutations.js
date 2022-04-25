/* eslint-disable no-param-reassign */
const setAvisos = (state, avisos) => {
  state.avisos = avisos;
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

const setIdTipoAviso = (state, idTipoAviso) => {
  state.filters.id_tipo_aviso = idTipoAviso;
};

export {
  setAvisos,
  setTotalItems,
  setTotalPages,
  setCantidadPorPagina,
  setPagina,
  setNombre,
  setActivo,
  setIdTipoAviso,
};
