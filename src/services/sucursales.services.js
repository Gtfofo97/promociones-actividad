import { httpClient } from '../plugins/http_client';

const getSucursales = async (filters) => await httpClient('/api/v1/sucursales', filters);

const postSucursales = async (data) => await httpClient('/api/v1/sucursales', data, 'POST');

const putSucursales = async (id, data) => await httpClient(`/api/v1/sucursales/${id}`, data, 'PUT');

const cambiarEstado = async (id) => await httpClient(`/api/v1/sucursales/${id}/cambiar-estado`, {}, 'PUT');

export {
  getSucursales,
  postSucursales,
  putSucursales,
  cambiarEstado,
};
