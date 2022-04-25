/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import * as avisosService from '../../services/avisos.services';

const getAvisos = async ({ commit, state }) => {
  const response = await avisosService.getAvisos(state.filters);

  commit('setAvisos', response?.data?.rows);
  commit('setTotalItems', Number(response?.data?.totalItems));
  commit('setTotalPages', Number(response?.data?.totalPages));
};

export {
  getAvisos,
};
