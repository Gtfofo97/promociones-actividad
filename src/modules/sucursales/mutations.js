/* eslint-disable no-param-reassign */
const setSucursales = (state, sucursales) => {
  state.sucursales = sucursales;
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

const setIdEstablecimiento = (state, idEstablecimiento) => {
  state.filters.id_establecimiento = idEstablecimiento;
};

const setIdDepartamento = (state, idDepartamento) => {
  state.filters.id_departamento = idDepartamento;
};

export {
  setSucursales,
  setTotalItems,
  setTotalPages,
  setCantidadPorPagina,
  setPagina,
  setNombre,
  setActivo,
  setIdEstablecimiento,
  setIdDepartamento,
};
