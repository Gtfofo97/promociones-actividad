/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';
import { httpClient } from '../plugins/http_client';
import utils from '../modules/utils';
import establecimientos from '../modules/establecimientos';
import avisos from '../modules/avisos';
import categorias from '../modules/categorias';
import promociones from '../modules/promociones';
import sucursales from '../modules/sucursales';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    userInfo: {},
    userDetail: {},
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    setUserDetail(state, userDetail) {
      state.userDetail = userDetail;
    },
  },
  actions: {
    async getUserDetail({ commit, state }, email) {
      // const response = await http_client(`/api/v1/usuarios/${email}`)
      // commit('setUserDetail', response.data)
    },
  },
  modules: {
    utils,
    establecimientos,
    avisos,
    categorias,
    promociones,
    sucursales,
  },
});
