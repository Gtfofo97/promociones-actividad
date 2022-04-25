/* eslint-disable no-param-reassign */
const setPromociones = (state, promociones) => {
  state.promociones = promociones;
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

const setIdTipoPromocion = (state, idTipoPromocion) => {
  state.filters.id_tipo_promocion = idTipoPromocion;
};

const setCodigo = (state, codigo) => {
  state.filters.codigo = codigo;
};

export {
  setPromociones,
  setTotalItems,
  setTotalPages,
  setCantidadPorPagina,
  setPagina,
  setNombre,
  setActivo,
  setIdEstablecimiento,
  setIdTipoPromocion,
  setCodigo,
};
