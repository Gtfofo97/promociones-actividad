/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import * as categoriasService from '../../services/categorias.services';

const getCategorias = async ({ commit, state }) => {
  const response = await categoriasService.getCategorias(state.filters);

  commit('setCategorias', response?.data?.rows);
  commit('setTotalItems', Number(response?.data?.totalItems));
  commit('setTotalPages', Number(response?.data?.totalPages));
};

export {
  getCategorias,
};
