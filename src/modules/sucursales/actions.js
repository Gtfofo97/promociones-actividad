/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import * as sucursalesServices from '../../services/sucursales.services';

const getSucursales = async ({ commit, state }) => {
  const response = await sucursalesServices.getSucursales(state.filters);

  commit('setSucursales', response?.data?.rows);
  commit('setTotalItems', Number(response?.data?.totalItems));
  commit('setTotalPages', Number(response?.data?.totalPages));
};

export {
  getSucursales,
};
