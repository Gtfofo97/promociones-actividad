import { httpClient } from '../plugins/http_client';

const getCategorias = async (filters = {}) => await httpClient('/api/v1/categorias', filters);

const postCategorias = async (data) => await httpClient('/api/v1/categorias', data, 'POST');

const cambiarEstado = async (id) => await httpClient(`/api/v1/categorias/${id}/cambiar-estado`, {}, 'PUT');

const postFile = async (id, data) => await httpClient(`/api/v1/categorias/${id}/uploadFile`, data, 'POST');

const putCategorias = async (id, data) => await httpClient(`/api/v1/categorias/${id}`, data, 'PUT');

export {
  getCategorias,
  postCategorias,
  cambiarEstado,
  postFile,
  putCategorias,
};
