/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import * as promocionesService from '../../services/promociones.services';

const getPromociones = async ({ commit, state }) => {
  const response = await promocionesService.getPromociones(state.filters);

  commit('setPromociones', response?.data?.rows);
  commit('setTotalItems', Number(response?.data?.totalItems));
  commit('setTotalPages', Number(response?.data?.totalPages));
};

export {
  getPromociones,
};
