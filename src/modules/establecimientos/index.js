/* eslint-disable import/no-cycle */
import * as establecimientosService from '../../services/establecimientos.services';
import * as getters from './getters';
import * as mutations from './mutations';

export default {
  namespaced: true,
  state: {
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
  },
  actions: {
    async getEstablecimientos({ commit, state }) {
      const response = await establecimientosService.getEstablecimientos(state.filters);

      commit('setEstablecimientos', response?.data?.rows);
      commit('setTotalItems', Number(response?.data?.totalItems));
      commit('setTotalPages', Number(response?.data?.totalPages));
    },
  },
  getters,
  mutations,
};
