import { httpClient } from '../plugins/http_client';

const getAvisos = async (filters) => await httpClient('/api/v1/avisos', filters);

const postAvisos = async (data) => await httpClient('/api/v1/avisos', data, 'POST');

const cambiarEstado = async (id) => await httpClient(`/api/v1/avisos/${id}/cambiar-estado`, {}, 'PUT');

const postFile = async (id, data) => await httpClient(`/api/v1/avisos/${id}/uploadFile`, data, 'POST');

const putAvisos = async (id, data) => await httpClient(`/api/v1/avisos/${id}`, data, 'PUT');

export {
  getAvisos,
  postAvisos,
  cambiarEstado,
  postFile,
  putAvisos,
};
